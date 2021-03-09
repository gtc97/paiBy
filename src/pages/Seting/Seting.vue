<template>
  <div class="container">
    <common-header title="收款设置" bg="#f5f5f5"/>
    <SetingTab/>
    <SetingTips/>
  </div>
</template>

<script>
import SetingTab from './Components/SetingTab'
import SetingTips from './Components/SetingTips'
export default {
  name: 'Seting',
  components: {
    SetingTab,
    SetingTips
  }
}
</script>

<style lang="less" scoped>
.container{
  min-height: 100vh;
}
</style>
