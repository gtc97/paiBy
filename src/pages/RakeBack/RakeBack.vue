<template>
  <div class="container">
    <common-header title="订单返佣" bg="#f5f5f5" />
    <van-tabs
      v-model="active"
      :ellipsis="false"
      :color="sysColor"
      :title-active-color="sysColor"
      title-inactive-color="#333"
      animated
    >
      <van-tab title="一级" name="all">
        <el-table
          style="width: 100%"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.userName.toLowerCase().includes(search.toLowerCase())
            )
          "
        >
          <el-table-column prop="orderSn" label="订单号" align="center" />
          <el-table-column prop="money" label="金额" align="center" />
          <el-table-column prop="createTime" label="时间" align="center" />
        </el-table>
      </van-tab>
      <van-tab title="二级" name="all">
        <el-table
          style="width: 100%"
          :data="
            tableData1.filter(
              (data) =>
                !search ||
                data.userName.toLowerCase().includes(search.toLowerCase())
            )
          "
        >
          <el-table-column prop="orderSn" label="订单号" align="center" />
          <el-table-column prop="money" label="金额" align="center" />
          <el-table-column prop="createTime" label="时间" align="center" />
        </el-table>
      </van-tab>
      <van-tab title="三级" name="all">
        <el-table
          style="width: 100%"
          :data="
            tableData2.filter(
              (data) =>
                !search ||
                data.userName.toLowerCase().includes(search.toLowerCase())
            )
          "
        >
          <el-table-column prop="orderSn" label="订单号" align="center" />
          <el-table-column prop="money" label="金额" align="center" />
          <el-table-column prop="createTime" label="时间" align="center" />
        </el-table>
      </van-tab>
    </van-tabs>
    <!-- <div class="searchWord">
            <el-input v-model="search" align="center" placeholder="搜索" />
        </div> -->
    <!-- <el-table
      style="width: 100%"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.userName.toLowerCase().includes(search.toLowerCase())
        )
      "
    >
      <el-table-column prop="userName" label="姓名" align="center" />
      <el-table-column prop="orderSn" label="订单号" align="center" />
      <el-table-column prop="money" label="返佣" align="center" />
      <el-table-column prop="grade" label="等级" align="center" />
      <el-table-column
        prop="createTime"
        label="时间"
        align="center"
      ></el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
      tableData2: [],
      search: "",
      sysColor:'',
      active:this.$route.query.active ? this.$route.query.active : 0,
    };
  },
  mounted() {
      
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.onLoad();
    this.onSecond();
    this.onThird();
  },
  methods: {
    onLoad() {
      var data = { type: 1 };
      this.$api.getFriendOrder(data).then((res) => {
        this.tableData = res.data.data;
      });
    },
    onSecond() {
      var data = { type: 2 };
      this.$api.getFriendOrder(data).then((res) => {
        this.tableData1 = res.data.data;
      });
    },
    onThird() {
      var data = { type: 3 };
      this.$api.getFriendOrder(data).then((res) => {
        this.tableData2 = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
