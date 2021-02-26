<template>
    <div class="authority flex column">
        <el-divider content-position="left">角色</el-divider>
        <div>
            <el-radio-group v-model="role">
                <el-radio :label="1">管理员</el-radio>
                <el-radio :label="2">中心用户</el-radio>
                <el-radio :label="3">普通用户</el-radio>
            </el-radio-group>
        </div>
        <el-divider content-position="left">权限</el-divider>
        <div class="flex1 flex" style="justify-content: center;">
            <div  class="leftAuthorityContainer flex" @dragover.prevent='over' @drop.prevent.self='drop'>
                <div
                        v-for="tag in tags"
                        :key="tag.name"
                        :id="tag.id"
                        draggable
                        @dragstart='start'
                        class="dragItem"
                >
                    <el-tag
                            :type="tag.type"
                    >
                        {{tag.name}}
                    </el-tag>
                </div>
            </div>
            <div class="middleBridge"></div>
            <div class="rightAuthorityContainer flex" @dragover.prevent='over' @drop.prevent.self='drop'>
                <el-tag
                        v-for="item in copyTag"
                        :type="item.type"
                        closable
                        :key="item.id"
                        @close="handleClose(item)"
                >
                    {{item.name}}
                </el-tag>
            </div>
        </div>
        <el-divider content-position="left">操作</el-divider>
        <div>
            <button class="btn btnSize blue_btn">确定</button>
        </div>
    </div>
</template>

<script>
    import SearchInput from '../../components/basic/SearchInput';

    export default {
        name: 'GeovisAuthority',
        components: { SearchInput },
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项 ${i}`,
                        disabled: i % 4 === 0
                    });
                }
                return data;
            };
            return {
                role: 1,
                data: generateData(),
                value: [1, 4],
                list1: [1, 2, 3, 4, 5],
                list2: [6, 7, 8],
                tags: [
                    {
                        name: '数据展示',
                        id: 'dataShow',
                        type: 'success'
                    },
                    {
                        name: '确定(数据展示)',
                        id: 'makeSure',
                        type: 'info',
                        parent: 'dataShow'
                    },
                    {
                        name: '操作(数据展示)',
                        id: 'make',
                        type: 'info',
                        parent: 'dataShow'
                    },
                    {
                        name: '数据上传',
                        id: 'dataUpLoad',
                        type: 'success'
                    },
                    {
                        name: '确定(数据上传)',
                        id: 'markDataUpLoad',
                        type: 'info',
                        parent: 'dataUpLoad'
                    },
                    {
                        name: '取消(数据上传)',
                        id: 'cancelDataUpLoad',
                        type: 'info',
                        parent: 'dataUpLoad'
                    }
                ],
                copyTag: []
            };
        },
        methods: {
            start(ev) {
                // 获取被拖拽的元素
                this.dom = ev.currentTarget;
            },
            over(ev) {
                console.log('over');
            },
            drop(ev) {
                // 把被拖拽的元素追加到容器中去
                const id = this.dom.id;
                const index = this.tags.findIndex(item => item.id === id);
                // const transforItem = this.tags.find(item => item.id === id);
                // ev.target.appendChild(this.dom);
                this.copyTag.push(this.tags[index]);
                if (!this.tags[index].parent) {
                    this.tags.forEach(item => {
                        if (item.parent === this.tags[index].id) {
                            this.copyTag.push(item);
                        }
                    });
                }
                // 去重
                const object = {};
                const open = this.copyTag;
                this.copyTag = open.reduce((cur, next) => {
                    object[next.id] ? '' : object[next.id] = true && cur.push(next);
                    return cur;
                }, []);
                // this.tags.splice(index, 1);
            },
            handleClose(item) {
                this.copyTag.splice(this.copyTag.findIndex(obj => obj.id === item.id), 1);
            }
        }
    };
</script>

<style lang="less">
.authority {
    height: 100%;
    padding: 10px 40px;
}

.leftAuthorityContainer {
    .container(100%, 30vw);

    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid #eee;
}

.dragItem {
    .container(5vh);

    margin: 0 10px;
}

.middleBridge {
    .container(5vh, 20vw);

    align-self: center;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-radius: initial;
}

.rightAuthorityContainer {
    .container(100%, 30vw);

    flex-wrap: wrap;
    border: 1px solid #eee;
}
</style>