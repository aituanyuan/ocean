<template>
    <div class="sky">
        <div class="cloud_one"></div>
        <div class="cloud_two"></div>
        <div class="cloud_three"></div>
    </div>
</template>

<script>
export default {
    name: 'BackgroundStar'
};
</script>

<style lang="less">
    .sky {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        animation: sky_background 50s ease-out 0s infinite normal none;
    }

    .cloud_one {
        position: absolute;
        top: 0;
        left: 0;
        width: 300%;
        height: 100%;
        background: url('http://demo.lanrenzhijia.com/2016/cloud1111/images/cloud_one.png') repeat-x;
        animation: cloudOne 50s linear 0s infinite normal none;
    }

    .cloud_two {
        position: absolute;
        top: 0;
        left: 0;
        width: 300%;
        height: 100%;
        background: url('http://demo.lanrenzhijia.com/2016/cloud1111/images/cloud_two.png');
        animation: cloudTwo 50s linear 0s infinite normal none;
    }

    .cloud_three {
        position: absolute;
        top: 0;
        left: 0;
        width: 300%;
        height: 100%;
        background: url('http://demo.lanrenzhijia.com/2016/cloud1111/images/cloud_three.png');
        animation: cloudThree 50s linear 0s infinite normal none;
    }

    @keyframes sky_background {
        0% {
            color: #007fd5;
            background: #007fd5;
        }

        50% {
            color: #a3d9ff;
            background: #000;
        }

        100% {
            color: #007fd5;
            background: #007fd5;
        }
    }

    @keyframes cloudOne {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-20%);
        }
    }

    @keyframes cloudTwo {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-40%);
        }
    }

    @keyframes cloudThree {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-60%);
        }
    }

</style>