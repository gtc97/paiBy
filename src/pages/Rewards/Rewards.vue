<template>
  <div class="container">
    <RewardsHeader @showMask="handleShowMask"/>
    <RewardInfo :reward-info="rewardInfo"/>
    <RewardExtract :draw-money="rewardInfo.drawMoney"/>
    <RewardsMask :show="show" @closeMask="handleCloseMask"/>
  </div>
</template>

<script>
import RewardsHeader from './components/RewardsHeader'
import RewardInfo from './components/RewardInfo'
import RewardExtract from './components/RewardExtract'
import RewardsMask from './components/RewardsMask'
export default {
  name: 'Rewards',
  components: {
    RewardsHeader,
    RewardInfo,
    RewardExtract,
    RewardsMask
  },
  data() {
    return {
      show: false,
      rewardInfo: {}
    }
  },
  mounted() {
    this.getShareReward()
  },
  methods: {
    handleShowMask() {
      this.show = true
    },
    handleCloseMask() {
      this.show = false
    },
    // 获取分享奖励内容
    getShareReward() {
      this.$api.shareReward().then((res) => {
        this.rewardInfo = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    padding: 0 .4rem /* 30/75 */;
  }
</style>
