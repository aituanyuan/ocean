<template>
    <div class="flex navbar">
        <div class="navbarDate">{{formateDate}}</div>
        <div class="flex flex1 navbarTitle">{{title}}</div>
        <div class="flex">
            <ul class="nav_ul">
                <li>
                    <a @click="directToPage('/login')">首页</a>
                    <span class="line"></span>
                </li>
                <li>
                    <a @click="directToPage('/show')">湿地影像</a>
                    <span class="line"></span>
                </li>
                <li>
                    <a @click="directToPage('setting/users')">系统设置</a>
                    <span class="line"></span>
                </li>
            </ul>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="circleUrl" class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderTop',
    data() {
        return {
            date: new Date(), // 实时时间
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        };
    },
    methods: {
        addZero(value) {
            return value < 10 ? '0' + value : value;
        },
        directToPage(path) {
            if (path === '/login') {
                this.$store.commit('CHANGE_HEADER_TOP_FLAG', false);
            }
            this.$router.push({ path });
        }

    },
    props: {
        title: {
            type: String,
            default: '辽宁省湿地遥感应用系统'
        }
    },
    computed: {
        // 设置一个函数来进行过滤
        formateDate(value) {
            // 创建一个时间日期对象
            const date = this.date;
            const year = date.getFullYear(); // 存储年
            const month = this.addZero(date.getMonth() + 1); // 存储月份
            const day = this.addZero(date.getDate()); // 存储日期
            const hours = this.addZero(date.getHours()); // 存储时
            const minutes = this.addZero(date.getMinutes()); // 存储分
            const seconds = this.addZero(date.getSeconds()); // 存储秒
            // 返回格式化后的日期
            return year + '年' + month + '月' + day + '日' + hours + '时' + minutes + '分' + seconds + '秒';
        }
    },
    mounted() {
        // 创建定时器更新最新的时间
        const _this = this;
        this.timeId = setInterval(function() {
            _this.date = new Date();
        }, 1000);
    },
    beforeDestroy: function() {
        // 实例销毁前青出于定时器
        if (this.timeId) {
            clearInterval(this.timeId);
        }
    }

};
</script>

<style lang="less" scoped>
    .navbar {
        justify-content: space-around;
        padding: 0 10px;
        background-color: rgb(2, 17, 50);
    }

    .navbarDate {
        align-self: center;
        font-size: 14px;
        color: #fff;
    }

    .navbarTitle {
        justify-content: center;
        align-self: center;
        font-size: 26px;
        color: #fff;
    }

    .nav_ul {
        /* background: #4386c6; */
    }

    a {
        text-decoration: none;
        color: #fff;
    }

    ul {
        list-style: none;
    }

    .nav_ul li {
        position: relative;
        float: left;
        padding: 5px 10px;
    }

    .nav_ul li .line {
        position: absolute;
        bottom: -5px;
        left: 50%;
        display: block;
        width: 0;
        height: 2px;
        background: gold;
        transition: 600ms ease-in-out;
    }

    .nav_ul li:hover .line {
        left: 0;
        width: 100%;
        transition: 600ms ease-in-out;
    }

    .nav_ul li a {
        transition: 600ms ease-in-out;
    }

    .nav_ul li a:hover {
        color: gold;
        transition: 600ms ease-in-out;
    }

    .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
            position: relative;
            margin-top: 5px;

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                cursor: pointer;
            }

            .el-icon-caret-bottom {
                position: absolute;
                top: 25px;
                right: -20px;
                font-size: 12px;
                cursor: pointer;
            }
        }
    }
</style>