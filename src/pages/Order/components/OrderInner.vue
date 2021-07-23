<template>
  <div class="order-inner">
    <router-link to="/address" class="order-address">
      <div class="address-left-icon" />
      <div class="address-content">
        <p class="name">
          {{ address.name }}
          <span class="phone">{{ address.phone }}</span>
        </p>
        <p class="address">
          {{ address.provinceName + address.cityName + address.userAddress }}
        </p>
      </div>
      <van-icon
        class="address-right-icon"
        name="arrow"
        color="#999"
        size="0.3rem"
      />
    </router-link>
    <div v-for="item of goodDetails" :key="item.id" class="order-goods">
      <div class="item">
        <div class="item-header">
          <img :src="item.goodsLogo || item.collectionPic" alt />
          <div class="item-info">
            <h2 class="item-title">{{ item.goodsName }}</h2>
            <div class="item-center">
              <span class="price">¥{{ item.price }}</span>
              <i class="num">X1</i>
            </div>
          </div>
        </div>
        <div class="item-bottom">
          合计需支付：
          <span>¥{{ item.sumPrice }}</span>
        </div>
      </div>
    </div>
    <div class="pay-type">
      <div class="pay-type-title">
        支付方式
        <small>（请点击下方列表查看二维码）</small>
      </div>
      <van-radio-group v-model="radio" class="pay-type-list">
        <div v-for="item of payType" :key="item.type" class="pay-type-item">
          <div v-if="item.type == 2">
            <div class="title">
              <div :class="'icon-left ' + item.iconClass"></div>
              {{ item.name }}
            </div>

            <van-radio
              :name="item.type"
              class="icon-right"
              checked-color="#FDB428"
            />
          </div>
          <div v-if="item.type == 1">
            <div class="title">
              <div :class="'icon-left ' + item.iconClass"></div>
              {{ item.name }}
            </div>

            <van-radio
              :name="item.type"
              class="icon-right"
              checked-color="#FDB428"
            />
          </div>
          <div v-if="item.type == 3">
            <div class="title">
              <div :class="'icon-left ' + item.iconClass"></div>
              {{ item.name }}
            </div>

            <van-radio
              :name="item.type"
              class="icon-right"
              checked-color="#FDB428"
            />
          </div>
        </div>
      </van-radio-group>
      <br />
      <div v-for="(item, index) in payTypeList" :key="index">
        <div v-if="item.type == 1 && radio == 1">
          <ul style="font-size: 0.4em; line-height: 2em; width: 88%">
            <li>
              银行名称：{{ item.bankName }}
              <i
                class="el-icon-document-copy"
                @click="copyUrl(item.bankName)"
              ></i>
            </li>
            <li>
              支行地址：{{ item.bankOtherName }}
              <i
                class="el-icon-document-copy"
                @click="copyUrl(item.bankOtherName)"
              ></i>
            </li>
            <li>
              银行卡号：{{ item.cardNum }}
              <i
                class="el-icon-document-copy"
                @click="copyUrl(item.cardNum)"
              ></i>
            </li>
            <li>
              收款人名：{{ item.name }}
              <i class="el-icon-document-copy" @click="copyUrl(item.name)"></i>
            </li>
            <li>
              联系电话：{{ item.phone }}
              <i class="el-icon-document-copy" @click="copyUrl(item.phone)"></i>
            </li>
          </ul>
        </div>
        <div v-show="item.type == 2 && radio == 2">
          <ul style="font-size: 0.4em; line-height: 2em">
            <li>
              收款账号：{{ item.payAccount }}
              <i
                class="el-icon-document-copy"
                @click="copyUrl(item.payAccount)"
              ></i>
            </li>
            <li>
              支付姓名：{{ item.name }}
              <i class="el-icon-document-copy" @click="copyUrl(item.name)"></i>
            </li>
            <li>
              <img :src="baseUrl + item.img" style="width: 60vh" alt />
            </li>
            <li v-show="item.payPic">
              <img
                :src="baseUrl + item.payPic"
                style="width: 60vh"
                alt
              />
            </li>
          </ul>
        </div>
        <div v-show="item.type == 3 && radio == 3">
          <ul style="font-size: 0.4em; line-height: 2em">
            <li>
              收款账号：{{ item.payAccount }}
              <i
                class="el-icon-document-copy"
                @click="copyUrl(item.payAccount)"
              ></i>
            </li>
            <li>
              支付姓名：{{ item.name }}
              <i class="el-icon-document-copy" @click="copyUrl(item.name)"></i>
            </li>
            <li>
              <img :src="baseUrl + item.img" style="width: 60vh" alt />
            </li>
            <li v-show="item.payPic">
              <img
                :src="baseUrl + item.payPic"
                style="width: 60vh"
                alt
              />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <van-dialog
      v-model="show"
      title="上传付款截图"
      show-cancel-button
      @confirm="handleSave"
    >
      <van-uploader
        v-model="fileList"
        :max-count="1"
        style="margin: auto"
        upload-icon="plus"
        multiple
      />
    </van-dialog>
    <div class="submit-btn" @click="handlePay">立即支付</div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import configObj from "@/http/config";

