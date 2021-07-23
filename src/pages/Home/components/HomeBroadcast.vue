<template>
  <div class="broadcast">
    <van-icon class="broadcast-icon" name="bullhorn-o" size="0.5rem" />
    <van-swipe
      :autoplay="5000"
      :show-indicators="false"
      class="broadcast-content"
      vertical
    >
      <van-swipe-item>竞拍前需充值手续费，尊敬的用户请悉知。</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'HomeBroadcast'
}
</script>

<style lang="less">
.broadcast {
  .broadcast-content {
    .van-swipe-item {
      width: 8.133333rem /* 610/75 */;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

<style lang="less" scoped>
.broadcast {
  padding: 10px 0;
  overflow: hidden;
  height: .9333rem /* 70/75 */;
  line-height: .9333rem /* 70/75 */;
  .broadcast-content {
    display: inline-block;
    color: #666;
    font-size: 0.32rem /* 24/75 */;
    height: .9333rem /* 70/75 */;
  }
  .broadcast-icon {
    vertical-align: top;
    margin-top: .2667rem /* 20/75 */;
  }
}
</style>
