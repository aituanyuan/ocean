<template>
    <div class="flex setting">
        <div class="flex guide">
            <el-menu
                    class="navLeft"
                    :default-active="defaultActive"
                    background-color="#333366"
                    text-color="rgba(255, 255, 255, 0.5)"
                    router
            >
                <el-menu-item index="users" :route="{path:'/setting/users'}">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="roles" :route="{path:'/setting/roles'}">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>角色</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="menus" :route="{path:'/setting/menus'}">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>菜单</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="dept" :route="{path:'/setting/dept'}">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>部门</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="flex1">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import GeovisItem from '../../components/basic/GeovisItem';
export default {
    name: 'SystemSetting',
    components: { GeovisItem },
    computed: {
        defaultActive: function() {
            return this.$route.name;
        }
    },
    data() {
        return {
            showData: [
                {
                    title: '用户管理',
                    content: '添加、删除、编辑',
                    key: 'users',
                    icon: 'one'
                },
                {
                    title: '角色管理',
                    content: '添加、编辑、删除',
                    key: 'roles',
                    icon: 'one'
                },
                {
                    title: '权限管理',
                    content: '赋权限与角色',
                    key: 'authority',
                    icon: 'one'
                }
            ]
        };
    },
    methods: {
        directToPage(type) {
            this.$router.push({ path: type });
        }
    }
};
</script>

<style lang="less">
.setting {
    width: 100%;
    height: 100%;
}

.guide {
    .container(100%);
}

.navLeft {
    color: #fff;
    opacity: .8;
}

.navLeft /deep/ {
    .el-menu-item-group__title {
        font-size: 14px;
        color: rgb(255, 255, 255);
    }

    .el-submenu__title:hover {
        color: rgb(255, 255, 255) !important;
        background-color: #1a1a44 !important;
    }

    .el-menu-item.is-active {
        color: rgb(255, 255, 255) !important;
        background-color: #1a1a44 !important;

        /* opacity: 0.8 !important; */
        border-right: solid 6px #7b5be3;
        transition: color .3s, background-color .3s;
    }

    .el-menu-item:hover {
        color: rgb(255, 255, 255) !important;
        background-color: #1a1a44 !important;
    }

    .el-submenu__icon-arrow:hover {
        color: #fff;
    }
}
</style>