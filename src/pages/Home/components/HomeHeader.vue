<template>
  <van-nav-bar class="header" title="竞拍">
    <!-- <template #left>
      <van-icon class="icon" name="../../../../static/customer_service_icon.png" size="0.48rem" />
    </template>
    <template #right>
      <van-icon class="icon" name="../../../../static/search_icon.png" size="0.48rem" />
    </template> -->
  </van-nav-bar>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<!--穿透设置顶部样式 -->
<style lang="less">
.header {
  .van-nav-bar__title {
    color: #333;
    font-size: 0.48rem;
  }
  .icon {
    img {
      width: 0.48rem /* 36/75 */;
      height: 0.48rem /* 36/75 */;
    }
  }
}
</style>
