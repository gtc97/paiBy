<template>
  <div class="balance" :style="'background:' + sysColor ">
    <h3 class="balance-title">账户余额（元）</h3>
    <p class="balance-content">
      ¥{{ money }}
    </p>
    <div style="float:right;margin-top: -1.2rem;font-size: 0.6rem;margin-right: 0.5rem;"><router-link to="/balanceType" style="color:#fff;"> 提现明细</router-link></div>
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
  },
  data() {
    return {
      sysColor: localStorage.getItem("styleColor"),
    };
  },
  created(){
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
  },

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
