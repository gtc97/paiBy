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
      <!-- <div class="item">
        <div>
          库号：<span>{{ getInfo.phone }}</span>
        </div>
      </div> -->
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
    <div class="item" style="padding-bottom: 2rem" v-show="getInfo.payPic">
      <div>付款：</div>
      <img :src="baseUrl + getInfo.payPic" style="width: 50vh" alt />
    </div>
    <!-- <div
      style="padding-bottom: 1rem"
      v-show="getUserInfo.phone && !getInfo.payPic"
    >
      <div class="title-item">
        <span
          class="borderTit"
          :style="'background-color:' + sysColor + 'color: #fff'"
        ></span
        >收款码
      </div>
      <div class="item" style="border-top: 0.05rem solid transparent">
        <div>
          收款：<span>{{ getUserInfo.phone }}</span>
          <div>
            <ul style="font-size: 0.4rem; line-height: 0.6rem">
              <li>
                收款账号：{{ getUserInfo.payAccount }}
                <i
                  class="el-icon-document-copy"
                  @click="copyUrl(getUserInfo.payAccount)"
                ></i>
              </li>
              <li>
                支付姓名：{{ getUserInfo.userName }}
                <i
                  class="el-icon-document-copy"
                  @click="copyUrl(getUserInfo.userName)"
                ></i>
              </li>
              <li>
                <img :src="baseUrl + getUserInfo.img" style="width: 60vh" alt />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
    <div class="bottom" v-if="getInfo.status == 4">
      <!-- <div class="left" @click="tihuo(getInfo)">提货</div>
      <div class="left" @click="exchangePoints">兑换积分</div>
      <div class="right" @click="sureItem(getInfo)">转拍</div>
      <div class="right" style="background: #ee0a24; color: #fff" @click="zhihuan(getInfo)"> 置换银币 </div> -->
      <div class="left" @click="tihuo(getInfo)">提货</div>
      <div class="left" @click="exchangePoints" v-show="jfdhFun == '1'">
        兑换积分
      </div>
      <div
        class="right"
        @click="sureItem(getInfo)"
        v-show="getInfo.guoqi !== 1"
      >
        转拍
      </div>
      <div
        class="right"
        style="background: #ee0a24; color: #fff"
        @click="zhihuan(getInfo)"
        v-if="(getInfo.max_yn == 1 || getInfo.status == 6) && jfdhFun !== '1'"
      >
        置换银币
      </div>
    </div>
    <div class="bottom" v-if="getInfo.status == 1">
      <div class="left" @click="handleCancelOrder(getInfo.id)">取消</div>
      <div class="right">
        <router-link
          :to="{ path: '/order', query: { id: getInfo.id } }"
          class="pay"
          >付款</router-link
        >
      </div>
    </div>
    <div class="mask" v-show="modelShow">
      <div class="model" @click="modelShow = false">×</div>
      <div class="firstCont">
        <div class="first">
          <!-- <img class="right" src="../../../static/avatar.jpg" alt="" /> -->
          <div class="right" @click="modelShow = false">×</div>
          <span style="color: #6f6d6d"
            >转拍是T+1交易，即当日转拍，下次才能出售，转拍需要缴纳转拍费。</span
          >
        </div>
        <div class="second">
          <div class="payType">您的购买单价为：{{ zhuanpaimoney.price }}</div>
          <div class="payType">
            您的转拍单价为：{{ zhuanpaimoney.zhuanpaiprice }}
          </div>
          <!-- <div class="payType">支付方式</div> -->
          <div class="payType">转拍费：{{ zhuanpaimoney.zhuanpaifei }}</div>
          <div class="payType">支付方式</div>
          <div class="payList">
            <img src="" alt="" />
            <span
              >余额支付<span style="color: #cdb4b8"
                >（可用￥{{ zhuanpaimoney.yue }}）</span
              ></span
            >
          </div>
          <div
            class="immediately"
            :style="'background:' + sysColor"
            @click="zhuanpai(getInfo.id)"
          >
            转拍
          </div>
        </div>
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
      getUserInfo: {},
      baseUrl: baseConfig.apiurl,
      sure: {},
      modelShow: false,
      money: 0,
      zhuanpaimoney: {},
      jfdhFun: "",
    };
  },
  mounted() {
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.zhuanpaiinfo(this.$route.params.id);
    this.queryOrder(this.$route.params.id);
    this.getUser(this.$route.params.id);
    this.getjifen(this.$route.params.id);
  },
  methods: {
    exchangePoints() {
      Dialog.confirm({
        title: "积分兑换",
        message: "确认兑换成积分吗?",
      }).then(() => {
        this.$api.convert({ orderid: this.$route.params.id }).then((res) => {
          Toast(res.msg);
          this.getOrderList();
          window.location.reload();
        });
      });
    },
    getjifen() {
      this.$api.jfdh().then((res) => {
        // data == 1 开启了积分兑换模式
        this.jfdhFun = res.data;
      });
    },
    sureItem(item) {
      this.modelShow = true;
      this.sure = item;
      this.getPayMoney();
      this.zhuanpaiinfo(item.id);
    },
    getPayMoney() {
      this.$api.finance().then((res) => {
        console.log(res);
        this.money = res.data.drawMoney;
        // Toast(res.msg);
      });
    },
    zhuanpaiinfo(id) {
      this.$api.zhuanpaiinfo({ orderid: id }).then((res) => {
        console.log(res);
        if (res.status != 1) {
          // Toast(res.msg);
          this.$router.go(-1);
          return;
        }
        this.zhuanpaimoney = res.data;
        // Toast(res.msg);
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
      this.$api.buyOrderInfo({ id: id }).then((res) => {
        if (res.status != 1) {
          // Toast(res.msg);
          this.$router.go(-1);
          return;
        }
        this.getInfo = res.data;
        // 获取用户支付信息
        // this.$api
        //   .getUserPayInfo({
        //     userId: res.data[0].userId,
        //     goodsId: res.data[0].goodsId,
        //   })
        //   .then((res2) => {
        //     this.userPayInfo = res2.data;
        //   });
      });
    },
    // 置换银币
    zhihuan(item) {
      Dialog.confirm({
        title: "置换",
        message: "确定置换成银币么?",
      }).then(() => {
        this.$api.mairuzhihuan({ orderid: item.id }).then((res) => {
          console.log(res);
          Toast(res.msg);
          setTimeout(() => {
            this.$router.push({
              path: "/pay",
            });
          }, 500);
          // window.location.reload();
        });
      });
    },
    // 取消订单
    handleCancelOrder(id) {
      // if (id.length <= 0) {
      //   Toast("您还没有全选");
      //   return;
      // }
      // id = typeof id === "object" ? id.join(",") : id;
      console.log(id);
      Dialog.confirm({
        title: "取消订单",
        message: "确定取消订单吗?",
      }).then(() => {
        this.$api.cancelOrder({ ids: id }).then((res) => {
          Toast(res.msg);
          // window.location.reload();
          this.$router.push({
            path: "/pay",
          });
        });
      });
    },
    copyUrl(data) {
      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      Toast("复制成功");
      oInput.remove();
    },
    getUser(id) {
      this.$api.queryOrder({ ids: id }).then((res) => {
        if (res.status === -1 || res.data.length === 0) {
          this.$router.go(-1);
          return;
        }
        this.goodDetails = res.data;
        this.$api
          .getUserPayInfo({
            userId: res.data[0].userId,
            goodsId: res.data[0].goodsId,
          })
          .then((res2) => {
            this.userPayInfo = res2.data;
            for (var i = 0; i < this.userPayInfo.length; i++) {
              if (this.userPayInfo[i].type == 3) {
                this.getUserInfo = this.userPayInfo[i];
              }
            }
          });
      });
    },
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
    zhuanpai(id) {
      Dialog.confirm({
        title: "转售",
        message: "确定转售订单吗?",
      }).then(() => {
        this.$api.sellOrder({ id: id }).then((res) => {
          if (res.status == 101) {
            Dialog.confirm({
              title: res.msg,
              message: "",
            }).then((ress) => {
              this.$router.push({
                path: "/rechargetype",
              });
            });
          } else {
            this.$router.push({
              path: "/sellOrder",
            });
          }
        });
      });
    },
    // 置换银币
    chang(item) {
      this.$api.goodsCreateorder({ id: item.id, num: 1 }).then((res) => {
        console.log(res);
        // this.getOrderList();
        this.$router.push({
          path: "/order",
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
  width: 50%;
  text-align: center;
  color: #fff;
}
.bottom .right {
  background: #fdd318;
}
.bottom .left {
  background: rgb(212, 45, 51);
}

.mask {
  position: fixed;
  // width: 100%;
  top: 0;
  // height: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  .model {
    height: 100%;
    width: 100%;
    background: rgba(122, 122, 122, 0.459);
  }
  .firstCont {
    position: fixed;
    background: #fff;
    width: 100%;
    text-align: center;
    bottom: 0;
    .first {
      font-size: 0.4rem;
      // height: 0.9rem;
      line-height: 0.9rem;
      .right {
        width: 0.9rem;
        height: 0.9rem;
        float: right;
        top: -0.1rem;
      }
    }

    .second {
      text-align: left;
      font-size: 0.45rem;
      .payType {
        height: 1.2rem;
        line-height: 1.2rem;
        padding-left: 0.2rem;
        font-size: 0.44rem;
      }
      .payList {
        height: 1.2rem;
        line-height: 1.2rem;
        padding-left: 0.2rem;
        font-size: 0.42rem;
      }
      .immediately {
        text-align: center;
        font-size: 0.5rem;
        width: 100%;
        height: 1.4rem;
        line-height: 1.4rem;
        color: #fff;
        background: #ee0a24;
      }
    }
  }
}
</style>
