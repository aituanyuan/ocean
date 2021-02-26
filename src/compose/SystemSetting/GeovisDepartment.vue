<template>
    <div>
        <geovis-edit-node
                :openFlag="openFlag"
                :title="title"
                @changeOpenFlag="changeOpenFlag"
                @changeNode="changeNode"
        />
        <vue2-org-tree
                :props="labels"
                :data="tree"
                collapsable
                :label-width="120"
                :label-class-name="labelClass"
                :render-content="renderContent"
                @on-expand="onExpand"
                @on-node-click="onNodeClick"
                @on-node-mouseover="onNodeMouseOver"
                @on-node-mouseout="onNodeMouseOut"
                selected-class-name="selected-node"
                selected-key="selectedKey"
        />
    </div>
</template>

<script>
import GeovisEditNode from './GeovisEditNode';
export default {
    name: 'GeovisDepartment',
    components: { GeovisEditNode },
    data: () => ({
        labels: { label: 'name', children: 'deptList', expand: 'expand' },
        tree: {
            label: 'Owner',
            children: []
        },
        nodeData: {},
        title: '',
        key: '',
        openFlag: false

    }),
    methods: {
        loadTree() {
            this.$RequestControl.fetch('dept').then(res => {
                this.tree = { name: '部门', deptList: res };
            });
        },
        labelClass(data) {
            return 'bg_node';
        },
        command(key, title, node) {
            if (key === 'del') {
                if (node.deptList && node.deptList.length > 0) {
                    this.$message.info('当前部门存在子部门，请先删除子部门');
                } else {
                    this.$RequestControl.fetchByGet('deleteNode', `id=${node.id}`)
                        .then(res => {
                            this.$Message.autoClosed({ title: '删除成功' });
                            this.loadTree();
                        });
                }
            } else {
                this.openFlag = true;
                this.nodeData = node;
                this.title = title;
                this.key = key;
                // this.$refs.modifyDept.showModal(key, node);
            }
        },
        renderContent(h, data) {
            // console.log(h);
            return (
                <span>
                    <el-dropdown >
                        <span>{data.name}</span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item command='add' nativeOnClick={() => this.command('add', '添加同级部门', data)}>添加同级部门</el-dropdown-item>
                            <el-dropdown-item command='addChild' nativeOnClick={() => this.command('addChild', '添加下级部门', data)}>添加下级部门</el-dropdown-item>
                            <el-dropdown-item command='edit' nativeOnClick={() => this.command('edit', `修改${data.name}`, data)}>修改部门</el-dropdown-item>
                            <el-dropdown-item command='del' on-click='command' nativeOnClick={() => this.command('del', '删除', data)}>删除部门</el-dropdown-item >
                        </el-dropdown-menu>
                    </el-dropdown >
                </span >);
        },
        onExpand(e, data) {
            if ('expand' in data) {
                data.expand = !data.expand;
                if (!data.expand && data.children) {
                    this.collapse(data.children);
                }
            } else {
                this.$set(data, 'expand', true);
            }
        },
        collapse(nodes) {
            nodes.forEach(node => {
                if (node.expand) {
                    node.expand = false;
                }

                node.children && this.collapse(node.children);
            });
        },
        onNodeClick(e, data) {
            this.$set(data, 'selectedKey', !data['selectedKey']);
        },
        onNodeMouseOver(e, data) {
            // console.log('MOUSE OVER', e);
        },
        onNodeMouseOut(e, data) {
            // console.log('MOUSE OUT', e);
        },
        changeOpenFlag(flag) {
            this.openFlag = flag;
        },
        changeNode(value) {
            if (this.key === 'add') { // 同级增加
                const node = {
                    id: '',
                    parentId: this.nodeData.parentId,
                    name: value,
                    remark: 'dddddd'
                };
                this.$RequestControl.fetchByPost('saveNode', node).then(res => {
                    this.loadTree();
                    this.openFlag = false;
                });
            }
            if (this.key === 'addChild') { // 增加子节点
                const node = {
                    id: '',
                    parentId: this.nodeData.id,
                    name: value,
                    remark: 'dddddd'
                };
                this.$RequestControl.fetchByPost('saveNode', node).then(res => {
                    this.loadTree();
                    this.openFlag = false;
                });
            }
            if (this.key === 'edit') {
                this.nodeData.name = value;
                this.nodeData.remark = 'ddddddd';
                this.$RequestControl.fetchByPost('updateNode', this.nodeData).then(res => {
                    this.loadTree();
                    this.openFlag = false;
                });
            }
        }
    },
    created() {
        this.loadTree();
    }
};
</script>

<style scoped>

</style>