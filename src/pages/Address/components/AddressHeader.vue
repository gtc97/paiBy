<template>
  <van-nav-bar class="address-header" title="收货地址" left-arrow />
</template>

<script>
export default {
  name: 'AddressHeader'
}
</script>

<style lang="less" scoped>
.address-header {
  background-color: #f5f5f5;
  &::after {
    border: none;
  }
}
</style>
