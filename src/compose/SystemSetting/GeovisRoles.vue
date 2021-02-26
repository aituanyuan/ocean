<template>
    <div class="userListContainer flex column">
        <geovis-edit-roles :openFlag="openFlag" @changeView="changeView" @refreshList="refreshList" :nodeData="nodeData" :type="type"/>
        <div class="flex" style="justify-content: flex-end;
    padding: 0 40px;">
            <div style="margin-right: 30px;">
                <el-input placeholder="请输入内容" v-model="user">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="addUser alignSelf"  @click="addRoles"></div>
        </div>
        <div
                class="flex flex1"
                style="
                    height: 100%;
                    overflow-y: hidden;"
        >
            <div
                    style="
                    width: 70%;
                    padding: 10px;"
            >
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span class="role-span">角色列表</span>
                    </div>
                    <el-table ref="table" highlight-current-row style="width: 100%;" :data="roleData" @selection-change="selectionChangeHandler" @current-change="handleCurrentChange">
                        <el-table-column  type="selection" width="55" />
                        <el-table-column prop="name" label="名称" />
                        <el-table-column prop="dataScope" label="数据权限" />
                        <el-table-column prop="level" label="角色级别" />
                        <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
                        <el-table-column :show-overflow-tooltip="true" width="135px" prop="updateTime" label="创建日期">
                            <template slot-scope="scope">
                                <span>{{formateDate(scope.row.updateTime)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作" width="130px" align="center" fixed="right">
                            <template slot-scope="scope">
                                <div>
                                    <el-button  size="mini" type="primary" icon="el-icon-edit" @click="toEdit(scope.row)" />
                                    <el-button  size="mini" type="danger" icon="el-icon-delete" @click="doDelete(scope.row)"></el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-card>
            </div>
            <div
                    style="
                    width: 30%;
                    padding: 10px;"
            >
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                            <span class="role-span">菜单分配</span>
                        </el-tooltip>
                        <el-button
                                icon="el-icon-check"
                                size="mini"
                                style="padding: 6px 9px;"
                                type="primary"
                                @click="saveMenu"
                        >保存</el-button>
                    </div>
                    <el-tree
                            ref="tree"
                            :data="menuData"
                            :indent='0'
                            :props="defaultProps"
                            show-checkbox
                            default-expand-all
                            check-strictly
                            node-key="id"
                            :default-expanded-keys="[2, 3]"
                            :default-checked-keys="checkedKeys"
                            @check="checkGroupNode"
                    />
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import SearchInput from '../../components/basic/SearchInput';
import UserInformation from '../../components/settiing/UserInformation';
import FactorTree from '../../components/chart/FactorTree';
import menu from '../../data/system/menu';
import GeovisEditRoles from './GeovisEditRoles';
export default {
    name: 'GeovisRoles',
    data() {
        return {
            openFlag: false,
            loading: false,
            tableData: [],
            checkedKeys: [],
            menuData: menu,
            roleData: [],
            defaultProps: { children: 'deptList', label: 'name', isLeaf: 'leaf' },
            nodeData: {
                id: null,
                name: null,
                depts: [],
                description: null,
                dataScope: '全部',
                level: 3
            },
            type: 'save'
        };
    },
    computed: {
        noMore() {
            return this.count >= 20;
        },
        disabled() {
            return this.loading || this.noMore;
        }
    },
    components: { GeovisEditRoles, FactorTree, UserInformation, SearchInput },
    created() {
        this.getRoleList();
    },
    methods: {
        getRoleList() {
            this.$RequestControl.fetch('roleList').then((res) => {
                this.roleData = res;
            });
        },
        menuChange() {
            // to - do
        },
        selectionChangeHandler() {
            // to -do
        },
        handleCurrentChange() {
            // to - do
        },
        toEdit(data) {
            this.openFlag = true;
            this.nodeData = data;
            this.type = 'update';
        },
        doDelete(data) {
            this.$Message.popUp({ title: '操作', text: '确定要删除吗？' }).then(res => {
                if (res.value) {
                    this.$RequestControl.fetchByGet('deleteRole', `id=${data.id}`).then(res => {
                        this.$Message.autoClosed({ title: '删除成功' });
                        this.getRoleList();
                    });
                }
            });
        },
        checkGroupNode() {
            // to - do
        },
        addRoles() {
            this.nodeData = {
                id: null,
                name: null,
                depts: [],
                description: null,
                dataScope: '全部',
                level: 3
            };
            this.openFlag = true;
            this.type = 'save';
        },
        changeView(flag) {
            this.openFlag = flag;
        },
        refreshList() {
            this.openFlag = false;
            this.getRoleList();
        },
        formateDate(date) {
            return dayjs(new Date(date)).format('YYYY-MM-DD hh:mm:ss');
        }
    }
};
</script>

<style lang="less">
    .userListContainer {
        width: 100%;
        height: 100%;
        padding: 10px 0;
    }

    .searchContainer {
        width: 60%;
    }

    .addUser {
        width: 30px;
        height: 30px;
        .backgroundImage('/icon/addUserNormal');

        background-size: cover;
    }

    .addUser:hover {
        .backgroundImage('/icon/addUser');

        background-size: cover;
        cursor: pointer;
    }

    .fade-enter {
        opacity: 0;
        transform: translateY(50px);
    }

    .fade-leave-to {
        transform: translateX(-100%);
        transform-origin: right;
    }

    .fade-move {
        transition: all 3s ease;
    }

    .fade-leave-active {
        position: absolute;
    }

</style>