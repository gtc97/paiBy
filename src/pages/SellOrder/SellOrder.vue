<template>
  <div class="container">
    <common-header title="我的卖单" bg="#f5f5f5" />
    <van-tabs
      v-model="active"
      :ellipsis="false"
      :color="sysColor"
      :title-active-color="sysColor"
      title-inactive-color="#333"
      animated
      @change="onNavBarClick"
    >
    <van-tab title="待确认收款" name="querenshoukuan">
        <div class="item-list">
          <div v-for="item of Cancelled" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item,6)">
                <p
                  data-v-2c8a74d2
                  v-if="item.userPhone"
                  style="font-size: 0.32rem; float: right"
                >
                  买方电话：{{ item.userPhone }}
                </p>

                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>
                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <!-- <i class="num">X{{ item.goodsNum }}</i> -->
                  </div>
                </div>
              </div>

              <div class="item-bottom" v-if="item.sumPrice">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>
              <div class="item-button">
                <div class="pay" @click="handleSellOrder(item.id)">
                  确认收款
                </div>
              </div>
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty
          v-if="!Cancelled.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>
      <van-tab title="待被买" name="daibeimai">
        <div class="item-list">
          <div v-for="item of daibeimaiList" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navGetTO(item,1)">
                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>
                  <div class="item-center">
                    <span class="price">¥{{ item.goodsPrice }}</span>
                  </div>
                </div>
              </div>
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.onlineDate }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty
          v-if="!daibeimaiList.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>
      <van-tab title="已流拍" name="yiliupai">
        <div class="item-list">
          <div v-for="item of liupaiList" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navGetTO(item, 8)">
                <p
                  data-v-2c8a74d2
                  v-if="item.status == 2"
                  style="font-size: 0.32rem; float: right"
                >
                  买方电话：{{ item.userPhone }}
                </p>

                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>
                  <div class="item-center">
                    <span class="price">¥{{ item.goodsPrice }}</span>
                    <i class="num">X{{ item.goodsNum }}</i>
                  </div>
                </div>
              </div>

              <div class="item-bottom" v-if="item.status == 2">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-bottom" v-if="item.status == 5">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-bottom" v-if="item.status == 4">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-button">
                <div class="pay" v-show="jfdhFun !== '1'" @click="zhihuan(item)">置换</div>
                <div class="pay" @click="tihuo(item)">提货</div>
                <div class="pay" v-show="jfdhFun == '1'" @click="exchangePoints(item)">积分兑换</div>
              </div>
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty
          v-if="!liupaiList.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>
      <van-tab title="已锁单" name="sudan">
        <div class="item-list">
          <div v-for="item of suodanList" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item)">
                <p
                  data-v-2c8a74d2
                  v-if="item.status == 2"
                  style="font-size: 0.32rem; float: right"
                >
                  买方电话：{{ item.userPhone }}
                </p>

                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>
                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>

              <div class="item-bottom" v-if="item.status == 2">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-bottom" v-if="item.status == 5">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-bottom" v-if="item.status == 4">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-button">
                <!-- <div class="pay" @click="zhihuan(item)">置换</div>
                <div class="pay" @click="duihuan(item)">兑换积分</div>
                <div class="pay" @click="tihuo(item)">提货</div> -->
              </div>
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty
          v-if="!suodanList.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>
      <van-tab title="已完成" name="yiwancheng">
        <div class="item-list">
          <div v-for="item of Completed" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item)">
                <p
                  data-v-2c8a74d2
                  v-if="item.status == 2"
                  style="font-size: 0.32rem; float: right"
                >
                  买方电话：{{ item.userPhone }}
                </p>

                <img :src="item.goodsLogo" alt />
                <div class="item-info">
                  <h2 class="item-title">{{ item.goodsName }}</h2>
                  <div class="item-center">
                    <span class="price">¥{{ item.price }}</span>
                    <i class="num">X{{ item.num }}</i>
                  </div>
                </div>
              </div>

              <div class="item-bottom" v-if="item.status == 2">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-bottom" v-if="item.status == 5">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>

              <div class="item-bottom" v-if="item.status == 4">
                卖出获得:
                <span>¥{{ item.sumPrice }}</span>
              </div>
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>完成时间：{{ item.endTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty
          v-if="!Completed.length"
          image=".././static/icon_empty.png"
          description="暂无订单"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog,Toast } from "vant";
export default {
  name: "SellOrder",
  data() {
    return {
      toBePaid: [],
      toBePaid1: [],
      Paid: [],
      Cancelled: [],
      Completed: [],
      sysColor: localStorage.getItem("styleColor"),
      active: this.$route.query.active ? this.$route.query.active : 0,
      orderAll: [],
      exchanged: [],
      liupaiList: [],
      suodanList: [],
      daibeimaiList: [],
    };
  },
  mounted() {
    this.getOrderList();
    this.Getliupai();
    this.daibeima();
    this.getyisuodan();
    this.getshoukuan();
    this.getyiwancheng();
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.getjifen();
  },

  watch: {},
  methods: {
    exchangePoints(item) {
      Dialog.confirm({
        title: "积分兑换",
        message: "确认兑换成积分吗?",
      }).then(() => {
        this.$api.convert({ orderid: item.id }).then((res) => {
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
    getshoukuan() {
      this.$api.shoukuan().then((res) => {
        // Toast(res.msg);
        if (res.status === 1) {
          this.Cancelled = res.data;
          // this.getOrderList();
          // window.location.reload();
        }
      });
    },
    getyiwancheng() {
      this.$api.yiwancheng().then((res) => {
        if (res.status === 1) {
          this.Completed = res.data;
        }
      });
    },
    zhihuan(item) {
      Dialog.confirm({
        title: "置换",
        message: "确定置换成银币么?",
      }).then(() => {
        this.$api.maichuzhihuan({ goodid: item.id }).then((res) => {
          if (res.status === 1) {
            Toast(res.msg);
            this.getOrderList();
            setTimeout(() => {            
              this.$router.push({
                path: "/SellOrder",
              });
            }, 500);
            // window.location.reload();
          }
        });
      });
    },
    duihuan(item) {
      this.$api.convert({ jifen: item.id }).then((res) => {
        Toast(res.msg);
        if (res.status === 1) {
          this.getOrderList();
          window.location.reload();
        }
      });
    },
    navTO(item) {
      this.$router.push({ name: "SellOrderDetails", params: { id: item.id } });
    },
    navGetTO(item, num) {
      this.$router.push({
        name: "SellGoodsDetails",
        params: { id: item.id, status: num },
      });
    },
    daibeima() {
      this.$api.daibeimai().then((res) => {
        if (res.status == 1) {
          // Toast(res.msg);
          this.daibeimaiList = res.data;
          // window.location.reload();
        }
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
            this.getOrderList();
            Toast(res.msg);
            // window.location.reload();
            this.active = 'yiwancheng'
            // this.$router.push({
            //   path: "/SellOrder?active=yiwancheng",
            // });
          }
        });
      });
    },
    // 获取订单列表
    getOrderList() {
      this.$api.sellOrderList().then((res) => {
        this.toBePaid = res.data.data;
        this.orderList();
      });
    },
    orderList() {
      this.orderAll = this.toBePaid;
      this.toBePaid1 = this.toBePaid.filter((i) => i.status === 1);
      this.Paid = this.toBePaid.filter((i) => i.status === 2);
      // this.Cancelled = this.toBePaid.filter((i) => i.status === 3);
      // this.Completed = this.toBePaid.filter((i) => i.status === 4);
      this.exchanged = this.toBePaid.filter((i) => i.status === 5);
    },
    Getliupai() {
      this.$api.liupai().then((res) => {
        this.liupaiList = res.data;
        // this.getOrderList();
      });
    },
    getyisuodan() {
      this.$api.yisuodan().then((res) => {
        console.log(res.data);
        this.suodanList = res.data.data;
        // this.getOrderList();
      });
    },
    onNavBarClick() {
      this.getOrderList();
      this.Getliupai();
      this.daibeima();
      this.getyisuodan();
      this.getshoukuan();
      this.getyiwancheng();
    },
    tihuo(item) {
      Dialog.confirm({
        title: "提货",
        message: "将根据默认地发货，确定提货么?",
      }).then(() => {
        this.$api.tihuo({ id: item.id, addressId: 1 }).then((res) => {
          Toast(res.msg);
          console.log(res);
          this.getOrderList();
          this.$router.push({
            path: "/dingdan",
          });
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  .item-list {
    .item {
      box-sizing: border-box;
      padding: 0.52rem /* 39/75 */ 0.3867rem /* 29/75 */ 0;
      margin: 0.4rem /* 30/75 */ auto 0.4rem /* 30/75 */;
      display: block;
      width: 9.2rem /* 690/75 */;
      height: 4.08rem /* 306/75 */;
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
          margin-left: 10px;
          float: right;
          font-size: 0.3733rem /* 28/75 */;
          color: #fdb428;
        }
      }
    }
  }
}
.van-empty__image {
  width: 100% !important;
  height: 5.26667rem !important;
}
</style>

