<template>
  <div class="container withdrawal">
    <common-header title="提现" bg="#fff" />
    <div class="pay-type">
      <div class="pay-type-title">提现方式 <small> * 每天只允许提现一次！</small></div>
      <van-radio-group v-model="radio" class="pay-type-list">
        <div class="pay-type-item">
          <div class="icon-left icon2" />
          <div class="title">银行卡</div>
          <van-radio class="icon-right" name="1" checked-color="#FDB428" />
        </div>
        <div class="pay-type-item">
          <div class="icon-left icon3" />
          <div class="title">支付宝</div>
          <van-radio class="icon-right" name="2" checked-color="#FDB428" />
        </div>
        <div class="pay-type-item">
          <div class="icon-left icon4" />
          <div class="title">微信</div>
          <van-radio class="icon-right" name="3" checked-color="#FDB428" />
        </div>
      </van-radio-group>
      <div class="input-title">提现金额</div>
      <input v-model="money" type="text" class="money-input" placeholder="￥" >
      <div class="submit-btn" @click="handlePay">立即提现</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Withdrawal',
  data() {
    return {
      radio: '1',
      payTypeList: [],
      userPayInfo: [],
      money: '',
      payType: [
        {
          type: 1,
          name: '银行卡',
          iconClass: 'icon2',
          img: ''
        },
        {
          type: 2,
          name: '支付宝',
          iconClass: 'icon3',
          img: ''
        },
        {
          type: 3,
          name: '微信',
          iconClass: 'icon4',
          img: ''
        }
      ]
    }
  },
  mounted() {
    this.getUserPayInfo()
  },
  methods: {
    getUserPayInfo() {
      const userId = JSON.parse(localStorage.getItem('USER')).userId
      console.log(userId)
      // 获取用户支付信息
      this.$api.getUserPayInfo({ userId }).then(res => {
        this.userPayInfo = res.data
        for (let o = 0; o < this.payType.length; o++) {
          const ele1 = this.payType[o]
          for (let i = 0; i < this.userPayInfo.length; i++) {
            const ele2 = this.userPayInfo[i]
            if (ele1.type === ele2.type) {
              ele1.img = this.userPayInfo[i].img
              this.payTypeList.push(ele1)
            }
          }
        }
        console.log(this.payTypeList)
      })
    },
    handlePay() {
      if (parseInt(this.money) <= 0 || this.money.length <= 0) {
        Toast('提现失败，您的金额有误，请重新输入')
        return
      }
      this.$api.draw({ money: this.money, type: this.radio }).then((res) => {
        if (res.msg === '请先上传收款信息') {
          Toast('请先上传收款信息')
          this.$router.push({ path: '/seting' })
          return
        } else if (res.status === -1) {
          Toast(res.msg)
          return
        }
        Toast(res.msg)
        this.$router.push({ path: '/wallet' })
      })
    }
  }
}
</script>

<style lang="less">
.withdrawal {
  .pay-type {
    .pay-type-list {
      .pay-type-item {
        .icon-right {
          .van-radio__icon {
            position: absolute;
            right: 0.4rem /* 30/75 */;
            top: 50%;
            transform: translateY(-50%);
            display: none;
          }

          .van-radio__icon.van-radio__icon--checked {
            display: block;
          }
        }
      }
    }
  }

  .van-dialog__content {
    position: relative;
    height: 4.4rem /* 330/75 */;

    .van-uploader {
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>

<style lang="less" scoped>
.withdrawal {
  .pay-type {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.8rem /* 60/75 */ 0.4rem /* 30/75 */ 0.4rem /* 30/75 */;
    margin: .4rem /* 30/75 */ auto 0;
    width: 9.2rem /* 690/75 */;
    box-shadow: 0px 0px 0.2133rem /* 16/75 */ 0px rgba(0, 0, 0, 0.15);
    border-radius: 0.2667rem /* 20/75 */;

    .pay-type-title {
      padding-bottom: 0.1333rem /* 10/75 */;
      font-size: 0.4267rem /* 32/75 */;
      font-weight: bold;
      color: #333;
    }

    .pay-type-list {
      .pay-type-item {
        position: relative;
        border-radius: 0.08rem /* 6/75 */;
        box-sizing: border-box;
        padding-left: 1.1467rem /* 86/75 */;
        margin-top: 0.2667rem /* 20/75 */;
        height: 1.0667rem /* 80/75 */;
        background-color: #f8f8f8;

        .icon-left.icon1 {
          background-image: url("../../../static/wallet_icon2.png");
        }

        .icon-left.icon2 {
          width: 0.5867rem /* 44/75 */;
          height: 0.3333rem /* 25/75 */;
          background-image: url("../../../static/unionpay_icon.png");
        }

        .icon-left.icon3 {
          width: 0.4533rem /* 34/75 */;
          height: 0.4533rem /* 34/75 */;
          background-image: url("../../../static/alipay_icon.png");
        }

        .icon-left.icon4 {
          background-image: url("../../../static/wechat_icon.png");
        }

        .icon-left {
          width: 0.48rem /* 36/75 */;
          height: 0.48rem /* 36/75 */;
          background-repeat: no-repeat;
          background-size: 100%;
          position: absolute;
          top: 50%;
          left: 0.2667rem /* 20/75 */;
          transform: translateY(-50%);
        }

        .title {
          color: #333;
          font-size: 0.3733rem /* 28/75 */;
          line-height: 1.0667rem /* 80/75 */;
        }

        .icon-right {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          right: 0.4rem /* 30/75 */;
          border-radius: 0.08rem /* 6/75 */;
          border: 1px solid #ddd;
        }
      }
    }
  }

  .submit-btn {
    margin: 0.6667rem /* 50/75 */ auto 0;
    border-radius: 0.1333rem /* 10/75 */;
    width: 100%;
    height: 0.9333rem /* 70/75 */;
    line-height: 0.9333rem /* 70/75 */;
    text-align: center;
    color: #333;
    font-size: 0.4267rem /* 32/75 */;
    background-color: #fdb428;
  }
  .input-title {
    margin-top: 0.5333rem /* 40/75 */;
    font-size: 0.4267rem /* 32/75 */;
    font-weight: bold;
    color: #333;
  }
  .money-input {
    padding-left: 0.1333rem /* 10/75 */;
    border-bottom: 1px solid #e2e2e2;
    line-height: 0.9333rem /* 70/75 */;
    font-size: 0.4267rem /* 32/75 */;
    width: 100%;
    &::-webkit-input-placeholde {
      color: #333;
    }
  }
}
</style>

