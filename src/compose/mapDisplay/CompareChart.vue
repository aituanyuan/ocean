<template>
    <echart-container
            :options="options"
            :chartData="chartData"
    />
</template>

<script>
import EchartContainer from '../../components/chart/EchartContainer';
export default {
    name: 'CompareChart',
    data() {
        return {
            options: {
                textStyle: {
                    color: '#fff'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ]
            }
        };
    },
    props: {
        chartData: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    components: { EchartContainer }
};
</script>

<style scoped>

</style>
