<template>
  <div class="order-header">
    <van-nav-bar class="order-header-inner" title="我的钱包" @click-left="handleBack">
      <template #left>
        <van-icon name="arrow-left" size="0.4rem" color="#333" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'OrderHedaer',
  methods: {
    // 返回上一层
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.order-header {
  height: 3.2rem /* 240/75 */;
  background-color: #fdb428;
  .order-header-inner {
    background-color: #fdb428;
    &::after {
      border: none;
    }
  }
}
</style>
