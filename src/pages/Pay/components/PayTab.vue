<template>
  <div class="pay-tab">
    <van-tabs
      v-model="active"
      :ellipsis="false"
      :color="sysColor"
      :title-active-color="sysColor"
      title-inactive-color="#333"
      animated
      @change="onNavBarClick"
    >
      <van-tab title="全部" name="all">
        <div class="item-list">
          <div v-for="item of orderAll" :key="item.id" class="item">
            <div>
              <div style="font-size: 0.32rem; margin-bottom: 0.2rem">
                <span data-v-2c8a74d2>购买时间：{{ item.createTime }}</span>
              </div>
              <div class="item-header" @click="navTO(item)">
                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>
                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>
              <div style="float: left; font-size: 0.32rem">
                <span data-v-2c8a74d2>卖家电话：{{ item.userPhone }}</span>
              </div>
              <div class="item-bottom">
                {{ printStatusText(item.status) }}
                <span v-if="item.status != 6">¥{{ item.sumPrice }}</span>
              </div>
              <div class="item-button" style="z-index: 99">
                <router-link
                  :to="{ path: '/order', query: { id: item.id } }"
                  class="pay"
                  v-if="item.status == 1"
                  >付款</router-link
                >
                <div
                  v-if="item.status == 1"
                  class="cancel"
                  style="margin-right: 0.2rem"
                  @click="handleCancelOrder(item.id)"
                >
                  取消
                </div>
                <div
                  class="cancel"
                  v-show="
                    (item.max_yn == 1 || item.guoqi == 1) &&
                    item.status == 4 &&
                    jfdhFun !== '1'
                  "
                  @click="chang(item)"
                >
                  置换
                </div>
                <div
                  v-if="item.status == 4"
                  class="cancel"
                  style="margin-left: 0.5rem"
                  @click="take(item)"
                >
                  提货
                </div>
                <div
                  class="pay"
                  style="margin-right: 0.2rem"
                  v-show="
                    item.guoqi !== 1 && item.status == 4 && jfdhFun == '1'
                  "
                  @click="exchangePoints(item.id)"
                >
                  兑换积分
                </div>
                <div
                  class="pay"
                  style="margin-right: 0.2rem"
                  v-show="item.guoqi !== 1 && item.status == 4"
                  @click="handleReSell(item)"
                >
                  转拍
                </div>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
        </div>
        <van-empty
          v-if="!orderAll.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>
      <van-tab title="待付款" name="wait">
        <div class="item-list payment">
          <van-checkbox-group ref="checkboxGroup" v-model="result">
            <van-swipe-cell v-for="item of toBePaid" :key="item.id">
              <div>
                <!-- <p>
                  <van-checkbox :name="item.id" checked-color="#FDB428" />
                </p> -->
                <div>
                  <div class="item" to="/">
                    <p style="font-size: 0.32rem; padding-bottom: 8px">
                      购买时间：{{ item.createTime }}
                    </p>
                    <div class="item-header" @click="navTO(item)">
                      <img :src="item.goodsLogo" alt />
                      <div class="item-info">
                        <h2 class="item-title">{{ item.goodsName }}</h2>
                        <div class="item-center">
                          <span class="price">¥{{ item.price }}</span>
                          <i class="num">X{{ item.num }}</i>
                        </div>
                      </div>
                    </div>
                    <div class="item-bottom">
                      合计需支付：
                      <span>¥{{ item.sumPrice }}</span>
                    </div>
                    <div class="item-button">
                      <router-link
                        :to="{ path: '/order', query: { id: item.id } }"
                        class="pay"
                        >付款</router-link
                      >
                      <div class="cancel" @click="handleCancelOrder(item.id)">
                        取消
                      </div>
                    </div>
                    <div style="clear: both"></div>
                  </div>
                </div>
              </div>
            </van-swipe-cell>
          </van-checkbox-group>
        </div>
        <van-empty
          v-if="!toBePaid.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>
      <van-tab title="已付款" name="already">
        <div class="item-list">
          <div v-for="item of Paid" :key="item.id" class="item">
            <div>
              <p style="font-size: 0.32rem; padding-bottom: 8px">
                购买时间：{{ item.createTime }}
              </p>
              <div class="item-header" @click="navTO(item)">
                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>

                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>
              <div style="float: left; font-size: 0.32rem">
                <span data-v-2c8a74d2>卖家电话：{{ item.userPhone }}</span>
              </div>
              <div class="item-bottom">
                已付款
                <span>¥{{ item.sumPrice }}</span>
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
        <van-empty
          v-if="!Paid.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>

      <van-tab title="已完成/待转售" name="resale">
        <div class="item-list resell">
          <div v-for="item of Completed" :key="item.id" class="item">
            <div>
              <p style="font-size: 0.32rem; padding-bottom: 8px">
                购买时间：{{ item.createTime }}
              </p>
              <div class="item-header" @click="navTO(item)">
                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>

                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>
              <div class="item-bottom">
                已完成/待转售
                <span>¥{{ item.sumPrice }}</span>
              </div>
              <div class="item-button">
                <div
                  class="pay"
                  style="margin-right: 0.2rem"
                  v-show="
                    (item.max_yn == 1 || item.guoqi == 1) && jfdhFun !== '1'
                  "
                  @click="chang(item)"
                >
                  置换
                </div>
                <div
                  class="pay"
                  style="margin-right: 0.2rem"
                  v-show="item.guoqi !== 1 && jfdhFun !== '1'"
                  @click="handleReSell(item)"
                >
                  转拍
                </div>
                <div
                  class="pay"
                  style="margin-right: 0.2rem"
                  @click="take(item)"
                >
                  提货
                </div>
                <div
                  class="pay"
                  style="margin-right: 0.2rem"
                  v-show="
                    item.guoqi !== 1 && item.status == 4 && jfdhFun == '1'
                  "
                  @click="exchangePoints(item.id)"
                >
                  兑换积分
                </div>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
          <van-empty
            v-if="!Completed.length"
            image=".././static/icon_empty.png"
            description="暂无订单"
          />
        </div>
      </van-tab>
      <van-tab title="已取消" name="cancel">
        <div class="item-list">
          <div v-for="item of quxiaoList" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item)">
                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>

                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>
              <div class="item-bottom">
                已取消
                <span>¥{{ item.sumPrice }}</span>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
          <van-empty
            v-if="!quxiaoList.length"
            image=".././static/icon_empty.png"
            description="暂无订单"
          />
        </div>
      </van-tab>

      <van-tab title="已置换" name="replaced">
        <div class="item-list">
          <div v-for="item of Cancelled" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item)">
                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>

                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>
              <div class="item-bottom">
                已取消
                <span>¥{{ item.sumPrice }}</span>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
          <van-empty
            v-if="!Cancelled.length"
            image=".././static/icon_empty.png"
            description="暂无订单"
          />
        </div>
      </van-tab>
      <van-tab title="已兑换" name="converted">
        <div class="item-list">
          <div v-for="item of duihuan" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item)">
                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>

                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>
              <div class="item-bottom">
                已取消
                <span>¥{{ item.sumPrice }}</span>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
          <van-empty
            v-if="!duihuan.length"
            image=".././static/icon_empty.png"
            description="暂无订单"
          />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";

