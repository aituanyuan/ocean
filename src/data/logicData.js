const logicData = {
    climateFilters: [
        {
            type: 'text',
            optGroup: '气温',
            id: 'temperature',
            key: 'temperature',
            options: [
                {
                    id: 'AVEAT',
                    field: 'AVEAT',
                    fieldName: '平均气温',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'number',
                    operators: ['less', 'lessOrEqual', 'greater', 'greaterOrEqual', 'between'],
                    defaultOperator: 'lessOrEqual',
                    validation: {
                        min: 0,
                        max: 50
                    },
                    size: 20
                },
                {
                    id: 'MINAT',
                    field: 'MINAT',
                    fieldName: '最低气温',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'number',
                    operators: ['less', 'lessOrEqual', 'greater', 'greaterOrEqual', 'between'],
                    defaultOperator: 'lessOrEqual',
                    validation: {
                        min: 0
                    },
                    size: 20
                },
                {
                    id: 'MAXAT',
                    field: 'MAXAT',
                    fieldName: '最高气温',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'number',
                    operators: ['less', 'lessOrEqual', 'greater', 'greaterOrEqual', 'between'],
                    defaultOperator: 'lessOrEqual',
                    validation: {
                        min: 0
                    },
                    size: 20
                }
            ]

        },
        {
            optGroup: '能见度',
            id: 'conspicurity',
            key: 'conspicurity',
            options: [
                {
                    id: 'MAXVIS',
                    field: 'VIS',
                    fieldName: '最大能见度',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'number',
                    operators: ['less', 'lessOrEqual', 'greater', 'greaterOrEqual', 'between'],
                    defaultOperator: 'greaterOrEqual',
                    validation: {
                        min: 0,
                        max: 50
                    },
                    size: 10
                },
                {
                    id: 'MINVIS',
                    field: 'VIS',
                    fieldName: '最小能见度',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'number',
                    operators: ['less', 'lessOrEqual', 'greater', 'greaterOrEqual', 'between'],
                    defaultOperator: 'greaterOrEqual',
                    validation: {
                        min: 0
                    },
                    size: 20
                },
                {
                    id: 'DAYVIS1',
                    field: 'VIS',
                    fieldName: '能见度(<1KM)',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'radio',
                    operators: ['equal'],
                    defaultOperator: 'equal',
                    values: [
                        {
                            name: '无',
                            value: 0
                        },
                        {
                            name: '有',
                            value: 1
                        }
                    ],
                    validation: {
                        min: 0
                    },
                    size: 30
                },
                {
                    id: 'DAYVIS4',
                    field: 'VIS',
                    fieldName: '能见度(1~4KM)',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'radio',
                    operators: ['equal'],
                    defaultOperator: 'equal',
                    values: [
                        {
                            name: '无',
                            value: 0
                        },
                        {
                            name: '有',
                            value: 1
                        }
                    ],
                    validation: {
                        min: 0
                    },
                    size: 30
                },
                {
                    id: 'DAYVIS10',
                    field: 'VIS',
                    fieldName: '能见度(1~10KM)',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'radio',
                    operators: ['equal'],
                    defaultOperator: 'equal',
                    values: [
                        {
                            name: '无',
                            value: 0
                        },
                        {
                            name: '有',
                            value: 1
                        }
                    ],
                    validation: {
                        min: 0
                    },
                    size: 30
                },
                {
                    id: 'DAYVIS',
                    field: 'VIS',
                    fieldName: '能见度(>10KM)',
                    icon: '',
                    valueSepatator: '',
                    type: 'double',
                    input: 'radio',
                    operators: ['equal'],
                    defaultOperator: 'equal',
                    values: [
                        {
                            name: '无',
                            value: 0
                        },
                        {
                            name: '有',
                            value: 1
                        }
                    ],
                    validation: {
                        min: 0
                    },
                    size: 30
                }
            ]

        }
    ],
    operators: {
        equal: '等于',
        notEqual: '不等于',
        in: '在...之内',
        notIn: '不在...之内',
        less: '小于',
        lessOrEqual: '小于或等于',
        greater: '大于',
        greaterOrEqual: '大于或等于',
        between: '在...之间',
        notBetween: '不在...之间',
        beginsWith: '以...开始',
        notBeginsWith: '不以...开始',
        contains: '包含以下内容',
        notContains: '不包含以下内容',
        endsWith: '以...结束',
        notEndsWith: '不以...结束',
        isEmpty: '为空',
        isNotEmpty: '不为空',
        isNull: '为null',
        isNotNull: '不为null'
    },
    factorOrUnit: {
        AVEAT: '℃',
        MINAT: '℃',
        MAXAT: '℃',
        AVERH: '%',
        MINRH: '%',
        MAXRH: '%',
        PREWL0: '天',
        PREWL01: '天',
        PREWL02: '天',
        PREWL03: '天',
        PREWL04: '天',
        PREWL05: '天',
        PREWL06: '天',
        PREWL07: '天',
        PREWL08: '天',
        PREWL09: '天',
        PREWL10: '天',
        PREWL11: '天',
        PREWL12: '天',
        DAYCC1: '天',
        DAYCC2: '天',
        DAYRAIN: '天',
        DAYCWH: '天',
        DAYTHU: '天',
        DAYWS14: '天',
        DAYWS15: '天',
        DAYWS17: '天',
        DAYWS30: '天',
        DAYRAIN24: '天',
        AVEWS: 'm/s',
        AVEWS5: 'm/s',
        AVEWS10: 'm/s',
        AVEWS15: 'm/s',
        AVEWS20: 'm/s',
        AVEWS25: 'm/s',
        AVEWS30: 'm/s',
        AVEWS35: 'm/s',
        AVEWS40: 'm/s',
        AVEWS45: 'm/s',
        AVEWS50: 'm/s',
        AVEWS55: 'm/s',
        AVEWS60: 'm/s',
        MAXWS: 'm/s',
        MAXWS5: 'm/s',
        MAXWS10: 'm/s',
        MAXWS15: 'm/s',
        MAXWS20: 'm/s',
        MAXWS25: 'm/s',
        MAXWS30: 'm/s',
        MAXWS35: 'm/s',
        MAXWS40: 'm/s',
        MAXWS45: 'm/s',
        MAXWS50: 'm/s',
        MAXWS55: 'm/s',
        MAXWS60: 'm/s',
        AVGTCC: 'm',
        AVGCBH: 'm',
        MINCBH: 'm',
        MAXCBH: 'm',
        MAXVIS: 'm',
        MINVIS: 'm',
        AVGCWH: 'm',
        AVGCWT: 'm',
        AVGRAIN: 'mm',
        MAXRAIN: 'mm',
        AVGRAIN24: 'mm',
        MAXRAIN24: 'mm',
        AVGSS: '级',
        MAXSS: '级',
        MINSS: '级'
    },
    logicOperator: {
        less: '<',
        lessOrEqual: '<=',
        greater: '>',
        greaterOrEqual: '>=',
        between: '',
        OR: '或',
        AND: '且'
    }
};
export default logicData;
