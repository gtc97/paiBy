<template>
  <div class="container">
    <RegisterHeader/>
    <RegisterInner/>
  </div>
</template>

<script>
import RegisterHeader from './components/RegisterHeader'
import RegisterInner from './components/RegisterInner'
export default {
  name: 'Register',
  components: {
    RegisterHeader,
    RegisterInner
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0 .4rem /* 30/75 */;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
