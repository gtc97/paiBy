<template>
  <div class="container">
    <common-header title="订单详情" bg="#fff" />
    <div>
      <div class="item" style="border-top: 0.05rem solid transparent">
        <div>
          商品名称：<span>{{ getInfo.goodsName }}</span>
        </div>
      </div>
      <div class="item">
        <div>
          商品金额：<span style="color: red">￥{{ getInfo.goodsPrice }}</span>
        </div>
      </div>

      <div class="item" v-show="getInfo.onlineDate !== '0000-00-00 00:00:00'">
        <div>
          上线时间：<span>{{ getInfo.onlineDate }}</span>
        </div>
      </div>
      <div class="border-item"></div>
    </div>
    <div>
      <div class="item" style="border-top: 0.05rem solid transparent">
        <div>商品图片</div>
      </div>
      <div
        class="item"
        style="border-top: 0.05rem solid transparent"
        v-show="getInfo.goodsLogo"
      >
        <div>
          <img :src="getInfo.goodsLogo" style="width: 60vh" alt />
        </div>
      </div>
      <div class="bottom" v-if="status == 8">
        <div class="left" @click="tihuo(getInfo)">提货</div>
        <div class="right" @click="handleSellOrder(getInfo.id)">确认收款</div>
      </div>

      <div class="bottom" v-if="status == 6">
        <div class="right" @click="handleSellOrder(getInfo.id)">确认收款</div>
      </div>
      <div class="bottom" v-if="status == 8">
        <div class="left" @click="tihuo(getInfo.id)">提货</div>
        <div class="right" @click="zhihuan(getInfo.id)">置换</div>
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
      status: 0,
    };
  },
  mounted() {
    this.status = this.$route.params.status;
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
    // 置换银币
    zhihuan(id) {
      Dialog.confirm({
        title: "置换",
        message: "确定置换成银币么?",
      }).then(() => {
        this.$api.maichuzhihuan({ goodid: id }).then((res) => {
          if (res.status === 1) {
            console.log(res);
            Toast(res.msg);
            setTimeout(() => {
              this.$router.push({
                path: "/SellOrder",
              });
            }, 500);
          }
        });
      });
    },
    // 处理卖出 确认订单
    handleSellOrder(id) {
      Dialog.confirm({
        title: "确认收款",
        message: "是否确认收款么?",
      }).then(() => {
        this.$api.completeOrder({ id }).then((res) => {
          if (res.status === 1) {
            // this.getOrderList();
            this.$router.push({
              path: "/SellOrder?active=yiwancheng",
            });
          }
        });
      });
    },
    // 查询订单
    queryOrder(id) {
      this.$api.blinfo({ id: id }).then((res) => {
        if (res.status != 1) {
          Toast(res.msg);
          this.$router.go(-1)
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
          // Toast(res.msg);
          window.location.reload();
        });
      });
    },
    // 提货
    tihuo(id) {
      Dialog.confirm({
        title: "提货",
        message: "将根据默认地发货，确定提货么?",
      }).then(() => {
        this.$api.tihuo({ id: id, addressId: 1 }).then((res) => {
          Toast(res.msg);
          console.log(res);
          // this.getOrderList();
          this.$router.push({
            path: "/dingdan",
          });
        });
      });
    },
    // 转拍
    zhunpai(id) {
      Dialog.confirm({
        title: "转售",
        message: "确定转售订单吗?",
      }).then(() => {
        this.$api.sellOrder({ id }).then((res) => {
          Toast(res.msg);
          // this.getOrderList();
          this.$router.push({
            path: "/order",
          });
          // window.location.reload();
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
.bottom {
  width: 100%;
  position: fixed;
  display: flex;
  font-size: 0.6rem;
  height: 1.4rem;
  line-height: 1.4rem;
  bottom: 0;
}
.bottom div {
  width: 50%;
  text-align: center;
  color: #fff;
}
.bottom .right {
  background: #b06704;
}
.bottom .left {
  background: #710c0f;
}
</style>
