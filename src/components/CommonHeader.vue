<template>
  <van-nav-bar :title="title" :style="{backgroundColor: bg,color: color}" class="common-header" @click-left="handleBack">
    <template #left>
      <van-icon name="arrow-left" size="0.4rem" color="#333" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    bg: {
      type: String,
      default() {
        return '#fff'
      }
    },
    color: {
      type: String,
      default() {
        return '#000'
      }
    },
  },
  methods: {
    // 返回上一层
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.common-header {
  &::after {
    border: none;
  }
}
</style>