export default {
  name: "PayTab",
  props: {
    orderList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      orderAll: [],
      toBePaid: [],
      Paid: [],
      Completed: [],
      Cancelled: [],
      result: [],
      quxiaoList: [],
      active: this.$route.query.active ? this.$route.query.active : 0,
      checkedAll: false,
      sysColor: localStorage.getItem("styleColor"),
      duihuan: [],
      jfdhFun: "",
    };
  },
  mounted() {
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.getjifen();
    this.getOrderList();
  },
  created() {
    this.getOrderList();
  },
  // watch: {
  //   orderList() {
  //     this.orderAll = this.orderList;
  //     this.toBePaid = this.orderList.filter((i) => i.status === 1);
  //     this.Paid = this.orderList.filter((i) => i.status === 2);
  //     this.quxiaoList = this.orderList.filter((i) => i.status === 3);
  //     this.Cancelled = this.orderList.filter((i) => i.status === 7);
  //     this.Completed = this.orderList.filter((i) => i.status === 4);
  //     this.duihuan = this.orderList.filter((i) => i.status === 9);
  //   },
  // },
  methods: {
    exchangePoints(id) {
      Dialog.confirm({
        title: "积分兑换",
        message: "确认兑换成积分吗?",
      }).then(() => {
        this.$api.convert({ orderid: id }).then((res) => {
          Toast(res.msg);
          setTimeout(() => {
            this.getOrderList();
            // window.location.reload();
            that.$router.push({ path: "/pay" });
          }, 500);
        });
      });
    },
    getjifen() {
      this.$api.jfdh().then((res) => {
        // data == 1 开启了积分兑换模式
        this.jfdhFun = res.data;
      });
    },
    orderChange() {
      // this.orderAll = this.orderList;
      this.toBePaid = this.orderAll.filter((i) => i.status === 1);
      this.Paid = this.orderAll.filter((i) => i.status === 2);
      this.quxiaoList = this.orderAll.filter((i) => i.status === 3);
      this.Cancelled = this.orderAll.filter((i) => i.status === 7);
      this.Completed = this.orderAll.filter((i) => i.status === 4);
      this.duihuan = this.orderAll.filter((i) => i.status === 9);
    },
    navTO(item) {
      // this.$router.push('/FileDetail')
      this.$router.push({ name: "OrderDetails", params: { id: item.id } });
    },
    // 取消订单
    handleCancelOrder(id) {
      console.log(id);
      Dialog.confirm({
        title: "取消订单",
        message: "确定取消订单吗?",
      }).then(() => {
        this.$api.cancelOrder({ ids: id }).then((res) => {
          Toast(res.msg);
          this.getOrderList();
          // window.location.reload();
          that.$router.push({ path: "/pay" });
        });
      });
    },
    // 处理付款
    handleGoOrder() {
      if (this.result.length <= 0) {
        Toast("您还没有全选");
        return;
      }
      console.log(this.result.join(","));
      this.getOrderList();
      this.$router.push({
        path: "/order",
        query: { id: this.result.join(",") },
      });
    },
    // 处理转售
    handleReSell(item) {
      this.navTO(item);
    },
    // 选择全部
    checkAll() {
      if (this.toBePaid.length === this.result.length) {
        this.$refs.checkboxGroup.toggleAll(false);
        Toast("已取消全选");
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
        Toast("已全选");
      }
    },
    // 返回类型
    printStatusText(status) {
      let type = "";
      switch (status) {
        case 1:
          type = "待付款";
          break;
        case 2:
          type = "已付款";
          break;
        case 3:
          type = "已取消";
          break;
        case 4:
          type = "已完成/待转售";
          break;
        case 5:
          type = "已转售";
          break;
        case 6:
          type = "到期流拍";
          break;
        case 7:
          type = "已置换";
          break;
        case 8:
          type = "提货";
          break;
      }
      return type;
    },
    getOrderList() {
      this.$api.orderList().then((res) => {
        // this.orderAll = this.orderList;
        this.orderAll = res.data.data;
        this.orderChange();
      });
    },
    // 提货
    take(item) {
      Dialog.confirm({
        title: "提货",
        message: "将根据默认地发货，确定提货么?",
      }).then(() => {
        this.$api.tihuo({ id: item.id, addressId: 1 }).then((res) => {
          Toast(res.msg);
          console.log(res);
          this.getOrderList();

          setTimeout(() => {
            this.$router.push({
              path: "/dingdan",
            });
          }, 500);
        });
      });
    },
    // 置换银币
    chang(item) {
      Dialog.confirm({
        title: "置换",
        message: "确定要置换成银币吗?",
      }).then(() => {
        this.$api.mairuzhihuan({ orderid: item.id }).then((res) => {
          Toast(res.msg);
          console.log(res);
          setTimeout(() => {
            this.getOrderList();
          }, 500);
        });
      });
    },
    onNavBarClick() {
      // this.Getliupai()
      this.getOrderList();
    },
  },
};
</script>

