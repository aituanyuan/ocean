<template>
    <div class="factorTree backgroundImage flex justContent" >
        <div class="flex1" style=" align-self: center;
    height: 70%;
    overflow-y: auto;">
            <el-tree
                    ref="tree"
                    :data="data"
                    :indent='0'
                    :props="defaultProps"
                    show-checkbox
                    default-expand-all
                    check-strictly
                    node-key="id"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="checkedKeys"
                    @check="checkGroupNode"
            >
            </el-tree>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'FactorsCondition',
        data() {
            return {
                data: [
                    {
                        id: 1,
                        label: '生态环境类产品',
                        disabled: true,
                        className: 'group-class tree-icon',
                        children: [
                            {
                                id: 'greenTide',
                                label: '绿潮',
                                className: 'group-class tree-icon'
                            },
                            {
                                id: 'seaIce',
                                label: '海冰',
                                className: 'group-class tree-icon'
                            },
                            {
                                id: 'seaport',
                                label: '海口排污',
                                className: 'group-class tree-icon'
                            }
                        ]
                    },
                    {
                        id: 'disaster',
                        label: '防灾减灾类产品',
                        className: '',
                        children: [
                            {
                                id: 'typhoon',
                                label: '台风',
                                className: ''
                            },
                            {
                                id: 'oilSpill',
                                label: '溢油',
                                className: ''
                            }
                        ]
                    },
                    {
                        id: '国土空间资源类产品',
                        label: 'resources',
                        disabled: true,
                        className: '',
                        children: [
                            {
                                id: 'reclamation',
                                label: '围填海',
                                className: ''
                            },
                            {
                                id: 'coastalZone',
                                label: '海岸带',
                                className: ''
                            },
                            {
                                id: 'estuarineWetland',
                                label: '河口湿地',
                                className: ''
                            }
                        ]
                    },
                    {
                        id: 'surveyProducts',
                        label: '自然资源调查类产品',
                        className: '',
                        children: [
                            {
                                id: 'coralReef',
                                label: '珊瑚礁',
                                className: ''
                            },
                            {
                                id: 'mangrove',
                                label: '红树林',
                                className: ''
                            },
                            {
                                id: 'blueCarbon',
                                label: '蓝碳',
                                className: ''
                            }
                        ]
                    },
                    {
                        id: 'globalMarineElementProducts',
                        label: '全球海洋要素类产品',
                        className: '',
                        disabled: true,
                        children: [
                            {
                                id: 'seaSurfaceTemperature',
                                label: '海面温度',
                                className: ''
                            },
                            {
                                id: 'seaSurfaceWindField',
                                label: '海面风场',
                                className: ''
                            },
                            {
                                id: '',
                                label: '海表叶绿素浓度',
                                className: ''
                            }
                        ]
                    },
                    {
                        id: 'chlorophyllConcentration',
                        label: '国际海洋权益类产品',
                        className: '',
                        disabled: true,
                        children: [
                            {
                                id: 'aisBoat',
                                label: 'AIS船只',
                                className: ''
                            },
                            {
                                id: 'marineFishery',
                                label: '海洋渔业',
                                className: ''
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        computed: {
            ...mapGetters({
                checkedKeys: 'getCheckedKeys'
            })
        },
        methods: {
            handleNodeClick(node) {
                console.log(node);
            },
            checkGroupNode(a, b) {
                this.checkedKeys.length = 0;
                if (b.checkedKeys.length > 0) {
                    this.$refs.tree.setCheckedKeys([a.id]);
                    this.$store.commit('SELECT_TREE_KEYS', a.id);
                    this.$emit('treeNode', a);
                }
            },
            checkFn(node, data) {
                console.log(11111, node, data);
                // const checkedKeys = data.checkedKeys;
                const currKey = node.id;
                this.$refs.tree2.setCheckedKeys([currKey]);
                this.$emit('nodeSelect', node);
            },
            renderContent(h, { node, data, store }) {
                // return (
                //     <span>
                //         <i class={data.className}></i>
                //         <span>{node.label}</span>
                //     </span>
                // );
            }

        }
    };
</script>

<style lang="less">
    .factorTree {
        /* width: 100%; */

        /* height: 40vh; */

        /* overflow-y: auto; */

        /* padding: 0 4vw; */
    }

    .backgroundImage {
        .backgroundImage('/background/blueS');

        background-size: 100% 100%;
    }

    .factorTree /deep/ {
        .el-tree {
            color: #fff;
            background: rgba(0, 0, 0, .3);
        }

        .el-tree-node__content:hover {
            background-color: rgba(29, 233, 182, .6);
        }

        .el-tree-node::after {
            position: absolute;
            top: 12px;
            left: -4px;
            right: auto;
            width: 24px;
            height: 20px;
            border-width: 1px;
            border-top: 1px dashed #4386c6;
            content: "";
        }

        .el-tree > .el-tree-node::after {
            border-top: none;
        }

        .el-tree-node {
            position: relative;
            padding-left: 16px;
        }

        .el-checkbox .is-disabled {
            display: none;
        }
        //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉

        .el-tree-node__expand-icon.is-leaf {
            display: none;
        }

        .el-tree-node__children {
            padding-left: 16px;
        }

        .el-tree-node :last-child::before {
            height: 38px;
        }

        .el-tree-node::before {
            position: absolute;
            top: -26px;
            bottom: 0;
            left: -4px;
            right: auto;
            width: 1px;
            height: 100%;
            border-width: 1px;
            border-left: 1px dashed #4386c6;
            content: "";
        }

        .el-tree > .el-tree-node::before {
            border-left: none;
        }

        .el-tree-node:last-child::after {
            border-left: 1px dashed #4386c6;
        }

        .el-tree:last-child > .el-tree-node:last-child::after {
            border-left: initial;
        }
    }
</style>