<template>
  <div class="container">
    <common-header title="银币明细" bg="#f5f5f5" />
    <div class="searchWord">
      <el-input v-model="search" align="center" placeholder="搜索" />
    </div>
    <el-table :data="tableData.filter((data) => !search || data.userName.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column prop="typeName" label="类型" align="center" />
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.add }}{{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="时间"
        align="center"
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
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.$api.credit1log({ type: 1 }).then((res) => {
        this.tableData = res.data.data;
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].type == 1) {
            this.tableData[i].typeName = "转送";
            this.tableData[i].add = "-";
          } else if (this.tableData[i].type == 2) {
            this.tableData[i].add = "+";
            this.tableData[i].typeName = "置换银币";
          } else if (this.tableData[i].type == 3) {
            this.tableData[i].add = "+";
            this.tableData[i].typeName = "积分兑换";
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
</style>
