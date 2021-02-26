<template>
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="beforeClose" :visible.sync="flag" :title="title" width="520px">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" style="width: 380px;" />
            </el-form-item>
            <el-form-item label="角色级别" prop="level">
                <el-input-number v-model.number="form.level" :min="1" controls-position="right" style="width: 145px;" />
            </el-form-item>
            <el-form-item label="数据范围" prop="dataScope">
                <el-select v-model="form.dataScope" style="width: 140px;" placeholder="请选择数据范围" @change="changeScope">
                    <el-option
                            v-for="item in dateScopes"
                            :key="item"
                            :label="item"
                            :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.dataScope === '自定义'" label="数据权限" prop="depts">
                <treeselect
                        v-model="deptDatas"
                        :load-options="loadDepts"
                        :options="depts"
                        multiple
                        style="width: 380px;"
                        placeholder="请选择"
                />
            </el-form-item>
            <el-form-item label="描述信息" prop="description">
                <el-input v-model="form.description" style="width: 380px;" rows="5" type="textarea" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'GeovisEditRoles',
    data() {
        return {
            flag: this.openFlag,
            defaultProps: {
                children: 'children',
                label: 'label',
                isLeaf: 'leaf'
            },
            dateScopes: ['全部', '本级', '自定义'],
            depts: [],
            deptDatas: [],
            form: this.nodeData,
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                permission: [
                    { required: true, message: '请输入权限', trigger: 'blur' }
                ]
            },
            serverType: this.type
        };
    },
    props: {
        openFlag: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '新增角色'
        },
        type: {
            type: String,
            default: 'save'
        },
        nodeData: {
            type: Object,
            default: () => {
                return {
                    id: null,
                    name: null,
                    depts: [],
                    description: null,
                    dataScope: '全部',
                    level: 3
                };
            }
        }
    },
    methods: {
        beforeClose() {
            // to - do
        },
        cancel() {
            this.$emit('changeView', false);
        },
        save() {
            this.$RequestControl.fetchByPost(this.serverType === 'save' ? 'createRole' : 'updateRole', this.form).then(res => {
                this.$emit('refreshList');
            });
        },
        loadDepts() {
            // to - do
        },
        changeScope() {
            // to - do
        }
    },
    watch: {
        openFlag: {
            handler(newVal, oldValue) {
                this.flag = newVal;
            }
        },
        type: {
            handler(newVal, oldValue) {
                this.serverType = newVal;
            }
        },
        nodeData: {
            handler(newVal, oldVal) {
                this.form = newVal;
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style scoped>

</style>