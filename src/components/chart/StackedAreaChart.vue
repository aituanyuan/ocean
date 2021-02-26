<template>
    <div ref="stackAreaChart" style="width: 450px;
    height: 240px;"></div>
</template>

<script>
export default {
    name: 'StackedAreaChart',
    data() {
        return {
            option: {
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
                ],
                series: [
                    {
                        name: '利润',
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        data: [200, 170, 240, 244, 200, 220, 210]
                    },
                    {
                        name: '收入',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true
                        },
                        data: [320, 302, 341, 374, 390, 450, 420]
                    },
                    {
                        name: '支出',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'left'
                        },
                        data: [-120, -132, -101, -134, -190, -230, -210]
                    }
                ]
            }
        };
    },
    mounted() {
        this.drawChart();
    },
    methods: {
        drawChart() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = this.$echarts.init(this.$refs.stackAreaChart);
            // 绘制图表
            myChart.setOption(this.option);
        }
    }
};
</script>

<style scoped>

</style>