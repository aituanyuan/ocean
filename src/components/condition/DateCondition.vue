<template>
    <div class="dateCondition flex column backgroundImage justContent" >
        <div class="flex" style="align-self: center;">
            <el-form  class="dateForm" ref="dateForm" :model="userData" label-width="70px"  size="mini">
                <el-form-item label="时间范围" prop="value">
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="月范围" prop="value">
                    <el-date-picker
                            v-model="value"
                            type="monthrange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="周选择" prop="value">
                    <el-date-picker
                            v-model="value"
                            type="week"
                            format="yyyy 第 WW 周"
                            placeholder="选择周">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DateCondition',
    data() {
        return {
            userData: {
                value: '',
                value1: ''
            }
        };
    }
};
</script>

<style lang="less" scoped>
.dateCondition {
    margin-top: 10px;
    .container(40vh, 30vw);
}

.backgroundImage {
    .backgroundImage('/background/blueS');

    background-size: 100% 100%;
}

/deep/ .el-popper[x-placement^="bottom"] {
    z-index: 100000;
}

/deep/.el-range-editor--mini .el-range-separator {
    width: 30px;
}

/deep/.el-range-editor--mini.el-input__inner {
    width: 280px;
}

/deep/.el-form-item__label {
    color: #fff;
}
</style>