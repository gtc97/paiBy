<template>
  <div class="container">
    <common-header title="好友明细" bg="#f5f5f5" />
    <div class="right">
      <span><router-link to="/RewardsGive">转赠</router-link></span>
    </div>
    <van-tabs
      v-model="active"
      :ellipsis="false"
      :color="sysColor"
      :title-active-color="sysColor"
      title-inactive-color="#333"
      animated
      @change="fun"
    >
      <van-tab title="一级" name="all">
        <el-table style="width: 100%" :data="tableData">
          <el-table-column
            prop="userName"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column prop="userPhone" label="手机号" align="center" />
          <el-table-column
            prop="createTime"
            label="时间"
            align="center"
          ></el-table-column>
        </el-table>
      </van-tab>
      <van-tab title="二级" name="all">
        <el-table style="width: 100%" :data="tableData2">
          <el-table-column
            prop="userName"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column prop="userPhone" label="手机号" align="center" />
          <el-table-column
            prop="createTime"
            label="时间"
            align="center"
          ></el-table-column>
        </el-table>
      </van-tab>
      <van-tab title="三级" name="all">
        <el-table style="width: 100%" :data="tableData3">
          <el-table-column
            prop="userName"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column prop="userPhone" label="手机号" align="center" />
          <el-table-column
            prop="createTime"
            label="时间"
            align="center"
          ></el-table-column>
        </el-table>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      tableData3: [],
      search: "",
      sysColor: localStorage.getItem("styleColor"),
      active: this.$route.query.active ? this.$route.query.active : 0,
      orderAll: [],
    };
  },
  mounted() {
    this.fun();
  },
  methods: {
    fun(){
       this.onLoad();
      this.onSecond();
      this.onThird();
    },
    onLoad() {
      var data = { type: 1 };
      this.$api.getFriends().then((res) => {
        this.tableData = res.data.data;
      });
    },
    onThird() {
      var data = { type: 3 };
      this.$api.getFriends3().then((res) => {
        this.tableData3 = res.data.data;
      });
    },
    onSecond() {
      var data = { type: 2 };
      this.$api.getFriends2().then((res) => {
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
.right{
  position: fixed;
  right: 0.3rem;
  top: 0.3rem;
  z-index: 999;
  font-size: 0.4rem;
  color: rgb(184, 12, 12);
}
</style>
