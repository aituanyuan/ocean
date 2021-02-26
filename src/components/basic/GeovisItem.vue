<template>
    <div @click="directToPage" class="geovisItem" >
        <img class="geovisItem_img" :src="picObj[icon]"/>
        <div class="geovisItem_caption">
            <h3 class="geovisItem_caption_h">{{title}}</h3>
            <p class="geovisItem_caption_p">{{content}}</p>
        </div>
    </div>

</template>

<script>
import proOne from '../../assets/images/background/pro_1.jpg';
import proTwo from '../../assets/images/background/pro_2.jpg';
import ocean from '../../assets/images/background/ocean.jpg';
export default {
    name: 'GeovisItem',
    data() {
        return {
            picObj: {
                one: proOne,
                two: proTwo,
                ocean
            }
        };
    },
    props: {
        title: {
            type: String,
            default: '系统设置'
        },
        icon: {
            type: String,
            default: '系统设置'
        },
        content: {
            type: String,
            default: '查看地图信息'
        }
    },
    methods: {
        directToPage() {
            this.$emit('directToPage');
        }
    }
};
</script>

<style lang="less">
    .showContent {
        position: relative;
        padding: 40px 20px;
        border: 1px solid #1de9b6;
        text-align: center;
        color: #fff;
        background-image: linear-gradient(to left bottom, rgb(0, 255, 240), rgb(92, 159, 247) 40%, rgb(211, 34, 255) 80%);
        background-repeat: no-repeat;
        .container(15vw, 15vw);
    }

    .showContent div {
        position: absolute;
        top: 50%;
        left: 20px;
        display: none;
        width: 15vw;
        height: 15vw;
        transform: translateY(100%);
        transition: all .2s ease-in 0s;
    }

    .showContent:hover {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .3);
    }

    .showContent:hover div {
        display: flex;
        transform-origin: bottom;
        animation: 2s showDetail;
    }

    @keyframes showDetail {
        from {
            transform: translateY(100%);
        }

        to {
            transform: translateY(0);
        }
    }

    .geovisItem {
        position: relative;
        box-sizing: border-box;
        width: 18vw;
        height: 12vw;
        padding: 0;
        margin: 0;
        border: 1px solid #000;
        border-radius: 5px;
        overflow: hidden;
        background: #fe7253;
        transition: all .4s ease-in-out;
    }

    .geovisItem .geovisItem_img {
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
        opacity: 1;
        transition: all .4s ease-in-out;
    }

    .geovisItem:hover {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .3);
    }

    .geovisItem:hover .geovisItem_img {
        position: absolute;
        opacity: .6;
        transform: scale(1.1);
    }

    .geovisItem .geovisItem_caption {
        padding: 0;
        margin: 0;
        overflow: hidden;
        color: #fff;
        backface-visibility: hidden;
        transition: all .4s ease-in-out;
    }

    .geovisItem .geovisItem_caption::before,
    .geovisItem .geovisItem_caption::after {
        position: absolute;
        opacity: 0;
        transition: opacity .4s, transform .4s;
        content: '';
    }

    .geovisItem .geovisItem_caption::before {
        top: 14%;
        bottom: 14%;
        left: 5%;
        right: 5%;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transform: scale(0, 1);
        transform-origin: 0 0;
    }

    .geovisItem .geovisItem_caption::after {
        top: 8%;
        bottom: 8%;
        left: 10%;
        right: 10%;
        border-left: 1px solid #fff;
        transform: scale(1, 0);
        transform-origin: 100% 0;
        border-right: 1px solid #fff;
    }

    .geovisItem:hover .geovisItem_caption::before,
    .geovisItem:hover .geovisItem_caption::after {
        opacity: 1;
        transform: scale(1);
    }

    .geovisItem .geovisItem_caption,
    .geovisItem .geovisItem_caption > a {
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all .4s ease-in-out;
    }

    .geovisItem .geovisItem_caption_h {
        position: absolute;
        top: 20%;
        left: 10%;
        width: 80%;
        overflow: hidden;
        font-weight: 700;
        font-size: 1.3em;
        text-align: center;
        opacity: 1;
        transition: all .5s ease-in-out;
    }

    .geovisItem .geovisItem_caption_p {
        position: absolute;
        top: 60%;
        left: 10%;
        width: 80%;
        overflow: hidden;
        font-size: 1em;
        text-align: center;
        opacity: 0;
        transition: all .4s ease-in-out;
    }

    .geovisItem:hover .geovisItem_caption_p {
        top: 45%;
        opacity: 1;
    }
</style>