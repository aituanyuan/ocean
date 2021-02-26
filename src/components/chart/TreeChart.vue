<template>
    <table v-if="treeData.name">
        <tr>
            <td :colspan="Array.isArray(treeData.children) ? treeData.children.length * 2 : 1"
                :class="{parentLevel: Array.isArray(treeData.children) && treeData.children.length, extend: Array.isArray(treeData.children) && treeData.children.length && treeData.extend}"
            >
                <div :class="{node: true, hasMate: treeData.mate}">
                    <div class="person"
                         :class="Array.isArray(treeData.class) ? treeData.class : []"
                         @click="$emit('click-node', treeData)"
                    >
                        <div class="name">{{treeData.name}}</div>
                    </div>
                    <template v-if="Array.isArray(treeData.mate) && treeData.mate.length">
                        <div class="person" v-for="(mate, mateIndex) in treeData.mate" :key="treeData.name+mateIndex"
                             :class="Array.isArray(mate.class) ? mate.class : []"
                             @click="$emit('click-node', mate)"
                        >
                            <div class="name">{{mate.name}}</div>
                        </div>
                    </template>
                </div>
                <div class="extend_handle" v-if="Array.isArray(treeData.children) && treeData.children.length"
                     @click="toggleExtend(treeData)"></div>
            </td>
        </tr>
        <tr v-if="Array.isArray(treeData.children) && treeData.children.length && treeData.extend">
            <td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel">
                <TreeChart :json="children" @click-node="$emit('click-node', $event)"/>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: 'TreeChart',
        props: ['json'],
        data() {
            return {
                treeData: {}
            };
        },
        watch: {
            json: {
                handler: function(Props) {
                    const extendKey = function(jsonData) {
                        jsonData.extend = (jsonData.extend === void 0 ? true : !!jsonData.extend);
                        if (Array.isArray(jsonData.children)) {
                            jsonData.children.forEach(c => {
                                extendKey(c);
                            });
                        }
                        return jsonData;
                    };
                    if (Props) {
                        this.treeData = extendKey(Props);
                    }
                },
                immediate: true
            }
        },
        methods: {
            toggleExtend: function(treeData) {
                treeData.extend = !treeData.extend;
                this.$forceUpdate();
            }
        }
    };
</script>

<style scoped>
    table {
        border-collapse: separate !important;
        border-spacing: 0 !important;
    }

    td {
        position: relative;
        padding: 0 0 50px;
        text-align: center;
        vertical-align: top;
    }

    .extend_handle {
        position: absolute;
        bottom: 30px;
        left: 50%;
        width: 10px;
        height: 10px;
        padding: 10px;
        transform: translate3d(-15px, 0, 0);
        cursor: pointer;
    }

    .extend_handle::before {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 2px solid;
        border-color: #ccc #ccc transparent transparent;
        transform: rotateZ(135deg);
        transform-origin: 50% 50% 0;
        transition: transform ease 300ms;
        content: "";
    }

    .extend_handle:hover::before {
        border-color: #333 #333 transparent transparent;
    }

    .extend .extend_handle::before {
        transform: rotateZ(-45deg);
    }

    .extend::after {
        position: absolute;
        bottom: 15px;
        left: 50%;
        height: 15px;
        border-left: 2px solid #ccc;
        transform: translate3d(-1px, 0, 0);
        content: "";
    }

    .childLevel::before {
        position: absolute;
        bottom: 100%;
        left: 50%;
        height: 15px;
        border-left: 2px solid #ccc;
        transform: translate3d(-1px, 0, 0);
        content: "";
    }

    .childLevel::after {
        position: absolute;
        top: -15px;
        left: 0;
        right: 0;
        border-top: 2px solid #ccc;
        content: "";
    }

    .childLevel:first-child::before,
    .childLevel:last-child::before {
        display: none;
    }

    .childLevel:first-child::after {
        left: 50%;
        height: 15px;
        border: 2px solid;
        border-color: #ccc transparent transparent #ccc;
        border-radius: 6px 0 0;
        transform: translate3d(1px, 0, 0);
    }

    .childLevel:last-child::after {
        right: 50%;
        height: 15px;
        border: 2px solid;
        border-color: #ccc #ccc transparent transparent;
        border-radius: 0 6px 0 0;
        transform: translate3d(-1px, 0, 0);
    }

    .childLevel:first-child.childLevel:last-child::after {
        left: auto;
        border-color: transparent #ccc transparent transparent;
        border-radius: 0;
        transform: translate3d(1px, 0, 0);
    }

    .node {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        margin: 0 1em;
        text-align: center;
    }

    .node .person {
        position: relative;
        z-index: 2;
        display: inline-block;
        width: 6em;
        overflow: hidden;
    }

    .node .person .avat {
        display: block;
        box-sizing: border-box;
        width: 4em;
        height: 4em;
        margin: auto;
        border: 1px solid #ccc;
        overflow: hidden;
        background: #fff;
    }

    .node .person .avat img {
        width: 100%;
        height: 100%;
    }

    .node .person .name {
        width: 100%;
        height: 2em;
        overflow: hidden;
        line-height: 2em;
    }

    .node.hasMate::after {
        position: absolute;
        z-index: 1;
        top: 2em;
        left: 2em;
        right: 2em;
        border-top: 2px solid #ccc;
        content: "";
    }

    /* 横板 */
    .landscape {
        transform: translate(-100%, 0) rotate(-90deg);
        transform-origin: 100% 0;
    }

    .landscape .node {
        width: 8em;
        height: 8em;
        text-align: left;
    }

    .landscape .person {
        position: relative;
        top: 4em;
        left: -1em;
        height: 4em;
        padding-left: 4.5em;
        transform: rotate(90deg);
    }

    .landscape .person .avat {
        position: absolute;
        left: 0;
    }

    .landscape .person .name {
        height: 4em;
        line-height: 4em;
    }

    .landscape .hasMate {
        position: relative;
    }

    .landscape .hasMate .person {
        position: absolute;
    }

    .landscape .hasMate .person:first-child {
        left: auto;
        right: -4em;
    }

    .landscape .hasMate .person:last-child {
        left: -4em;
        margin-left: 0;
    }
</style>