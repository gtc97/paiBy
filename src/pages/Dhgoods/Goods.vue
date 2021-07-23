<template>
  <div class="container">
    <GoodsHeader />
    <div class="search">
      <div class="left">
        <img class="img" src="../../../static/search_icon.png" alt="" />
      </div>
      <input
        class="input"
        type="text"
        v-model="textSearch"
        placeholder="请输入库存号"
      />
      <div class="inpSearch" @click="myCallback(1)">搜索</div>
    </div>
    <GoodsItem :goods-list="goodsList" style="padding-bottom:2rem;"/>
    <div style="position: fixed; bottom: 1.4rem; width: 100%;background:#fff;padding-bottom:.5rem;">
      <pagination
        v-if="goodsList != 0"
        :total="total"
        :currentPage="currentPage"
        :display="display"
        :pagegroup="pagegroup"
        @pagechange="myCallback"
      ></pagination>
    </div>
  </div>
</template>

<script>
import GoodsHeader from "./components/GoodsHeader";
import GoodsItem from "./components/GoodsItem";
import Pagination from "../../components/pagination/pagination.vue";
import { Dialog,Toast } from "vant";

export default {
  name: "Goods",
  components: {
    GoodsHeader,
    GoodsItem,
    Pagination,
  },
  data() {
    return {
      textSearch: "",
      goodsList: [],
      total: 0, //数据总条数
      display: 30, //每页显示条数
      currentPage: 1, //当前页码
      pagegroup: 2, //分页条数
      // showTanChuang: false,
    };
  },
  mounted() {
    this.myCallback();
    this.jifenduihuan()
  },
  methods: {
    jifenduihuan(){
      this.$api.jifenduihuantanchuang().then((res) => {
        if(res.status == 50){
           Dialog.confirm({
              title: "开放时间",
              message: "积分兑换" + res.msg,
            }).then(() => {

            });
        }
      });
    },
    myCallback(num) {
      // this.pageNo = this.page;
      if (num) {
        this.currentPage = num;
      }
      var data = {
        key: this.textSearch,
        page: this.currentPage,
        limit: this.display,
        catId: this.$route.query.type,
      };
      this.$api.dhgoodsList(data).then((res) => {
        var dataList = res.data.data;
        for (var i = 0; i < dataList.length; i++) {
          dataList[i].backColor = this.backColor(dataList[i].onlineStatus);
          dataList[i].status = this.backStyle(dataList[i].onlineStatus);
        }
        this.goodsList = dataList;
        this.total = res.data.total;
      });
    },
    // getGoodsList() {
    //   console.log("8797897987");
    //   this.$api.dhgoodsList().then((res) => {
    //     this.goodsList = res.data;
    //     console.log(res);
    //   });
    // },
    backColor(item) {
      // 1未开始2、进行中3、已结束4、已经被兑换',
      var background = '#C0C0C0';
      if (item == 1) {
        background = 'red';
      } else if (item == 2) {
        background = '#61AF4B';
      } else if (item == 0) {
        background = '#DE4B4B';
      } else if (item == 3) {
        background = '#C0C0C0';
      } else if (item == 4) {
        background = '#C0C0C0';
      } 
      return  background;
    },
    backStyle(item) {
      // 1未开始2、进行中3、已结束4、已经被兑换',
      var state = "已售罄";
      if (item == 1) {
        state = "未开始";
      } else if (item == 2) {
        state = "进行中";
      } else if (item == 0) {
        state = "未开始";
      } else if (item == 3) {
        state = "已结束";
      } else if (item == 4) {
        state = "已经被兑换";
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
  margin: 0.02rem;
  /* border-radius: 0.2rem; */
  /* border: 0.01rem solid #ccc; */
  background: #F7F8FA;
}
.left {
  float: left;
  height: 0.5rem;
  width: 0.5rem;
  margin: 0 0.2rem 0 0.1rem;
}
.input {
  background: #f7f8fa;
}
.inpSearch {
  float: right;
}
</style>