export default {
  name: "OrderInner",
  props: {
    address: {
      type: Object,
      default() {
        return {};
      },
    },
    goodDetails: {
      type: Array,
      default() {
        return [];
      },
    },
    userPayInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      baseUrl: baseConfig.apiurl,
      radio: 3,
      payTypeList: [],
      payType: [
        {
          type: 3,
          name: "微信",
          iconClass: "icon4",
        },
        {
          type: 2,
          name: "支付宝",
          iconClass: "icon3",
        },
        {
          type: 1,
          name: "银行卡",
          iconClass: "icon2",
        }
      ],
      fileList: [],
      show: false,
      payImgUrl: "",
    };
  },
  watch: {
    userPayInfo() {
      if (this.userPayInfo.length <= 0) {
        Toast("当前卖家暂未设置支付方式，请稍后重试");
        this.$router.push({ path: "/my" });
      }
      for (let k = 0; k < this.userPayInfo.length; k++) {
        let type = this.userPayInfo[k].type;
        for (let kl = 0; kl < this.payType.length; kl++) {
          if (this.userPayInfo[k].type == this.payType[kl].type) {
            this.userPayInfo[k].iconClass = this.payType[kl].iconClass;
            this.userPayInfo[k].payName = this.payType[kl].name;
          }
        }
      }
      
      this.payTypeList = this.userPayInfo;
      return;
    },
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
            .post(configObj.baseURL + "/common/uploadPic", params, config)
            .then((res) => {
              Toast(res.data.msg);
              this.payImgUrl = res.data.data.src;
            })
            .catch(() => {
              reject();
            });
        });
      }
    },
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
    handlePay() {
      // console.log(this.payTypeList)
      // if(this.payTypeList){
      //     this.$api.WXPay({ userId: this.$route.params.id, fee: 1 ,type: 3}).then(res => {
      //         console.log(res)
      //     })
      // }
      for(var i=0;i<this.payTypeList.length;i++){
        if(this.payTypeList[i].type == this.radio){
          this.show = true
        }else{
          Toast("暂未设置该支付方式！");
        }
      }
    },
    handleSave() {
      if (!this.payImgUrl) {
        Toast("您还没有上传付款截图");
        return;
      }
      this.$api
        .payPic({ id: this.goodDetails[0].id, payPic: this.payImgUrl })
        .then((res) => {
          if (res.status === 1) {
            Toast(res.msg);
            this.$router.push({ path: "/pay?active=already" }); ///already
          } else {
            Toast(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="less">
.order-inner {
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
.order-inner {
  padding: 0 0.4rem /* 30/75 */;
  position: relative;
  top: -1.0933rem /* -82/75 */;

  .order-address {
    display: block;
    position: relative;
    box-sizing: border-box;
    padding: 0.52rem /* 39/75 */ 0.8667rem /* 65/75 */ 0 1.2933rem /* 97/75 */;
    margin: auto;
    width: 9.2rem /* 690/75 */;
    height: 2rem /* 150/75 */;
    background-color: #fff;
    box-shadow: 0px 0px 0.2133rem /* 16/75 */ 0px rgba(0, 0, 0, 0.15);
    border-radius: 0.2667rem /* 20/75 */;

    .address-left-icon {
      position: absolute;
      top: 0.7467rem /* 56/75 */;
      left: 0.4rem /* 30/75 */;
      width: 0.4933rem /* 37/75 */;
      height: 0.4933rem /* 37/75 */;
      background: url("../../../../static/position_icon_2.png") no-repeat;
      background-size: 100%;
    }

    .address-content {
      .name {
        font-size: 0.3733rem /* 28/75 */;
        color: #333;

        .phone {
          margin-left: 0.2rem /* 15/75 */;
          font-size: 0.32rem /* 24/75 */;
          color: #666;
        }
      }

      .address {
        margin-top: 0.1333rem /* 10/75 */;
        font-size: 0.32rem /* 24/75 */;
        color: #333;
      }
    }

    .address-right-icon {
      position: absolute;
      top: 0.84rem /* 63/75 */;
      right: 0.4rem /* 30/75 */;
      width: 0.1733rem /* 13/75 */;
      height: 0.3067rem /* 23/75 */;
    }
  }

  .order-goods {
    margin: 0.4rem /* 30/75 */ auto;
    width: 9.2rem /* 690/75 */;
    height: 3.0267rem /* 227/75 */;
    box-shadow: 0px 0px 0.2133rem /* 16/75 */ 0px rgba(0, 0, 0, 0.15);
    border-radius: 0.2667rem /* 20/75 */;

    .item {
      box-sizing: border-box;
      padding: 0.52rem /* 39/75 */ 0.3867rem /* 29/75 */ 0;
      margin: 0.4rem /* 30/75 */ auto 0.4rem /* 30/75 */;
      display: block;
      width: 9.2rem /* 690/75 */;
      height: 3.0267rem /* 227/75 */;
      background-color: #fff;
      box-shadow: 0px 0px 0.2133rem /* 16/75 */ 0px rgba(0, 0, 0, 0.15);
      border-radius: 0.2667rem /* 20/75 */;

      .item-header {
        padding-left: 2.0267rem /* 152/75 */;
        position: relative;

        img {
          border-radius: 0.08rem /* 6/75 */;
          position: absolute;
          left: 0;
          top: 0;
          width: 1.6rem /* 120/75 */;
          height: 1.6rem /* 120/75 */;
        }

        .item-info {
          height: 1.8133rem /* 136/75 */;

          .item-title {
            padding-top: 0.12rem /* 9/75 */;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.3733rem /* 28/75 */;
            color: #333;
          }

          .item-center {
            margin-top: 0.4267rem /* 32/75 */;
            overflow: hidden;

            .price {
              color: #333;
              font-size: 0.32rem /* 24/75 */;
              float: left;
            }

            .num {
              color: #999;
              font-size: 0.32rem /* 24/75 */;
              float: right;
            }
          }
        }
      }

      .item-bottom {
        text-align: right;
        font-size: 0.32rem /* 24/75 */;
        color: #333;

        span {
          color: #ed3017;
        }
      }
    }
  }

  .pay-type {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.8rem /* 60/75 */ 0.4rem /* 30/75 */ 0;
    margin: auto;
    width: 9.2rem /* 690/75 */;
    height: 100% /* 560/75 */;
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
        height: 100% /* 80/75 */;
        background-color: #f8f8f8;

        .icon-left.icon1 {
          background-image: url("../../../../static/wallet_icon2.png");
        }

        .icon-left.icon2 {
          width: 0.5867rem /* 44/75 */;
          height: 0.3333rem /* 25/75 */;
          background-image: url("../../../../static/unionpay_icon.png");
        }

        .icon-left.icon3 {
          width: 0.4533rem /* 34/75 */;
          height: 0.4533rem /* 34/75 */;
          background-image: url("../../../../static/alipay_icon.png");
        }

        .icon-left.icon4 {
          background-image: url("../../../../static/wechat_icon.png");
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
    width: 9.2rem /* 690/75 */;
    height: 0.9333rem /* 70/75 */;
    line-height: 0.9333rem /* 70/75 */;
    text-align: center;
    color: #fff;
    font-size: 0.4267rem /* 32/75 */;
    background-color: #fdb428;
  }
}
</style>
