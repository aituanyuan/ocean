const treeData = [
    {
        id: 'FY3DPretreatment',
        label: 'FY3D数据预处理',
        disabled: true,
        className: 'group-class tree-icon',
        children: [
            {
                id: 'FY3D',
                label: 'FY3D产品',
                className: 'group-class tree-icon'
            }
        ]
    },
    {
        id: 'dataMerge',
        label: '高分数据融合',
        className: '',
        children: [
            {
                id: 'GF1MergeProduct',
                label: 'GF1融合产品',
                className: ''
            }
        ]
    },
    {
        id: 'supervised',
        label: '监督分类产品',
        disabled: true,
        className: '',
        children: [
            {
                id: 'wildClassify',
                label: '湿地分类结果',
                type: 'classify',
                min: 1,
                max: 4,
                className: ''
            }
        ]
    },
    {
        id: 'surveyProducts',
        label: '生态质量检测评估产品',
        className: '',
        children: [
            {
                id: 'beachCover',
                label: '滩涂湿地植被覆盖度',
                type: 'cover',
                min: 300,
                max: 900,
                className: ''
            },
            {
                id: 'beachGrowth',
                label: '滩涂碱蓬长势',
                type: 'growth',
                min: 0.1,
                max: 9,
                className: ''
            },
            {
                id: 'reedCover',
                type: 'cover',
                min: 300,
                max: 900,
                label: '芦苇湿地覆盖度',
                className: ''
            },
            {
                id: 'reedProductivityIndex',
                type: 'growth',
                min: 300,
                max: 900,
                label: '芦苇植被净初级生产力指数',
                className: ''
            },
            {
                id: 'riceGrowth',
                label: '水稻长势监测',
                type: 'growth',
                min: 0.1,
                max: 9,
                className: ''
            },
            {
                id: 'riceYieldPrediction',
                type: 'estimate',
                min: 0.1,
                max: 9,
                label: '水稻产量预估',
                className: ''
            },
            {
                id: 'waterQualityMonitoring',
                label: '水体水质监测',
                type: 'monitor',
                min: 50,
                max: 300,
                className: ''
            },
            {
                id: 'wetlandEcologicalQualityMonitoring',
                label: '湿地生态质量监测',
                type: 'monitor',
                min: 50,
                max: 300,
                className: ''
            }
        ]
    }
];

export default treeData;
