<template>
    <el-dialog
            append-to-body
            :close-on-click-modal="false"
            :before-close="handleClose"
            :visible.sync="showFlag"
            :title="title"
            width="590px"
    >
        <el-form ref="form"
                 :inline="true"
                 :model="form"
                 :rules="rules"
                 size="small"
                 label-width="66px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model.number="form.phone" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
                <el-input v-model="form.nickName" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="部门" prop="deptId">
                <tree-select
                        :normalizer="test"
                        v-model="form.deptId"
                        :options="deptList"
                        style="width: 193px;"
                        placeholder="选择部门"
                />
            </el-form-item>
            <el-form-item label="岗位" prop="station">
                <el-select
                        v-model="form.stationList"
                        style="width: 193px;"
                        multiple
                        placeholder="请选择"
                >
                    <el-option
                            v-for="item in jobs"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender" style="width: 178px;">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="form.enabled">
                    <el-radio label="1">激活</el-radio>
                    <el-radio label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;" label="角色" prop="roleDatas">
                <el-select
                        v-model="form.roleDatas"
                        style="width: 437px;"
                        multiple
                        placeholder="请选择"
                        @change="changeRole"
                >
                    <el-option
                            v-for="obj in roleList"
                            :key="obj.name"
                            :label="obj.name"
                            :value="obj.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button  type="primary" @click="saveUser">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { isvalidPhone } from '@/utils/validate';
export default {
    name: 'GeovisEditUser',
    components: { TreeSelect },
    data() {
        // 自定义验证
        const validPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入电话号码'));
            } else if (!isvalidPhone(value)) {
                callback(new Error('请输入正确的11位手机号码'));
            } else {
                callback();
            }
        };
        return {
            labels: { label: 'name', children: 'deptList', expand: 'expand' },
            showFlag: this.openFlag,
            deptList: [],
            jobs: [
                {
                    name: '质检员',
                    id: 1
                },
                {
                    name: '程序员',
                    id: 2
                },
                {
                    name: '测试员',
                    id: 3
                }

            ],
            roleList: [],
            form: {
                stationList: '',
                roleList: [],
                phone: '',
                username: '',
                nickName: '',
                email: '',
                deptId: '',
                gender: '',
                enabled: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: '请输入用户昵称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                phone: [
                    { required: true, trigger: 'blur', validator: validPhone }
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
        }
    },
    created() {
        this.getRoleList();
        this.getDeptList();
    },
    methods: {
        test(node) {
            node.label = node.name;
            if (node.deptList && node.deptList.length > 0) {
                node.children = node.deptList;
            }
            return node;
        },
        getRoleList() {
            this.$RequestControl.fetch('roleList').then(res => {
                this.roleList = res;
            });
        },
        getDeptList() {
            this.$RequestControl.fetch('dept').then(res => {
                this.deptList = res;
            });
        },
        handleClose() {
            console.log('dddd');
        },
        changeRole() {
            console.log('eeeeeeee');
        },
        cancel() {
            this.showFlag = false;
            this.$emit('changeOpenFlag', false);
        },
        saveUser() {
            this.$RequestControl.fetchByPost('saveUser', this.form).then(res => {
                this.$emit('changeOpenFlag', false);
            });
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
    /deep/ .vue-treeselect__control,
    /deep/ .vue-treeselect__placeholder,
    /deep/ .vue-treeselect__single-value {
        height: 32px;
        line-height: 32px;
    }
</style>