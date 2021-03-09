<template>
    <div class="container">
        <common-header title="订单返佣" bg="#f5f5f5" />
        <div class="searchWord">
            <el-input v-model="search" align="center" placeholder="搜索" />
        </div>
        <el-table
            :data="tableData.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
        >
            <el-table-column prop="userName" label="姓名" align="center" width="120" />
            <el-table-column prop="orderSn" label="订单号" align="center" width="180" />
            <el-table-column prop="money" label="返佣" align="center" />
            <el-table-column prop="grade" label="等级" align="center" />
            <el-table-column prop="createTime" label="时间" align="center" width="180"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            search: ""
        };
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        onLoad() {
            this.$api.getFriendOrder().then(res => {
                this.tableData = res.data;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    background-color: #f5f5f5;
    min-height: 100vh;
}
</style>
