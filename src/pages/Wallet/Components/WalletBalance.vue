<template>
  <div class="balance">
    <h3 class="balance-title">账户余额（元）</h3>
    <p class="balance-content">
      ¥{{ money }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'WalletBalance',
  props: {
    money: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>

<style lang="less">
.balance {
  box-sizing: border-box;
  padding: .7867rem /* 59/75 */ 0 0 .8533rem /* 64/75 */;
  margin: .3333rem /* 25/75 */ auto 0;
  width: 9.2rem /* 690/75 */;
  height: 3.0267rem /* 227/75 */;
  background: linear-gradient(
    45deg,
    rgba(253, 180, 40, 1) 0%,
    rgba(250, 192, 81, 1) 100%
  );
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
  border-radius: .2667rem /* 20/75 */;
  color: #fff;
  .balance-title{
    height: .6667rem /* 50/75 */;
    font-size: .3733rem /* 28/75 */;
  }
  .balance-content {
    font-size: .6667rem /* 50/75 */;
  }
}
</style>
