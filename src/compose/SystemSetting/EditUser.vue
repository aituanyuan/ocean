<template>
    <el-form ref="form"
             :inline="true"
             :model="form"
             :rules="rules"
             size="small"
             label-width="66px">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" />
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
        <el-form-item label="部门" prop="dept.id">
            <treeselect
                    v-model="form.deptId"
                    :options="depts"
                    style="width: 178px;"
                    placeholder="选择部门"
            />
        </el-form-item>
        <el-form-item label="岗位" prop="jobs">
            <el-select
                    v-model="form.jobDatas"
                    style="width: 178px;"
                    multiple
                    placeholder="请选择"
                    @remove-tag="deleteTag"
                    @change="changeJob"
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
                <el-radio
                        v-for="item in dict.userStatus"
                        :key="item.id"
                        :label="item.value"
                >{{ item.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;" label="角色" prop="roles">
            <el-select
                    v-model="form.roleDatas"
                    style="width: 437px;"
                    multiple
                    placeholder="请选择"
                    @change="changeRole"
            >
                <el-option
                        v-for="item in roles"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                />
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
import { isvalidPhone } from '@/utils/validate';
export default {
    name: 'EditUser',
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
            roles: [
                {
                    name: '产品管理员',
                    id: '1'
                },
                {
                    name: '公告管理员',
                    id: '2'
                },
                {
                    name: '超级管理员',
                    id: '3'
                },
                {
                    name: '普通用户',
                    id: '4'
                }
            ],
            form: {
                jobDatas: '',
                roleDatas: 1,
                phone: '',
                userName: '',
                nickName: '',
                email: '',
                deptId: '',
                gender: '',
                enabled: ''
            },
            rules: {
                userName: [
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
    }
};
</script>

<style scoped>

</style>