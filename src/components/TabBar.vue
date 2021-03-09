<template>
  <van-tabbar :safe-area-inset-bottom="true" route class="tab-bar" active-color="#333" inactive-color="#bbb">
    <van-tabbar-item icon="../../static/gift_icon.png" to="/">
      <span>竞拍</span>
      <template #icon="props">
        <img :src="props.active ? '../../static/home_icon_active.png' : '../../static/home_icon.png' " >
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/rewards">
      <span>分享奖励</span>
      <template #icon="props">
        <img :src="props.active ? '../../static/gift_icon_active.png' : '../../static/gift_icon.png' " >
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/notice">
      <span>公告</span>
      <template #icon="props">
        <img :src="props.active ? '../../static/notice_icon_active.png' : '../../static/notice_icon.png' " >
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="../../static/my_icon.png" to="/my">
      <span>会员中心</span>
      <template #icon="props">
        <img :src="props.active ? '../../static/my_icon_active.png' : '../../static/my_icon.png' " >
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.tab-bar {
  border-top: 1px solid #ddd;
}
</style>
