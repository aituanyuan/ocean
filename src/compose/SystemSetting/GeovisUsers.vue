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
            <div class="addUser alignSelf" @click="addUser"></div>
        </div>
        <div class="flex flex1" style="height: 100%;
    overflow-y: hidden;">
            <div>
                <div style="padding: 0 40px;">
                    <el-divider content-position="left" >组织机构</el-divider>
                </div>
                <div style="width: 300px;
    height: 300px;
    border: 1px solid #3e3e3e;"></div>
            </div>
            <div class="flex flex1 column">
                <div style="padding: 0 40px;">
                    <el-divider content-position="left" >用户列表</el-divider>
                </div>
                <div
                        class="infinite-list-wrapper flex1"
                        style="overflow-y: auto;"
                        v-infinite-scroll="load"
                        infinite-scroll-disabled="disabled">
                    <div style="padding: 0 40px;">
                        <transition-group appear name="fade">
                            <user-information
                                    v-for="item in userList"
                                    :key="item.id"
                                    :userName="item.username"
                                    :userPhone="item.phone"
                                    :role="item.enabled"
                                    @changeUser="changeUser"
                            />
                        </transition-group>
                        <p v-if="loading">加载中...</p>
                        <p v-if="noMore">没有更多了</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchInput from '../../components/basic/SearchInput';
import UserInformation from '../../components/settiing/UserInformation';
import GeovisEditUser from './GeovisEditUser';
export default {
    name: 'GeovisUsers',
    data() {
        return {
            openFlag: false,
            loading: false,
            count: 1,
            user: '',
            userList: []
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
    components: { GeovisEditUser, UserInformation, SearchInput },
    methods: {
        changeOpenFlag(flag) {
            this.openFlag = flag;
        },
        getUserList() {
            this.$RequestControl.fetchByPost('userList', { pageNo: 1, pageSize: 10 }).then(res => {
                this.userList = res.data;
            });
        },
        getMobile() {
            const prefixArray = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189'];
            const i = parseInt(10 * Math.random());
            let prefix = prefixArray[i];
            for (let j = 0; j < 8; j++) {
                prefix = prefix + Math.floor(Math.random() * 10);
            }
            return prefix;
        },
        load() {
            this.loading = true;
            this.loading = false;
        },
        changeUser(event) {
            if (event.type === 'delete') {
                const index = this.userList.findIndex(item => item.phone === event.value);
                this.userList.splice(index, 1);
            }
            if (event.type === 'edit') {
                // to-do
            }
        },
        addUser() {
            this.openFlag = true;
        }
    },
    created() {
        this.getUserList();
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