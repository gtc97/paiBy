<template>
  <div class="container rechargetype">
    <common-header title="充值" bg="#fff" />

    <div class="pay-type">
      <div class="pay-type-title">请选择支付方式：</div>
      <van-radio-group v-model="radio" class="pay-type-list">
        <!-- <div class="pay-type-item">
                 <div class="icon-left icon3" />
                 <div class="title">在线支付</div>
                 <van-radio class="icon-right" name="1" checked-color="#FDB428" />
                </div>-->
        <div class="pay-type-item">
          <div class="icon-left icon2" />
          <div class="title">线下汇款</div>
          <van-radio class="icon-right" name="1" checked-color="#FDB428" />
        </div>
        <div class="pay-type-item">
          <div class="icon-left icon3" />
          <div class="title">支付宝转账</div>
          <van-radio class="icon-right" name="2" checked-color="#FDB428" />
        </div>
        <div class="pay-type-item">
          <div class="icon-left icon4" />
          <div class="title">微信转账</div>
          <van-radio class="icon-right" name="3" checked-color="#FDB428" />
        </div>
      </van-radio-group>

      <div v-if="radio == 1">
        <div class="input-title">银行汇款</div>
        <ul
          style="
            font-size: 0.4em;
            line-height: 2em;
            width: 88%;
            padding-top: 1em;
          "
        >
          <li>
            银行名称：{{ userPayInfo.unionpay.bankName }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.unionpay.bankName)"
            ></i>
          </li>
          <li>
            支行地址：{{ userPayInfo.unionpay.bankOtherName }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.unionpay.bankOtherName)"
            ></i>
          </li>
          <li>
            银行卡号：{{ userPayInfo.unionpay.cardNum }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.unionpay.cardNum)"
            ></i>
          </li>
          <li>
            收款人名：{{ userPayInfo.unionpay.name }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.unionpay.name)"
            ></i>
          </li>
          <li>
            联系电话：{{ userPayInfo.unionpay.phone }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.unionpay.phone)"
            ></i>
          </li>
        </ul>
      </div>
      <div v-if="radio == 2">
        <div class="input-title">支付宝转账</div>
        <ul style="font-size: 0.4em; line-height: 2em; padding-top: 1em">
          <li>
            收款账号：{{ userPayInfo.alipay.payAccount }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.alipay.payAccount)"
            ></i>
          </li>
          <li>
            支付姓名：{{ userPayInfo.alipay.phone }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.alipay.phone)"
            ></i>
          </li>
          <li>
            <img :src="userPayInfo.alipay.img" style="width: 10rem" alt />
          </li>
        </ul>
      </div>
      <div v-if="radio == 3">
        <div class="input-title">微信转账</div>
        <ul style="font-size: 0.4em; line-height: 2em; padding-top: 1em">
          <li>
            收款账号：{{ userPayInfo.weixin.payAccount }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.weixin.payAccount)"
            ></i>
          </li>
          <li>
            支付姓名：{{ userPayInfo.weixin.phone }}
            <i
              class="el-icon-document-copy"
              @click="copyUrl(userPayInfo.weixin.phone)"
            ></i>
          </li>
          <li>
            <img
              :src="userPayInfo.weixin.img"
              style="width:40vh height:40vh"
              alt
            />
          </li>
        </ul>
      </div>
      <div class="input-title">上传付款凭证：</div>
      <ul style="font-size: 0.4em; line-height: 2em; padding-top: 1em">
        <div class="ercode" style="margin: auto; width: 6.2em">
          <van-uploader
            v-model="fileList"
            :max-count="1"
            upload-icon="plus"
            multiple
          />
        </div>
      </ul>

      <div class="input-title">
        填写金额
        <small>（请如实填写您的转账金额）</small>
      </div>
      <input v-model="money" type="text" class="money-input" placeholder="￥" />
      <div class="submit-btn" @click="handlePay" :style="'background:'+ sysColor +';'">立即充值</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";

export default {
  name: "RechargeType",
  data() {
    return {
      radio: 1,
      payImgUrl: "",
      fileList: [],
      userPayInfo: {
        unionpay: {},
        alipay: {},
        weixin: {},
      },
      money: "",
      payType: [
        {
          type: 1,
          name: "银行卡支付",
          iconClass: "icon3",
          img: "",
        },
        {
          type: 2,
          name: "支付宝",
          iconClass: "icon4",
          img: "",
        },
        {
          type: 3,
          name: "微信",
          iconClass: "icon4",
          img: "",
        },
      ],
      sysColor:localStorage.getItem('styleColor'),
    };
  },
  watch: {
    fileList() {
      if (this.fileList.length > 0) {
        if (!/image\/[a-zA-z]+/.test(this.fileList[0].file.type)) {
          Toast("请上传图片");
          return false;
        }
        const params = new FormData();
        params.append("file", this.fileList[0].file);
        const config = {
          headers: {
            // 添加请求头
            "Content-Type": "multipart/form-data",
          },
        };
        return new Promise((resolve, reject) => {
          axios
            .post(baseConfig.apiurl + "/api/common/uploadPic", params, config)
            .then((res) => {
              Toast(res.data.msg);
              if (res.data.status === 1) {
                this.payImgUrl = res.data.data.src;
              }
            })
            .catch(() => {
              reject();
            });
        });
      }
    },
  },
  mounted() {
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.getPayInfo();
  },
  methods: {
    copyUrl(data) {
      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      Toast("复制成功");
      oInput.remove();
    },
    getPayInfo() {
      this.$api.getReahargeInfo().then((res) => {
        this.userPayInfo = res.data;
      });
    },
    handlePay() {
      var data = new Date();
      var hour = data.getHours();
      // if (hour < 9 || hour > 19) {
      //     Toast("充值时间9点到19点");
      //     return;
      // }
      if (parseInt(this.money) <= 0 || this.money.length <= 0) {
        Toast("充值失败，您的金额有误，请重新输入");
        return;
      }
      const userId = JSON.parse(localStorage.getItem("USER")).userId;

      if (this.radio == 3) {
        this.$api.WXPay({ userId: userId, fee: this.money, type: this.radio }).then((res) => {
            console.log(res);
            Toast("支付凭证上传成功等待审核");
            this.$router.push({ path: "/wallet" });
        });
      } else {
        this.$api.recharge({money: this.money,type: this.radio,img: this.payImgUrl, }).then((res) => {
            Toast("支付凭证上传成功等待审核");
            this.$router.push({ path: "/wallet" });
          });
      }
    },
  },
};
</script>

<style lang="less">
.rechargetype {
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
.rechargetype {
  .pay-type {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.8rem /* 60/75 */ 0.4rem /* 30/75 */ 0.4rem /* 30/75 */;
    margin: 0.4rem /* 30/75 */ auto 0;
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

