<template>
    <div>
        <input type="file" @change="handleFileChange"/>
        <el-button type="primary" @click="handleUpload">上传</el-button>
        <el-button type="primary" @click="handleUpload1">慢启动上传</el-button>
        <el-button @click="handleResume" v-if="status === Status.pause">恢复</el-button>
        <el-button
                v-else
                :disabled="status !== Status.uploading || !container.hash"
                @click="handlePause"
        >暂停
        </el-button>
        <div>
            <div>计算文件 hash</div>
            <el-progress :percentage="hashProgress"></el-progress>
            <div>总进度</div>
            <el-progress :percentage="fakeProgress"></el-progress>
            <div class="cube-container" :style="{width:cubeWidth+'px'}">
                <div class="cube"
                 v-for="chunk in chunks"
                 :key="chunk.hash">
                    <div
                        :class="{
                            'uploading': chunk.progress > 0 && chunk.progress < 100,
                            'success': chunk.progress === 100,
                            'error': chunk.progress < 0,
                        }"
                        :style="{height:chunk.progress+'%'}"
                >
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import { request, post } from '../../utils/UpLoadService';
    import SparkMD5 from 'spark-md5';
    const SIZE = 2 * 1024 * 1024;
    const Status = {
        wait: 'wait',
        pause: 'pause',
        uploading: 'uploading',
        error: 'error',
        done: 'done'
    };
    export default {
        name: 'UpLoadOceanData',
        data: () => ({
            container: {
                file: null
            },
            chunks: [],
            hashProgress: 0,
            // 请求列表，方便随时abort
            requestList: [],
            Status,
            // 默认状态
            status: Status.wait,
            fakeProgress: 0,
            cubes: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 100, 100, 100, 1, 0]
        }),
        filters: {
            transformByte(val) {
                return Number((val / 1024).toFixed(0));
            }
        },
        computed: {
            // 方块进度条尽可能的正方形 平方根向上取整
            cubeWidth() {
                return Math.ceil(Math.sqrt(this.chunks.length)) * 16;
            },
            uploadDisabled() {
                return (
                    !this.container.file ||
                    [Status.pause, Status.uploading].includes(this.status)
                );
            },
            uploadProgress() {
                if (!this.container.file || !this.chunks.length) return 0;
                const loaded = this.chunks
                    .map(item => item.size * item.progress)
                    .reduce((acc, cur) => acc + cur);
                return parseInt((loaded / this.container.file.size).toFixed(2));
            }
        },
        watch: {
            uploadProgress(now) {
                if (now > this.fakeProgress) {
                    this.fakeProgress = now;
                }
            }
        },
        methods: {
            async handleResume() {
                this.status = Status.uploading;
                const { uploadedList } = await this.verify(
                    this.container.file.name,
                    this.container.hash
                );
                await this.uploadChunks(uploadedList);
            },
            handlePause() {
                this.status = Status.pause;
                this.requestList.forEach(xhr => xhr.abort());
                this.requestList = [];
            },
            handleFileChange(e) {
                const [file] = e.target.files;
                if (!file) return;
                this.container.file = file;
            },
            createFileChunk(file, size = SIZE) {
                // 生成文件块
                const chunks = [];
                let cur = 0;
                while (cur < file.size) {
                    chunks.push({ file: file.slice(cur, cur + size) });
                    cur += size;
                }
                return chunks;
            },

            async sendRequest(urls, max = 4) {
                return new Promise((resolve, reject) => {
                    const len = urls.length;
                    const idx = 0;
                    let counter = 0;
                    const retryArr = [];
                    const start = async() => {
                        // 有请求，有通道
                        while (counter < len && max > 0) {
                            max--; // 占用通道
                            console.log(idx, 'start');
                            const i = urls.findIndex(v => v.status === Status.wait || v.status === Status.error);// 等待或者error
                            if (i === -1) {
                                break;
                            }
                            urls[i].status = Status.uploading;
                            const form = urls[i].form;
                            const index = urls[i].index;
                            if (typeof retryArr[index] === 'number') {
                                console.log(index, '开始重试');
                            }
                            await request({
                                url: '/upload',
                                data: form,
                                onProgress: this.createProgressHandler(this.chunks[index]),
                                requestList: this.requestList
                            }).then(() => {
                                urls[i].status = Status.done;
                                urls[counter].done = true;
                                max++; // 释放通道
                                counter++;
                                if (counter === len) {
                                    resolve();
                                } else {
                                    start();
                                }
                            }).catch(() => {
                                // 初始值
                                urls[i].status = Status.error;
                                if (typeof retryArr[index] !== 'number') {
                                    retryArr[index] = 0;
                                }
                                // 次数累加
                                retryArr[index]++;
                                // 一个请求报错3次的
                                if (retryArr[index] >= 2) {
                                    return reject(); // 考虑abort所有别的
                                }
                                console.log(index, retryArr[index], '次报错');
                                // 3次报错以内的 重启
                                this.chunks[index].progress = -1; // 报错的进度条
                                max++; // 释放当前占用的通道，但是counter不累加
                                start();
                            });
                        }
                    };
                    start();
                });
            },
            async uploadChunks(uploadedList = []) {
                // 这里一起上传，碰见大文件就是灾难
                // 没被hash计算打到，被一次性的tcp链接把浏览器稿挂了
                // 异步并发控制策略，我记得这个也是头条一个面试题
                // 比如并发量控制成4
                const list = this.chunks
                    .filter(chunk => uploadedList.indexOf(chunk.hash) === -1)
                    .map(({ chunk, hash, index }, i) => {
                        const form = new FormData();
                        form.append('chunk', chunk);
                        form.append('hash', hash);
                        form.append('filename', this.container.file.name);
                        form.append('fileHash', this.container.hash);
                        return { form, index, status: Status.wait };
                    });
                try {
                    // eslint-disable-next-line no-unused-vars
                    const ret = await this.sendRequest(list, 4);
                    if (uploadedList.length + list.length === this.chunks.length) {
                        // 上传和已经存在之和 等于全部的再合并
                        await this.mergeRequest();
                    }
                } catch (e) {
                    // 上传有被reject的
                    this.$Message.autoClosed({ title: '亲 上传失败了,考虑重试下呦' });
                }
            },
            createProgressHandler(item) {
                return e => {
                    item.progress = parseInt(String((e.loaded / e.total) * 100));
                };
            },
            async mergeRequest() {
                await post('/merge', {
                    filename: this.container.file.name,
                    size: SIZE,
                    fileHash: this.container.hash
                });
            },
            async calculateHash(chunks) {
                return new Promise(resolve => {
                    // web-worker 防止卡顿主线程
                    this.container.workder = new Worker('/hash.js');
                    this.container.workder.postMessage({ chunks });
                    this.container.workder.onmessage = e => {
                        const { progress, hash } = e.data;
                        this.hashProgress = Number(progress.toFixed(2));
                        if (hash) {
                            resolve(hash);
                        }
                    };
                });
            },
            async calculateHashSample() {
                return new Promise(resolve => {
                    const spark = new SparkMD5.ArrayBuffer();
                    const reader = new FileReader();
                    const file = this.container.file;
                    // 文件大小
                    const size = this.container.file.size;
                    const offset = 2 * 1024 * 1024;

                    const chunks = [file.slice(0, offset)];

                    // 前面100K

                    let cur = offset;
                    while (cur < size) {
                        // 最后一块全部加进来
                        if (cur + offset >= size) {
                            chunks.push(file.slice(cur, cur + offset));
                        } else {
                            // 中间的 前中后去两个子杰
                            const mid = cur + offset / 2;
                            const end = cur + offset;
                            chunks.push(file.slice(cur, cur + 2));
                            chunks.push(file.slice(mid, mid + 2));
                            chunks.push(file.slice(end - 2, end));
                        }
                        // 前取两个子杰
                        cur += offset;
                    }
                    // 拼接
                    reader.readAsArrayBuffer(new Blob(chunks));

                    // 最后100K
                    reader.onload = e => {
                        spark.append(e.target.result);

                        resolve(spark.end());
                    };
                });
            },
            async calculateHashIdle(chunks) {
                return new Promise(resolve => {
                    const spark = new SparkMD5.ArrayBuffer();
                    let count = 0;
                    const appendToSpark = async file => {
                        return new Promise(resolve => {
                            const reader = new FileReader();
                            reader.readAsArrayBuffer(file);
                            reader.onload = e => {
                                spark.append(e.target.result);
                                resolve();
                            };
                        });
                    };
                    const workLoop = async deadline => {
                        // 有任务，并且当前帧还没结束
                        while (count < chunks.length && deadline.timeRemaining() > 1) {
                            await appendToSpark(chunks[count].file);
                            count++;
                            // 没有了 计算完毕
                            if (count < chunks.length) {
                                // 计算中
                                this.hashProgress = Number(
                                    ((100 * count) / chunks.length).toFixed(2)
                                );
                                // console.log(this.hashProgress)
                            } else {
                                // 计算完毕
                                this.hashProgress = 100;
                                resolve(spark.end());
                            }
                        }
                        window.requestIdleCallback(workLoop);
                    };
                    window.requestIdleCallback(workLoop);
                });
            },
            async calculateHashSync(chunks) {
                return new Promise(resolve => {
                    const spark = new SparkMD5.ArrayBuffer();
                    let count = 0;
                    const loadNext = index => {
                        const reader = new FileReader();
                        reader.readAsArrayBuffer(chunks[index].file);
                        reader.onload = e => {
                            // 累加器 不能依赖index，
                            count++;
                            // 增量计算md5
                            spark.append(e.target.result);
                            if (count === chunks.length) {
                                // 通知主线程，计算结束
                                resolve(spark.end());
                                this.hashProgress = 100;
                            } else {
                                // 每个区块计算结束，通知进度即可
                                this.hashProgress += 100 / chunks.length;

                                // 计算下一个
                                loadNext(count);
                            }
                        };
                    };
                    // 启动
                    loadNext(0);
                });
                // 不计算之前的 方便一会拆解
            },
            async verify(filename, hash) {
                const data = await post('/verify', { filename, hash });
                return data;
            },
            async handleUpload1() {
                const file = this.container.file;
                if (!file) return;
                this.status = Status.uploading;
                const fileSize = file.size;
                let offset = 1024 * 1024;
                let cur = 0;
                let count = 0;
                this.container.hash = await this.calculateHashSample();

                while (cur < fileSize) {
                    const chunk = file.slice(cur, cur + offset);
                    cur += offset;
                    const chunkName = this.container.hash + '-' + count;
                    const form = new FormData();
                    form.append('chunk', chunk);
                    form.append('hash', chunkName);
                    form.append('filename', file.name);
                    form.append('fileHash', this.container.hash);
                    form.append('size', chunk.size);

                    const start = new Date().getTime();
                    await request({ url: '/upload', data: form });
                    const now = new Date().getTime();

                    const time = ((now - start) / 1000).toFixed(4);
                    let rate = time / 30;
                    // 速率有最大和最小 可以考虑更平滑的过滤 比如1/tan
                    if (rate < 0.5) rate = 0.5;
                    if (rate > 2) rate = 2;
                    offset = parseInt(offset / rate, 10);
                    // if(time)
                    count++;
                }
            },
            format(num) {
                if (num > 1024 * 1024 * 1024) {
                    return (num / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
                }
                if (num > 1024 * 1024) {
                    return (num / (1024 * 1024)).toFixed(2) + 'MB';
                }
                if (num > 1024) {
                    return (num / (1024)).toFixed(2) + 'KB';
                }
                return num + 'B';
            },
            async handleUpload() {
                if (!this.container.file) return;
                this.status = Status.uploading;
                const chunks = this.createFileChunk(this.container.file);
                this.container.hash = await this.calculateHashSample();
                // 判断文件是否存在,如果不存在，获取已经上传的切片
                const { uploaded, uploadedList } = await this.verify(
                    this.container.file.name,
                    this.container.hash
                );
                if (uploaded) {
                    return this.$Message.autoClosed({ title: '秒传:上传成功' });
                }
                this.chunks = chunks.map((chunk, index) => {
                    const chunkName = this.container.hash + '-' + index;
                    return {
                        fileHash: this.container.hash,
                        chunk: chunk.file,
                        index,
                        hash: chunkName,
                        progress: uploadedList.indexOf(chunkName) > -1 ? 100 : 0,
                        size: chunk.file.size
                    };
                });
                // 传入已经存在的切片清单
                await this.uploadChunks(uploadedList);
            }
        }
    };
</script>
<style lang="less">
    .cube-container {
        width: 100px;
        overflow: hidden;
    }

    .cube {
        float: left;
        width: 14px;
        height: 14px;
        border: 1px solid black;
        line-height: 12px;
        background: #eee;

        .success {
            background: #67c23a;
        }

        .uploading {
            background: #409eff;
        }

        .error {
            background: #f56c6c;
        }
    }

</style>