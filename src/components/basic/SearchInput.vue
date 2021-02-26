<template>
  <div class="flex search" @keyup.enter="searchResult">
    <el-input
        type="text"
        v-model="searchKey"
        class="flex1"
        v-bind:placeholder="holderContent">
    </el-input>
    <button
        class="searchBtn searchIcon"
        @click="searchResult">
    </button>
  </div>
</template>

<script>
export default {
    name: 'SearchInput',
    props: ['holderContent', 'initValue'],
    data() {
        return {
            searchKey: this.initValue
        };
    },
    methods: {
        searchResult() {
            this.$emit('searchKey', { value: this.searchKey ? this.searchKey : '' });
        }
    }
};
</script>

<style scoped lang="less">
    .search {
        width: 330px;
        height: 30px;
        overflow: hidden;
        background-color: #fff;
    }

    .searchIcon {
        width: 30px;
        height: 30px;
        .backgroundImage('/icon/btn_search_normal');
    }

    .searchIcon:hover {
        cursor: pointer;
        .backgroundImage('/icon/btn_search_hover');
    }

    .search /deep/ {
        .el-input__inner {
            border-radius: 5px 0 0 5px;
        }
    }

    .searchBtn {
        border: 0;
    }
</style>
