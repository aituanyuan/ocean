<template>
    <div class="flex overview column">
        <NavigationBar style=" width: 100%;
    height: 80px;"></NavigationBar>
        <div class="flex justContent column">
            <div v-for="item in showContent" class="flex showRow" :key="item.key">
                <geovis-item v-for="obj in item.children"
                             :key="obj.key"
                             :title="obj.title"
                             :content="obj.content"
                             :icon="obj.icon"
                             @directToPage="directToPage(obj.key)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '../components/basic/NavigationBar';
import GeovisItem from '../components/basic/GeovisItem';
export default {
    name: 'OverView',
    data() {
        return {
            showContent: [
                {
                    key: 'firstRow',
                    children: [
                        {
                            title: '数据展示',
                            content: '根据要素和时间显示信息',
                            key: 'show',
                            icon: 'one'
                        },
                        {
                            title: '系统设置',
                            content: '上传tif、shp等相关数据',
                            key: 'upLoad',
                            icon: 'two'
                        }
                    ]
                },
                {
                    key: 'secondRow',
                    children: [
                        {
                            title: '文档管理',
                            content: '根据要素和时间显示信息',
                            key: 'document',
                            icon: 'two'
                        },
                        {
                            title: '系统设置',
                            content: '上传tif、shp等相关数据',
                            key: 'setting',
                            icon: 'one'
                        }
                    ]
                }
            ]
        };
    },
    components: { GeovisItem, NavigationBar },
    methods: {
        directToPage(type) {
            this.$router.push({ path: type === 'system' ? `${type}/users` : type });
        }
    }
};
</script>

<style lang="less">
.overview {
    .backgroundGif('/background/ocean');

    background-size: 100%;
    .container(100%, 100%);
}

.showRow {
    justify-content: space-between;
    align-self: center;
    width: 40vw;
    margin: 20px 0;
}
</style>