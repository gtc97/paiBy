<template>
  <div class="layout">
    <router-view />
    <TabBar />
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'Layout',
  components: {
    TabBar
  }
}
</script>

<style lang="less" scoped>
.layout {
  padding-bottom: 1.33333rem;
}
</style>
