<template>
  <div class="banner">
    <van-swipe :autoplay="3000" class="my-swipe" indicator-color="#FDB428">
      <van-swipe-item v-for = "(item,index) in bannerList" :key="index">
        <img :src="item.url" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'HomeBanner',
  props: {
    bannerList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<!--穿透设置样式-->
<style lang="less">
.banner {
  .my-swipe {
    .van-swipe-item {
      width: 100%;
      height: 4rem;
      color: #fff;
      // background-color: #39a9ed;
      img{
        width: 100%;
        height: 4rem;
      }
    }
    .van-swipe__indicator {
      // border-radius: 0.04rem /* 3/75 */;
      width: 0.16rem /* 12/75 */;
      opacity: 1;
      background-color: #fff;
      &.van-swipe__indicator--active {
        width: 0.346667rem /* 26/75 */;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.banner {
  box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  // border-radius: 0.266667rem /* 20/75 */;
  // margin: 0.2667rem /* 20/75 */ auto;
  // width: 9.2rem /* 690/75 */;
  width: 100% /* 690/75 */;
  height: 4rem /* 300/75 */;
}
</style>
