<template>
    <div class="userListContainer flex column">
        <geovis-edit-user :openFlag="openFlag" @changeOpenFlag="changeOpenFlag"/>
        <div class="flex" style="justify-content: flex-end;
    padding: 0 40px;">
            <div style="margin-right: 30px;">
                <el-input placeholder="请输入内容" v-model="user">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="addUser alignSelf"></div>
        </div>
        <div
                class="flex flex1"
                style="
                    height: 100%;
                    overflow-y: hidden;"
        >
            <el-table
                    ref="table"
                    :data="tableData"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    row-key="id"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="title" />
                <el-table-column prop="icon" label="图标" align="center" width="60px">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
                    </template>
                </el-table-column>
                <el-table-column prop="menuSort" align="center" label="排序">
                    <template slot-scope="scope">
                        {{ scope.row.menuSort }}
                    </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识" />
                <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
                <el-table-column prop="iframe" label="外链" width="75px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.iframe">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cache" label="缓存" width="75px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cache">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="hidden" label="可见" width="75px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.hidden">否</span>
                        <span v-else>是</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="135px">
<!--                    <template slot-scope="scope">-->
<!--                        <span>{{ parseTime(scope.row.createTime) }}</span>-->
<!--                    </template>-->
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
        </div>
    </div>
</template>

<script>
    import SearchInput from '../../components/basic/SearchInput';
    import UserInformation from '../../components/settiing/UserInformation';
    import GeovisEditUser from './GeovisEditUser';
    import menuSystem from '../../data/system/menuSystem';
    export default {
        name: 'GeovisMenus',
        data() {
            return {
                openFlag: false,
                loading: false,
                tableData: menuSystem,
                defaultProps: { children: 'children', label: 'label', isLeaf: 'leaf' }
            };
        },
        components: { GeovisEditUser, UserInformation, SearchInput },
        methods: {
            toEdit(data) {
                // to - do
            },
            doDelete(data) {
                // to - do
            },
            addUser() {
                this.openFlag = true;
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