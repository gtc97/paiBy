<template>
  <div class="container">
    <GoodsHeader />
    <div class="search">
      <div class="left">
        <img class="img" src="../../../static/search_icon.png" alt="">
      </div>
      <input class="input" type="text" v-model="textSearch" placeholder="请输入库存号" />
      <div class="inpSearch" @click="myCallback(1)">搜索</div>
    </div>
    <GoodsItem :goods-list="goodsList" style="padding-bottom:2rem;" />
    <div style="position: fixed;bottom: 0rem;width: 100%;background:#fff;">
      <v-pagination
        v-if="goodsList != 0"
        :total="total"
        :currentPage="currentPage"
        :display="display"
        :pagegroup="pagegroup"
        @pagechange="myCallback"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import GoodsHeader from "./components/GoodsHeader";
import GoodsItem from "./components/GoodsItem";
import vPagination from "../../components/pagination/pagination.vue";
export default {
  name: "Goods",
  components: {
    GoodsHeader,
    GoodsItem,
    vPagination,
  },
  data() {
    return {
      textSearch: "",
      goodsList: [],
      total: 0, //数据总条数
      display: 30, //每页显示条数
      currentPage: 1, //当前页码
      pagegroup: 2, //分页条数
    };
  },
  mounted() {
    this.myCallback();
  },
  methods: {
    // getGoodsList() {
    //   this.$api.goodsList({ catId: this.$route.query.type }).then((res) => {
    //     this.goodsList = res.data;
    //     for (var i = 0; i < this.goodsList.length; i++) {
    //       this.goodsList[i].backColor = this.backColor(
    //         this.goodsList[i].onlineStatus
    //       );
    //     }
    //     console.log(res);
    //   });
    // },
    myCallback(num) {
      // this.pageNo = this.page;
      if(num){
        this.currentPage = num;
      }
      var data = {
        key: this.textSearch,
        page: this.currentPage,
        limit: this.display,
        catId: this.$route.query.type,
      };
      this.$api.goodsList(data).then((res) => {
        var dataList = res.data.data;
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].backColor = this.backColor(
            dataList[i].onlineStatus
          );
          dataList[i].status = this.backStyle(dataList[i].onlineStatus);
        }
        this.goodsList = dataList;
        this.total = res.data.total;
      });
    },
    backColor(item) {
      // 0:未开始 1:进行中 2:已结束 3:已下架 4：已流拍 5.交易中 6.已售罄
      var background = '#C0C0C0';
      if (item == 1) {
        background = '#61AF4B';
      } else if (item == 2) {
        background = '#DE4B4B';
      } else if (item == 0) {
        background = 'red';
      } else if (item == 3) {
        background = '#C0C0C0';
      } else if (item == 4) {
        background = '#C0C0C0';
      } else if (item == 5) {
        background = '#C0C0C0';
      } else if (item == 6) {
        background = '#C0C0C0';
      }
      return  background;
    },
    backStyle(item) {
      // 0:未开始 1:进行中 2:已结束 3:已下架 4：已流拍 5.交易中 6.已售罄
      var state = "已售罄";
      if (item == 1) {
        state = "进行中";
      } else if (item == 2) {
        state = "已结束";
      } else if (item == 0) {
        state = "未开始";
      } else if (item == 3) {
        state = "已下架";
      } else if (item == 4) {
        state = "已流拍";
      } else if (item == 5) {
        state = "交易中";
      } else if (item == 6) {
        state = "已售罄";
      }
      return state ;
    },
  },
};
</script>
<style scoped>
.search {
  font-size: 0.4rem;
  padding: 0.2rem;
  margin: 0.1rem;
  /* border-radius: 0.2rem; */
  /* border: 0.01rem solid #ccc; */
  background: #F7F8FA;
}
.left{
  float: left;
  height: 0.5rem;
  width: 0.5rem;
  margin: 0 0.2rem 0 0.1rem;
}
  .input{
    background: #F7F8FA;
  }
.inpSearch {
  float: right;
}
/* ul.pagination {
    display: inline-block;
    padding: 0;
    margin: 0;
}

ul.pagination li {display: inline;}

ul.pagination li a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
} */
</style>