<template>
  <div class="container">
    <common-header title="佣金明提现细" bg="#f5f5f5" />
    <div class="fontWord">提现总额：{{total}}</div>
    <div class="searchWord">
      <el-input v-model="search" align="center" placeholder="搜索" />
    </div>
    <el-table :data="tableData">
      <el-table-column
        prop="userName"
        label="姓名"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="userPhone"
        label="手机号"
        align="center"
        width="140"
      />
      <el-table-column prop="cash" label="返佣" align="center" />
      <el-table-column prop="inviteUserName" label="直属上级" align="center" />
      <el-table-column prop="inviteType" label="等级" align="center" />
      <el-table-column
        prop="createTime"
        label="时间"
        align="center"
        width="200"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: "",
      total:'',
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$api.credit3drawList().then((res) => {
        console.log(res);
        this.total = res.data.credit3
        this.tableData = res.data.drawList;
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
.fontWord{
    margin-left: 1rem;
    font-size: 0.4rem;
}
</style>
