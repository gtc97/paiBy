<template>
  <div class="reward-extract">
    <div class="reward-extract-item">
      <i class="item-label">我的佣金</i>
      <b class="item-info" v-html="'¥' + drawMoney">0.00</b>
    </div>
    <div class="reward-extract-item">
      <i class="item-label">可提现佣金</i>
      <b class="item-info" v-html="'¥' + drawMoney">0.00</b>
    </div>
    <div class="reward-extract-item">
      <i class="item-label">当前提现进度：</i>
      <b class="item-info">无</b>
    </div>
    <router-link to="/withdrawalCommission" class="extract-btn" :style="'background:' + sysColor + ';'">
      申请提现
    </router-link>
  </div>
</template>

<script>
// import { Notify } from 'vant'
// import { Toast } from 'vant'
export default {
  name: 'RewardExtract',
  props: {
    drawMoney: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data(){
    return{
      sysColor:localStorage.getItem('styleColor')
    }
  }
  // methods: {
  // handleDraw() {
  //   if (this.drawMoney <= 0) {
  //     Notify({ type: 'warning', message: '提现佣金不足，无法提现' })
  //     return
  //   }
  //   this.$api.draw({ money: this.money }).then((res) => {
  //     Toast(res.msg)
  //   })
  // }
  // }
}
</script>

<style lang="less" scoped>
.reward-extract{
  box-sizing: border-box;
  padding: .4rem /* 30/75 */ .4rem /* 30/75 */ .8rem /* 60/75 */;
  margin: .7867rem /* 59/75 */ auto;
  border-radius: .2667rem /* 20/75 */;
  box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  width: 9.2rem /* 690/75 */;
  background-color: #fff;
  .reward-extract-item{
    height: 1.1467rem /* 86/75 */;
    line-height: 1.1467rem /* 86/75 */;
    border-bottom: 1px solid #ddd;
    font-size: .3733rem /* 28/75 */;
    color: #333;
    .item-label{
      float: left;
    }
    .item-info{
      float: right;
    }
  }
  .extract-btn{
    display: block;
    border-radius: .1333rem /* 10/75 */;
    margin-top: .8rem /* 60/75 */;
    font-size: .4267rem /* 32/75 */;
    color: #333;
    width: 8.4rem /* 630/75 */;
    height: .9333rem /* 70/75 */;
    line-height: .9333rem /* 70/75 */;
    background-color: #FDB428;
    text-align: center;
  }
}
</style>
