<template>
    <div>
        <el-date-picker
                v-model="selectedDate"
                type="monthrange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                :picker-options="pickerOptions">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    name: 'CompareDate',
    data() {
        return {
            selectedDate: '',
            pickerOptions: {
                shortcuts: [
                    {
                        text: '本月',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    },
                    {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            value1: '',
            value2: ''
        };
    }
};
</script>

<style scoped>

</style>