<style lang="less">
.pay-tab {
  .van-tabs__nav {
    background-color: #f5f5f5;

    .van-tab {
      .van-tab__text {
        font-size: 0.32rem /* 24/75 */;
      }
    }
  }

  .payment {
    .van-swipe-cell__left {
      display: flex;
      padding-left: 0.4rem /* 30/75 */;

      .van-checkbox {
      }
    }

    .check-all {
      .van-checkbox__label {
        margin-left: 0.4rem /* 30/75 */;
      }
    }
  }
}
.van-empty__image {
  width: 100% !important;
  height: 5.26667rem !important;
}
</style>

<style lang="less" scoped>
.pay-tab {
  .item-list {
    .item {
      box-sizing: border-box;
      padding: 0.52rem /* 39/75 */ 0.3867rem /* 29/75 */;
      margin: 0.4rem /* 30/75 */ auto 0.4rem /* 30/75 */;
      display: block;
      width: 9.2rem /* 690/75 */;
      // height: 4rem /* 227/75 */;
      background-color: #fff;
      box-shadow: 0px 0px 0.2133rem /* 16/75 */ 0px rgba(0, 0, 0, 0.15);
      border-radius: 0.2667rem /* 20/75 */;
      .item-header {
        padding-left: 2.0267rem /* 152/75 */;
        position: relative;
        img {
          border-radius: 0.08rem /* 6/75 */;
          position: absolute;
          left: 0;
          top: 0;
          width: 1.6rem /* 120/75 */;
          height: 1.6rem /* 120/75 */;
        }

        .item-info {
          height: 1.8133rem /* 136/75 */;

          .item-title {
            padding-top: 0.12rem /* 9/75 */;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.3733rem /* 28/75 */;
            color: #333;
          }

          .item-center {
            margin-top: 0.4267rem /* 32/75 */;
            overflow: hidden;

            .price {
              color: #333;
              font-size: 0.32rem /* 24/75 */;
              float: left;
            }

            .num {
              color: #999;
              font-size: 0.32rem /* 24/75 */;
              float: right;
            }
          }
        }
      }

      .item-bottom {
        text-align: right;
        font-size: 0.32rem /* 24/75 */;
        color: #333;

        span {
          color: #ed3017;
        }
      }

      .item-button {
        margin-top: 0.3333rem /* 25/75 */;

        .cancel {
          border-radius: 0.3333rem /* 25/75 */;
          width: 1.8267rem /* 137/75 */;
          height: 0.6667rem /* 50/75 */;
          line-height: 0.6667rem /* 50/75 */;
          border: 1px solid #ddd;
          float: right;
          text-align: center;
          font-size: 0.3733rem /* 28/75 */;
          color: #111;

          margin-right: 0.4rem /* 30/75 */;
        }

        .pay {
          border-radius: 0.3333rem /* 25/75 */;
          width: 1.8267rem /* 137/75 */;
          height: 0.6667rem /* 50/75 */;
          line-height: 0.6667rem /* 50/75 */;
          border: 1px solid #fdb428;
          text-align: center;
          float: right;
          font-size: 0.3733rem /* 28/75 */;
          color: #fdb428;
        }
      }
    }
  }

  .item-list.payment,
  .item-list.resell {
    .item {
      // height: 4.5rem /* 306/75 */;

      .item-button {
        margin-top: 0.3333rem /* 25/75 */;

        .cancel {
          border-radius: 0.3333rem /* 25/75 */;
          width: 1.8267rem /* 137/75 */;
          height: 0.6667rem /* 50/75 */;
          line-height: 0.6667rem /* 50/75 */;
          border: 1px solid #ddd;
          float: right;
          text-align: center;
          font-size: 0.3733rem /* 28/75 */;
          color: #111;

          margin-right: 0.4rem /* 30/75 */;
        }

        .pay {
          border-radius: 0.3333rem /* 25/75 */;
          width: 1.8267rem /* 137/75 */;
          height: 0.6667rem /* 50/75 */;
          line-height: 0.6667rem /* 50/75 */;
          border: 1px solid #fdb428;
          text-align: center;
          float: right;
          font-size: 0.3733rem /* 28/75 */;
          color: #fdb428;
        }
      }
    }
  }

  .check-all {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.3333rem /* 100/75 */;
    background-color: #fff;
    display: flex;
    align-items: center;

    .checkbox-inner {
      padding-left: 0.4rem /* 30/75 */;
      flex: 1;
      font-size: 0.3733rem /* 28/75 */;
      color: #111;
    }

    .check-btn {
      flex: 2;

      .pay,
      .cancel {
        margin-right: 0.4rem /* 30/75 */;
        border-radius: 0.3333rem /* 25/75 */;
        float: right;
        width: 1.8667rem /* 140/75 */;
        height: 0.6667rem /* 50/75 */;
        text-align: center;
        line-height: 0.6667rem /* 50/75 */;
        font-size: 0.3733rem /* 28/75 */;
      }

      .pay {
        color: #fdb428;
        margin-right: 0.5rem;
        border: 1px solid #fdb428;
      }

      .cancel {
        color: #111;
        border: 1px solid #ddd;
      }
    }
  }
}
</style>
