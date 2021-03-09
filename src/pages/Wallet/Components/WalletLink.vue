<template>
  <div class="wallet-link clearfix">
    <router-link to="/withdrawal" class="fl" @click="handleDraw" >提现</router-link>
    <!-- <van-dialog v-model="drawShow" title="提现" show-cancel-button @confirm="sendDrawReq">
      <van-cell-group>
        <van-field v-model="drawMoney" type="digit" label="金额"/>
      </van-cell-group>
    </van-dialog> -->
    <router-link to="/rechargetype" class="fr">充值</router-link>
    <!-- <van-dialog v-model="show" title="充值" show-cancel-button @confirm="handleSaveRecharge">
      <van-cell-group>
        <van-field v-model="digit" type="digit" label="金额"/>
      </van-cell-group>
    </van-dialog> -->
    <!-- <van-dialog v-model="showCode" class="tc" title="充值" show-cancel-button @confirm="handleSaveRecharge">
      <img :src="payUrl" alt="">
      <p style="color: #333; margin-top: .2667rem; font-size: .4267rem;">请使用微信扫描二维码进行支付</p>
      <p style="color: #333; margin-top: .2667rem; font-size: .4267rem;">充值完成请刷新页面，查看是否到账</p>
    </van-dialog> -->
  </div>
</template>

<script>
// import { Notify } from 'vant'
import { Toast } from 'vant'
// import configObj from '@/http/config'
export default {
  name: 'WalletLink',
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
      show: false,
      digit: '',
      drawMoney: '',
      drawShow: false
      // payUrl: ''
      // showCode: false
    }
  },
  methods: {
    handleDraw() {
      this.drawShow = true
    },
    // sendDrawReq() {
    //   if (this.drawMoney <= 0) {
    //     Notify({ type: 'warning', message: '账户余额不足无法提现' })
    //     return
    //   }
    //   if (parseInt(this.drawMoney) <= 0 || this.drawMoney.length <= 0) {
    //     Toast('提现失败，您的金额有误，请重新输入')
    //     return
    //   }
    //   this.$api.draw({ money: this.drawMoney }).then((res) => {
    //     Toast(res.msg)
    //   })
    // },
    // 处理充值显示
    handleRechargeShow() {
      this.show = true
    },
    handleSaveRecharge() {
      console.log(this)
      if (parseInt(this.digit) <= 0 || this.digit.length <= 0) {
        Toast('充值失败，您的金额有误，请重新输入')
        return
      }
      // window.location.href = configObj.baseURL + '/user/recharge?monet=' + this.digit + '&TOKEN = ' + sessionStorage.getItem('TOKEN')
      this.$api.recharge({ money: this.digit }).then(res => {
        console.log(res)
        if (res.status === 1) {
          // this.payUrl = res.data.qrcode
          // this.showCode = true
          window.location.href = res.data.url
        }
        Toast(res.msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wallet-link {
  margin: 0.4rem /* 30/75 */ 0;
  .fl,
  .fr {
    border: 1px solid #FDB428;
    border-radius: .1333rem /* 10/75 */;
    width: 4.4rem /* 330/75 */;
    height: .9333rem /* 70/75 */;
    line-height: .9333rem /* 70/75 */;
    text-align: center;
    font-size: .4267rem /* 32/75 */;
    color: #333;
    background-color: #fff;
  }
}
</style>
