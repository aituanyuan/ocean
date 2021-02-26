<template>
    <div class="information flex">
        <div class="flex"  style=" justify-content: space-between;
    width: 70%;">
            <div>{{userName}}</div>
            <div>{{userPhone}}</div>
            <div
                    :title="title[role]"
                    :class="{'normalUser': role === 1, 'adminUser': role === 2, 'centerUser': role === 3 }">

            </div>
        </div>
        <div class="flex" style="justify-content: flex-end;
    width: 30%;">
            <div @click="editUser" class="editUser" style=" align-self: center;
    margin-right: 30px;">
            </div>
            <div @click="deleteUser" class="deleteUser" style="align-self: center;"></div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'UserInformation',
    data() {
        return {
            title: {
                1: '普通用户',
                2: '中心用户',
                3: '管理员'
            }
        };
    },
    props: {
        userName: {
            type: String,
            default: '张三'
        },
        userPhone: {
            type: String,
            default: 13412341234
        },
        role: {
            type: Number,
            default: 1
        }
    },
    methods: {
        editUser() {
            this.$emit('changeUser', { type: 'edit', value: this.userPhone });
        },
        deleteUser() {
            this.$emit('changeUser', { type: 'delete', value: this.userPhone });
        }
    }
};
</script>

<style lang="less">
.information {
    .container(60px, 100%);

    justify-content: space-between;
    padding: 10px 40px;
    margin: 10px 0;
    border: 1px solid #eee;
    line-height: 40px;
    color: #000;
    transition: box-shadow .4s, transform .4s;
}

.information:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    transform: translateY(-2%);

    /* box-shadow: 1px 4px 10px 2px #CCC; */
}

.editUser {
    width: 30px;
    height: 30px;
    .backgroundImage('/icon/editUserNormal');

    background-size: cover;
}

.deleteUser {
    width: 30px;
    height: 30px;
    .backgroundImage('/icon/deleteUserNormal');

    background-size: cover;
}

.information:hover .editUser {
    .backgroundImage('/icon/editUserHover');

    background-size: cover;
}

.information:hover .deleteUser {
    .backgroundImage('/icon/deleteUserHover');

    background-size: cover;
}

.deleteUser:hover .editUser:hover {
    cursor: pointer;
}
</style>