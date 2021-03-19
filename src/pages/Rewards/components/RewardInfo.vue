<template>
  <div class="reward-info">
    <van-row class="reward-info-title tc">
      <van-col span="8">
        <van-icon class="icon" name="../../../../static/friends_icon.png" />
        <router-link to="/invitation">邀请好友</router-link>
      </van-col>
      <van-col span="8">
        <van-icon
          class="icon"
          name="../../../../static/share_icon.png"
        />分享订单
      </van-col>
      <van-col span="8">
        <van-icon
          class="icon"
          name="../../../../static/money_icon.png"
        /><router-link to="/commissionList">累计佣金</router-link>
      </van-col>
    </van-row>
    <van-row class="reward-info-money tc">
      <van-col span="6" v-html="rewardInfo.friendMoney" />
      <van-col span="6" v-html="rewardInfo.orderMoney" />
      <van-col span="6" v-html="rewardInfo.totalMoney" />
      <van-col span="6" v-html="rewardInfo.totalMoney" />
    </van-row>
    <van-row class="reward-info-link tc">
      <van-col span="6">
        <router-link to="/friends">好友佣金明细></router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/rakeback">订单佣金明细></router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/rakeback">团队奖明细></router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/rakeback">团队业绩明细></router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "RewardInfo",
  props: {
    rewardInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.reward-info {
  margin-top: 1.1333rem /* 85/75 */;
  .reward-info-title {
    .van-col {
      font-size: 0.3733rem /* 28/75 */;
      color: #333;
      .icon {
        vertical-align: top;
        margin-right: 0.1333rem /* 10/75 */;
        img {
          width: 0.4933rem /* 37/75 */;
          height: auto;
        }
      }
    }
  }
  .reward-info-money {
    margin-top: 0.88rem /* 66/75 */;
    font-size: 0.6667rem /* 50/75 */;
    color: #333;
  }
  .reward-info-link {
    margin-top: 0.4rem /* 30/75 */;
    // .van-col{
    //   height: .5333rem /* 40/75 */
    // }
    a {
      display: block;
      font-size: 0.32rem /* 24/75 */;
      color: #fdb428;
    }
  }
}
</style>
