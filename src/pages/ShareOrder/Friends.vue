<template>
  <div class="container">
    <common-header title="好友明细" bg="#f5f5f5"/>
    <el-table :data="tableData" >
      <el-table-column
        prop="userName"
        label="姓名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="手机号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="child"
        label="下级"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.onLoad()
    },
    methods: {
      onLoad() {
        this.$api.getFriends().then((res) => {
          this.tableData = res.data.data
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .container {
    background-color: #f5f5f5;
    min-height: 100vh;
  }

</style>
