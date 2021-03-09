<template>
  <van-nav-bar title="分享奖励"  @click-left="handleBack">
    <template #left>
      <van-icon name="arrow-left" size="0.4rem" color="#333" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'RewardsHeader',
  methods: {
    handleShowMask() {
      this.$emit('showMask', true)
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
