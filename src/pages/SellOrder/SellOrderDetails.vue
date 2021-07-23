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
          订单金额：<span style="color: red">￥{{ getInfo.price }}</span>
        </div>
      </div>
      <div class="border-item"></div>
      <div class="item" style="border-top: 0.05rem solid transparent">
        <div>
          订单编号：<span>{{ getInfo.orderSn }}</span>
        </div>
      </div>

      <div class="item" v-show="getInfo.createTime !== '0000-00-00 00:00:00'">
        <div>
          下单时间：<span>{{ getInfo.createTime }}</span>
        </div>
      </div>
      <div class="item" v-show="getInfo.payTime !== '0000-00-00 00:00:00'">
        <div>
          付款时间：<span>{{ getInfo.payTime }}</span>
        </div>
      </div>
      <div class="item" v-show="getInfo.endTime !== '0000-00-00 00:00:00'">
        <div>
          完成时间：<span>{{ getInfo.endTime }}</span>
        </div>
      </div>
      <div class="border-item"></div>
    </div>
    <div>
      <div
        v-show="getInfo.payPic"
        class="item"
        style="border-top: 0.05rem solid transparent"
      >
        <div>
          微信收款：<span>{{ getInfo.phone }}</span>
        </div>
      </div>
      <div
        class="item"
        style="border-top: 0.05rem solid transparent"
        v-show="getInfo.payPic"
      >
        <div>
          <img :src="baseUrl + getInfo.payPic" style="width: 60vh" alt />
        </div>
      </div>
      <div
        v-show="getInfo.goodsLogo"
        class="item"
        style="border-top: 0.05rem solid transparent"
      >
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
    </div>
    <div class="bottom" v-show="getInfo.status == 2">
      <div class="right" @click="shoukuan(getInfo.id)">确认收款</div>
    </div>
    <!-- <div class="bottom" v-show="getInfo.status == 3">
      <div class="right" @click="shoukuan(getInfo.id)">确认收款</div>
    </div> -->

  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import configObj from "@/http/config";

export default {
  name: "OrderDetails",
  data() {
    return {
      baseUrl: baseConfig.apiurl,
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
    // 确认收款
    shoukuan(id) {
      Dialog.confirm({
        title: "确认收款",
        message: "是否确认收款么?",
      }).then(() => {
        this.$api.completeOrder({ id }).then((res) => {
          if (res.status === 1) {
            // this.getOrderList();
            Toast(res.msg);
            // window.location.reload();
            // this.active = 'yiwancheng'
            this.$router.push({
              path: "/SellOrder?active=yiwancheng",
            });
          }
        });
      });
    },
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
          Toast(res.msg);
          //window.location.reload();
          this.$router.push({
            path: "/pay",
          });
        });
      });
    },
    // 提货
    tihuo(item) {
      Dialog.confirm({
        title: "提货",
        message: "将根据默认地发货，确定提货么?",
      }).then(() => {
        this.$api.tihuo({ id: item.id, addressId: 1 }).then((res) => {
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
  // height: 1rem;
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
  width: 100%;
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
