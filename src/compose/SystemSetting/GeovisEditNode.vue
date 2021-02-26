<template>
    <el-dialog
            append-to-body
            :close-on-click-modal="false"
            :before-close="handleClose"
            :visible.sync="showFlag"
            :title="title"
            class="dialogHeader"
            width="360px"
    >
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 size="small"
                 >
            <el-form-item prop="nodeName">
                <el-input v-model="form.nodeName" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button  type="primary" @click="saveNode">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'GeovisEditNode',
    data() {
        return {
            showFlag: this.openFlag,
            form: {
                nodeName: ''
            },
            data: this.node,
            rules: {
                nodeName: [
                    { required: true, message: '请输入相关名字', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    props: {
        title: {
            type: String,
            default: '新增用户'
        },
        openFlag: {
            type: Boolean,
            default: false
        },
        node: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    methods: {
        handleClose() {
            console.log('dddd');
        },
        cancel() {
            this.showFlag = false;
            this.$emit('changeOpenFlag', false);
        },
        saveNode() {
            this.$emit('changeNode', this.form.nodeName);
        },
        showModal(key, data) {
            switch (key) {
                case 'edit':
                    this.setDept(data.title, data.value, data.parentId, data.level, `修改[${data.title}]`, data.identity);
                    break;
                case 'add':
                    this.setDept('', -1, data.parentId, data.level, `添加同级部门[${data.title}]`, data.identity);
                    break;
                case 'addChild':
                    data.identity = data.identity === '' ? data.value : `${data.identity}:${data.value}`;
                    this.setDept('', -1, data.value, data.level + 1, `添加下级部门[${data.title}]`, data.identity);
                    break;
                default:
                    this.setDept('', -1, -1, 0, '添加研发部门', '');
                    break;
            }
        },
        setDept(name, id, parentId, level, title, identity) {
            this.form.setFieldsValue({ deptName: name });
            this.params.id = id;
            this.params.parentId = parentId;
            this.params.level = level;
            this.params.thisIdentity = identity;
            this.title = title;
        }
    },
    watch: {
        openFlag: {
            handler(newVal, oldVal) {
                this.showFlag = newVal;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.dialogHeader {
    border-bottom: 1px solid #3e3e3e;
}

/deep/.el-dialog__footer {
    border-top: 1px solid #e3e3e3;
}

/deep/.el-dialog__header {
    border-bottom: 1px solid #e3e3e3;
}
</style>