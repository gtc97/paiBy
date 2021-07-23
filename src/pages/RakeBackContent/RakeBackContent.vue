<template>
  <div class="container">
    <common-header title="推荐奖励" bg="#f5f5f5" />
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
          <el-table-column prop="userName" label="姓名" align="center" />
          <el-table-column v-if="getFriendsShow" label="推荐奖励" align="center" >
            <template slot-scope="scope">
              {{ scope.row.cash == 0 ? '' :scope.row.cash }}
            </template>
          </el-table-column>
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
          <el-table-column prop="userName" label="姓名" align="center" />
          <el-table-column v-if="getFriendsShow2" label="推荐奖励" align="center" >
            <template slot-scope="scope">
              {{ scope.row.cash == 0 ? '' :scope.row.cash }}
            </template>
          </el-table-column>
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
          <el-table-column prop="userName" label="姓名" align="center" />
          <el-table-column v-if="getFriendsShow3" label="推荐奖励" align="center" >
            <template slot-scope="scope">
              {{ scope.row.cash == 0 ? '' :scope.row.cash }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="时间" align="center" />
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
      tableData1: [],
      tableData2: [],
      search: "",
      sysColor:'',
      active:this.$route.query.active ? this.$route.query.active : 0,
      getFriendsShow:false,
      getFriendsShow2:false,
      getFriendsShow3:false,
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
      this.$api.getFriends().then((res) => {
        this.tableData = res.data.data;
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].cash != 0){
            this.getFriendsShow = true
          }
        }
      });
    },
    onSecond() {
      var data = { type: 2 };
      this.$api.getFriends2().then((res) => {
        this.tableData1 = res.data.data;
        for(var i=0;i<this.tableData1.length;i++){
          if(this.tableData1[i].cash != 0){
            this.getFriendsShow2 = true
          }
        }
      });
    },
    onThird() {
      var data = { type: 3 };
      this.$api.getFriends3().then((res) => {
        this.tableData2 = res.data.data;
        for(var i=0;i<this.tableData2.length;i++){
          if(this.tableData2[i].cash != 0){
            this.getFriendsShow3 = true
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
