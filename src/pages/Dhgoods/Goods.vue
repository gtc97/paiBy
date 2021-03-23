<template>
  <div class="container">
    <GoodsHeader />
    <div v-if="goodsList != 0" class="search">
      <input type="text" v-model="textSearch" placeholder="请输入查询内容" />
      <div class="inpSearch" @click="myCallback">搜索</div>
    </div>
    <GoodsItem :goods-list="goodsList" />
    <v-pagination
      v-if="goodsList != 0"
      :total="total"
      :currentPage="currentPage"
      :display="display"
      :pagegroup="pagegroup"
      @pagechange="myCallback"
    ></v-pagination>
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
      textSearch: '',
      goodsList: [],
      total: 0, //数据总条数
      display: 2, //每页显示条数
      currentPage: 1, //当前页码
      pagegroup: 2, //分页条数
    };
  },
  mounted() {
    this.myCallback();
  },
  methods: {
    myCallback(num) {
      // this.pageNo = this.page;
      this.currentPage = num;
      var data = {
        page: this.currentPage,
        limit: this.display,
        catId: this.$route.query.type,
      };
      this.$api.dhgoodsList(data).then((res) => {
        var dataList = res.data.data;
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].backColor = this.backColor(
            dataList[i].onlineStatus
          ).background;
          dataList[i].status = this.backStyle(dataList[i].onlineStatus).state;
        }
        this.goodsList = dataList;
        this.total = res.data.total;
      });
    },
    getGoodsList() {
      console.log("8797897987");
      this.$api.dhgoodsList().then((res) => {
        this.goodsList = res.data;
        console.log(res);
      });
    },
    backColor(item) {
      // 0:未开始 1:进行中 2:已结束 3:已下架 4：已流拍 5.交易中 6.已售罄
      var background = "background:'#C0C0C0'";
      if (item == 1) {
        background = "background:'#61AF4B'";
      } else if (item == 2) {
        background = "background:'#DE4B4B'";
      } else if (item == 0) {
        background = "background:'red'";
      } else if (item == 3) {
        background = "background:'#C0C0C0'";
      } else if (item == 4) {
        background = "background:'#C0C0C0'";
      } else if (item == 5) {
        background = "background:'#C0C0C0'";
      } else if (item == 6) {
        background = "background:'#C0C0C0'";
      }
      return { background };
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
      return { state };
    },
  },
};
</script>
<style scoped>
.search {
  font-size: 0.4rem;
  padding: 0.2rem;
  margin: 0.02rem;
  border-radius: 0.2rem;
  border: 0.01rem solid #ccc;
}
.inpSearch {
  float: right;
}
</style>