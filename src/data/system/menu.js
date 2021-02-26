const role = [
    {
        id: 'system',
        label: '系统管理',
        disabled: true,
        className: 'group-class tree-icon',
        children: [
            {
                id: 'user',
                label: '用户管理',
                className: 'group-class tree-icon',
                children: [
                    {
                        id: 'userAdd',
                        label: '用户新增',
                        className: 'group-class tree-icon'
                    },
                    {
                        id: 'userEdit',
                        label: '用户编辑',
                        className: 'group-class tree-icon'
                    },
                    {
                        id: 'userDelete',
                        label: '用户删除',
                        className: 'group-class tree-icon'
                    }
                ]
            },
            {
                id: 'roles',
                label: '角色管理',
                className: 'group-class tree-icon',
                children: [
                    {
                        id: 'roleCreate',
                        label: '角色新增',
                        className: 'group-class tree-icon'
                    },
                    {
                        id: 'roleEdit',
                        label: '角色编辑',
                        className: 'group-class tree-icon'
                    },
                    {
                        id: 'roleDelete',
                        label: '角色删除',
                        className: 'group-class tree-icon'
                    }
                ]
            }
        ]
    }
];
export default role;
