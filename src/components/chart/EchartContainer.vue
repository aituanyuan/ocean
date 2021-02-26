<template>
   <div ref="echartContainer" style="width: 100%;
    height: 100%;"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'EchartContainer',
    props: {
        chartData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    methods: {
        getChartData() {
            const chart = this.$refs.echartContainer;
            if (chart) {
                const myChart = echarts.init(chart);
                this.options.series = this.chartData;
                myChart.setOption(this.options);
                window.addEventListener('resize', function() {
                    myChart.resize();
                });
                this.$on('hook:destroyed', () => {
                    window.removeEventListener('resize', function() {
                        myChart.resize();
                    });
                });
            }
        }
    },
    create() {
        this.getChartData();
    },
    watch: {
        chartData: {
            handler(newValue, oldValue) {
                this.getChartData();
            }
        }
    }
};
</script>

<style scoped>

</style>
