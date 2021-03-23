<template>
  <div class="container">
    <common-header title="订单详情" bg="#fff" />
    <div>
      <div class="item">
        <div>
          手机号：<span>{{ getInfo.userPhone }}</span>
        </div>
      </div>
      <div class="border-item"></div>
      <div class="item" style="border-top: 0.05rem solid transparent">
        <div>
          商品名称：<span>{{ getInfo.goodsName }}</span>
        </div>
      </div>
      <div class="item">
        <div>
          库号：<span>{{ getInfo.phone }}</span>
        </div>
      </div>
      <div class="item">
        <div>
          订单金额：<span style="color: red;">￥{{ getInfo.price }}</span>
        </div>
      </div>
      <div class="border-item"></div>
      <div class="item" style="border-top: 0.05rem solid transparent">
        <div>
          订单编号：<span>{{ getInfo.orderSn }}</span>
        </div>
      </div>

      <div class="item">
        <div>
          下单时间：<span>{{ getInfo.createTime }}</span>
        </div>
      </div>
      <div class="item" v-show="getInfo.payMoney != '0.00'">
        <div>
          付款时间：<span>{{ getInfo.payTime }}</span>
        </div>
      </div>
      <div class="border-item"></div>
    </div>
    <div v-if="getInfo.status == 1">
      <div class="title-item">
        <span class="borderTit" :style="'background-color:' + sysColor"></span
        >收款码
      </div>
      <div class="item" style="border-top: 0.05rem solid transparent">
        <div>
          微信收款：<span>{{ getInfo.phone }}</span>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="getInfo.status == 5 || getInfo.status == 8">
      <div class="left">提货</div>
      <div class="right">转拍</div>
    </div>
    <div class="bottom" v-if="getInfo.status == 1 ">
      <div class="left" @click="handleCancelOrder(item.id)">取消</div>
      <div class="right">
        <router-link
          :to="{ path: '/order', query: { id: getInfo.id } }"
          class="pay"
          >付款</router-link
        >
        </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";

export default {
  name: "OrderDetails",
  data() {
    return {
      address: {},
      goodDetails: [],
      userPayInfo: [],
      getInfo: {},
      sysColor: localStorage.getItem("styleColor"),
    };
  },
  mounted() {
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.getDefaultAddress();
    this.queryOrder(this.$route.params.id);
  },
  methods: {
    // 获取默认地址
    getDefaultAddress() {
      this.$api.defaultAddress().then((res) => {
        this.address = res.data;
        console.log(res);
      });
    },
    // 查询订单
    queryOrder(id) {
      this.$api.sellOrderInfo({ id: id }).then((res) => {
        if (res.status != 1) {
          Toast(res.msg);
          return;
        }
        this.getInfo = res.data;
      });
    },
    // 取消订单
    handleCancelOrder(id) {
      if (id.length <= 0) {
        Toast("您还没有全选");
        return;
      }
      id = typeof id === "object" ? id.join(",") : id;
      console.log(id);
      Dialog.confirm({
        title: "取消订单",
        message: "确定取消订单吗?",
      }).then(() => {
        this.$api.cancelOrder({ ids: id }).then((res) => {
          Toast(res.msg);
          //window.location.reload();
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
}
.item {
  padding: 0.1rem;
  font-size: 0.38rem;
  line-height: 1rem;
  height: 1rem;
  border-top: 0.05rem solid #f3f0f0;
}
.border-item {
  height: 0.2rem;
  background: #f3f0f0;
}
.title-item {
  font-size: 0.4rem;
  position: relative;
  height: 1.06667rem;
  line-height: 1.06667rem;
  padding-left: 0.3rem;
}
.borderTit {
  position: absolute;
  // bottom: 0.4rem;
  left: 0;
  z-index: 1;
  height: 1.06667rem;
  width: 0.08rem;
  background-color: #ee0a24;
  border-radius: 0.08rem;
}
.bottom{
    width: 100%;
    position: fixed;
    display: flex;
    font-size: 0.6rem;
    height: 1.4rem;
    line-height: 1.4rem;
    bottom: 0;
}
.bottom div{
  width: 50%;
  text-align: center;
  color: #fff;
}
.bottom .right{
  background: #B06704
}
.bottom .left{
  background: #710C0F;

}
</style>
