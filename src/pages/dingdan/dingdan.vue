<template>
  <div class="container">
    <common-header title="实物订单" bg="#f5f5f5" />
     <van-tabs
      v-model="active"
      :ellipsis="false"
      :color="sysColor"
      :title-active-color="sysColor"
      title-inactive-color="#333"
      animated
    >
      <!-- <van-tab title="全部" name="all">
        <div class="item-list">
          <div v-for="item of toBePaid" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item)">
                <p data-v-2c8a74d2 v-if="item.status == 2" style="font-size: 0.32rem; float: right">
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
                <div v-if="item.status == 2" class="pay" @click="handleSellOrder(item.id)">
                  确认收款
                </div>
                <div v-if="item.status == 4" class="pay">已完成</div>
                <div v-if="item.status == 5" class="pay">已完成</div>
                <div v-if="item.status == 1" class="pay">待付款</div>
                <div v-if="item.status == 3" class="pay">已取消</div>
              </div>
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty v-if="!toBePaid.length" image=".././static/icon_empty.png" description="暂无订单" />
      </van-tab> -->

      <van-tab title="待发货" name="all">
        <div class="item-list">
          <div v-for="item of toBePaid" :key="item.id" class="item">
            <div>
              <div class="item-header" @click="navTO(item)">
                <p data-v-2c8a74d2 v-if="item.status == 2" style="font-size: 0.32rem; float: right">
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

              <!-- <div class="item-button">
                <div v-if="item.status == 2" class="pay" @click="handleSellOrder(item.id)">
                  确认收款
                </div>
                <div v-if="item.status == 4" class="pay">已完成</div>
                <div v-if="item.status == 5" class="pay">已完成</div>
                <div v-if="item.status == 1" class="pay">待付款</div>
                <div v-if="item.status == 3" class="pay">已取消</div>
              </div> -->
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty v-if="!toBePaid.length" image=".././static/icon_empty.png" description="暂无订单" />
      </van-tab>
      <van-tab title="已发货" name="all">
        <div class="item-list">
          <div v-for="item of toBePaid2" :key="item.id" class="item">
            <div >
              <div class="item-header" @click="navTO(item)">
                <p data-v-2c8a74d2 v-if="item.status == 2" style="font-size: 0.32rem; float: right">
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
                <!-- <div v-if="item.status == 2" class="pay" @click="handleSellOrder(item.id)">
                  确认收款
                </div>
                <div v-if="item.status == 4" class="pay">已完成</div>
                <div v-if="item.status == 5" class="pay">已完成</div>
                <div v-if="item.status == 1" class="pay">待付款</div> -->
                <!-- <div v-if="item.status == 3" class="pay" @click="zhihuan(item)">置换</div> -->
              </div>
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty v-if="!toBePaid2.length" image=".././static/icon_empty.png" description="暂无订单" />
      </van-tab>
      <van-tab title="已完成" name="all">
        <div class="item-list">
          <div v-for="item of toBePaid3" :key="item.id" class="item">
            <div >
              <div class="item-header" @click="navTO(item)">
                <p data-v-2c8a74d2 v-if="item.status == 2" style="font-size: 0.32rem; float: right">
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

              <!-- <div class="item-button">
                <div v-if="item.status == 2" class="pay" @click="handleSellOrder(item.id)">
                  确认收款
                </div>
                <div v-if="item.status == 4" class="pay">已完成</div>
                <div v-if="item.status == 5" class="pay">已完成</div>
                <div v-if="item.status == 1" class="pay">待付款</div> 
                <div v-if="item.status == 3" class="pay" @click="zhihuan(item)">置换</div>
              </div> -->
              <div style=" font-size: 0.32rem;margin-bottom:0.2rem；float:left">
                <span data-v-2c8a74d2>创建时间：{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
        <van-empty v-if="!toBePaid3.length" image=".././static/icon_empty.png" description="暂无订单" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "SellOrder",
  data() {
    return {
      toBePaid: [],
      toBePaid2: [],
      toBePaid3: [],
      sysColor: localStorage.getItem("styleColor"),
      active: this.$route.query.active ? this.$route.query.active : 0,
      orderAll: [],
      pages:1,
    };
  },
  mounted() {
    this.getOrderList();
    this.getOrderList2();
    this.getOrderList3();
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
  },

  watch: {
    orderList() {
      // this.toBePaid = this.toBePaid;
      this.toBePaid = this.toBePaid.filter((i) => i.status === 1);
      this.Paid = this.toBePaid.filter((i) => i.status === 2);
      this.Cancelled = this.toBePaid.filter((i) => i.status === 3);
      this.Completed = this.toBePaid.filter((i) => i.status === 4);
    },
  },
  methods: {
    zhihuan(item) {
      console.log(item)
    },
    navTO(item) {
      console.log(item)
      // this.$router.push('/FileDetail')
      // this.$router.push({ name: "SellOrderDetails", params: { id: item.id } });
    },
    // 处理卖出
    handleSellOrder(id) {
      this.$api.completeOrder({ id }).then((res) => {
        Toast(res.msg);
        if (res.status === 1) {
          window.location.reload();
        }
      });
    },
    // 获取订单列表代发货
    getOrderList() {
      var data = { 'fhstatus': 1,page:this.pages , status:8}
      this.$api.orderTihuo(data).then((res) => {
        if(res.data.current_page == 1){
          this.toBePaid = res.data.data
        }else{
          this.toBePaid.concat(res.data.data);
        }
        console.log(this.toBePaid)
      });
    },
    // 获取订单列表已发货
    getOrderList2() {
      var data = { 'fhstatus': 2,page:this.pages, status:8}
      this.$api.orderTihuo(data).then((res) => {
        
        if(res.data.current_page == 1){
          this.toBePaid2 = res.data.data
        }else{
          this.toBePaid2.concat(res.data.data);
        }
        // this.toBePaid2 = res.data.data;
        // this.toBePaid2.concat(res.data.data);
      });
    },
    // 获取订单列表已完成
    getOrderList3() {
      var data = { 'fhstatus': 3,page:this.pages, status:8}
      this.$api.orderTihuo(data).then((res) => {
        if(res.data.current_page == 1){
          this.toBePaid3 = res.data.data
        }else{
          this.toBePaid3.concat(res.data.data);
        }
        // this.toBePaid3.concat(res.data.data);
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
    height: 5.26667rem  !important;
}
</style>

