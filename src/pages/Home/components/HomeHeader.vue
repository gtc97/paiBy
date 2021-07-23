<template>
    <!-- :style="{ background: styleColor }" -->
  <van-nav-bar
    :style="'background: ' + styleColor "
    class="header"
    title="恒鉴拍卖汇"
  >
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
  name: "HomeHeader",
  data() {
    return {
      styleColor: "#bd2f3b",
    };
  },
  created() {
    // this.styleColor = localStorage.getItem("styleColor") || '';
  },
};
</script>

<!--穿透设置顶部样式 -->
<style lang="less">
.header {
  .van-nav-bar__title {
    color: #fff;
    font-size: 0.48rem;
    // background-color: ;
  }
  .icon {
    img {
      width: 0.48rem /* 36/75 */;
      height: 0.48rem /* 36/75 */;
    }
  }
  .van-nav-bar {
    background-color: #eb4343 !important;
  }
}
</style>
