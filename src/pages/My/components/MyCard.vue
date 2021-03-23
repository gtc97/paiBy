<template>
  <div class="card">
    <!-- <van-grid :border="false" class="card-info">
      <van-grid-item to="/pay" class="buy_icon" icon="../../../../static/buy_icon.png" text="买单" />
      <van-grid-item
        to="/sellOrder"
        class="sell_bill_icon"
        icon="./../../../static/sell_bill_icon.png"
        text="卖单"
      />
      <van-grid-item class="quan_icon" icon="./../../../static/quan_icon.png" text="代金券" @click="handleQuanClick" />
      <van-grid-item
        to="/wallet"
        class="wallet_icon"
        icon="./../../../static/wallet_icon.png"
        text="钱包"
      />
    </van-grid> -->
    <div class="card" style="height:auto;">
      <div style="font-size: 0.4rem;">
        id:<span>{{ inviteCode }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant'
export default {
  name: 'MyCard',
  methods: {
    handleQuanClick() {
      Notify({ type: 'warning', message: '功能正在开发中,敬请期待' })
    }
  }
}
</script>

<style lang="less">
.card {
  .card-info {
    border-radius: 0.33333rem !important;
    box-shadow: 0 0 0.22667rem 0 rgba(0, 0, 0, 0.15);
    .van-grid-item {
      height: 100%;
      .van-grid-item__content {
        padding: 0;
        .van-icon {
          // margin-top: 0.1333rem /* 10/75 */;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
    .buy_icon {
      img {
        vertical-align: top;
        width: 0.4133rem /* 31/75 */;
      }
    }
    .sell_bill_icon {
      img {
        vertical-align: top;
        width: .4rem /* 30/75 */;
      }
    }
    .quan_icon {
      img {
        vertical-align: top;
        width: .5333rem /* 40/75 */;
      }
    }
    .wallet_icon {
      img {
        vertical-align: top;
        width: .4667rem /* 35/75 */;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.card {
  background-color: #fff;
  // padding: 0.66rem /* 50/75 */ 0.4rem /* 30/75 */ 0.2667rem /* 20/75 */;
  padding: 0.4rem /* 50/75 */ 0.4rem /* 30/75 */ 0.2667rem /* 20/75 */;
  height: 1.8rem /* 120/75 */;
  .card-info {
    //     border-radius: 0.33333rem !important;
    // box-shadow: 0 0 0.22667rem 0 rgba(0, 0, 0, 0.15);
    overflow: hidden;
    box-shadow: 0px 0px 0.22667rem 0px rgba(0, 0, 0, 0.15);
    border-radius: 0.33333rem;
    height: 100%;
    .van-grid-item {
      height: 100%;
    }
  }
}
</style>
