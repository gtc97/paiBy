<template>
  <div class="nothing">
    <img class="nothing-img" src="../../../../static/signing_nothing.png" alt >
    <p class="nothing-text">该功能尚未开放!</p>
  </div>
</template>

<script>
export default {
  name: 'SigningNothing'
}
</script>

<style lang="less" scoped>
.nothing {
  background-color: #f5f5f5;
  padding-top: 4rem /* 300/75 */;
  text-align: center;
  .nothing-img {
    width: 7.04rem /* 528/75 */;
    height: 5.6267rem /* 422/75 */;
  }
  .nothing-text {
    margin-top: 0.4533rem /* 34/75 */;
    font-size: 0.48rem /* 36/75 */;
    color: #999;
  }
}
</style>
