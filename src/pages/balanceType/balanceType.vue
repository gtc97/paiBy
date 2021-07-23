<template>
  <div class="container">
    <common-header title="余额提现明细" bg="#f5f5f5" />
    <el-table style="width: 100%" :data="tableData">
      <el-table-column
        prop="userName"
        label="姓名"
        align="center"
      ></el-table-column>
      <el-table-column prop="money" label="金额" align="center" />
      <el-table-column
        prop="statusName"
        label="状态"
        align="center"
      ></el-table-column>
      <el-table-column prop="createTime" label="时间" align="center" />
    </el-table>
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
    fun() {
      this.onLoad();
    },
    onLoad() {
      this.$api.yunelog().then((res) => {
        this.tableData = res.data.data;
        for (var i = 0; i < this.tableData.length; i++) {
          // if (this.tableData.type == 1) {
          //   this.tableData.typeCard = "银行卡";
          // } else if (this.tableData.type == 2) {
          //   this.tableData.typeCard = "支付宝";
          // } else if (this.tableData.type == 3) {
          //   this.tableData.typeCard = "微信";
          // }
          if (this.tableData[i].status == 1) {
            this.tableData[i].statusName = "待审核";
          } else if (this.tableData[i].status == 2) {
            this.tableData[i].statusName = "审核通过";
          } else if (this.tableData[i].status == 3) {
            this.tableData[i].statusName = "审核不通过";
          }
        }
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
.right {
  position: fixed;
  right: 0.3rem;
  top: 0.3rem;
  z-index: 999;
  font-size: 0.4rem;
  color: rgb(184, 12, 12);
}
</style>
