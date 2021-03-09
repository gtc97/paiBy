<template>
  <div class="container">
    <common-header title="我的签约" bg="#f5f5f5"/>
    <SigningNothing />
  </div>
</template>

<script>
import SigningNothing from './components/SigningNothing'
export default {
  name: 'Signing',
  components: {
    SigningNothing
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  height: 100vh;
}
</style>
