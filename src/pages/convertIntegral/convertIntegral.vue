<template>
  <div class="register-inner">
    <common-header title="积分兑换" bg="#fff" style="color: #fff" />

    <div class="inner-wrap">
      <van-cell-group>
        <div class="input-label">积分转换</div>
        <van-field v-model="money" placeholder="请输入" />
      </van-cell-group>
      <!-- <div class="money">
        当前可用积分 <span class="red">{{ changeMoney }}</span>
      </div>
      <div class="money" style="margin-bottom: 0.4rem">
        当前可转换业绩 <span class="red">{{ change }}</span>
      </div> -->
      <div
        class="submit-btn"
        @click="handleSubmitRegister"
        :style="'background:' + sysColor"
      >
        确认转换
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { checkPhone } from "@/utils/validate";
export default {
  name: "",
  data() {
    return {
      user: {
        cardID: "",
        userPhone: "",
        code: "",
        inviteCode:
          this.$route.query.invite === 1 ? "" : this.$route.query.invite,
        notice: "获取验证码",
        overtime: true,
      },
      change: "0",
      changeMoney: "0.00",
      sysColor: "#FDB428",
      agreement: false,
    };
  },
  created() {
    this.sysColor = localStorage.getItem("styleColor");
  },
  methods: {
    // 处理提交转增
    handleSubmitRegister() {
      this.$api.convert({'jifen':this.money}).then((res) => {
        if (res.status === 1) {
          console.log(res.data.msg);
        } else {
          Toast(res.msg);
        }
      });
    },
    // 处理获取验证码
    handleGetVerificationCode() {
      if (!checkPhone(this.user.userPhone)) {
        Toast("您输入的手机号有误，请重新输入");
        return;
      }
      if (this.user.overtime === false) {
        Toast("请稍后重试");
        return;
      }
      this.$api
        .verificationCode({
          userPhone: this.user.userPhone,
          function: "zhuanzeng",
        })
        .then((res) => {
          this.overtime(60);
          Toast(res.msg);
        });
    },
    overtime(timelimit) {
      this.user.overtime = false;
      if (timelimit === 0) {
        this.user.overtime = true;
        this.user.notice = "获取验证码";
      } else {
        timelimit -= 1;
        this.user.notice = timelimit + "s后重试";
        setTimeout(() => {
          this.overtime(timelimit);
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less">
.register-inner {
  .avatar {
    .van-uploader {
      .van-uploader__wrapper {
        border-radius: 50%;
        .van-uploader__upload {
          width: 1.3333rem /* 100/75 */;
          height: 1.3333rem /* 100/75 */;
          margin: 0;
          .van-uploader__input {
            width: 1.3333rem /* 100/75 */;
            height: 1.3333rem /* 100/75 */;
          }
        }
      }
      .van-uploader__preview {
        width: 1.3333rem /* 100/75 */;
        height: 1.3333rem /* 100/75 */;
        .van-image {
          width: 1.3333rem /* 100/75 */;
          height: 1.3333rem /* 100/75 */;
          img {
            border-radius: 50%;
            width: 1.3333rem /* 100/75 */;
            height: 1.3333rem /* 100/75 */;
          }
        }
      }
    }
    .username {
      .van-field__control {
        font-size: 0.64rem /* 48/75 */;
        color: #333;
      }
    }
  }
  .inner-wrap {
    .van-cell {
      padding: 0.26667rem 0;
      .van-field__control {
        color: #333;
        font-size: 0.3733rem /* 28/75 */;
      }
    }
    .agreement {
      .van-icon {
        border-color: #fdb428;
      }
      .van-checkbox__label {
        color: #999;
        font-size: 0.32rem /* 24/75 */;
        a {
          color: #fdb428;
        }
      }
    }
  }
}
.money {
  font-size: 0.35rem;
  color: #c0c0c0;
  margin-top: 0.3rem;
}
.red {
  color: #bf246c;
}
</style>

<style lang="less" scoped>
.register-inner {
  .avatar {
    overflow: hidden;
    position: relative;
    margin: auto;
    width: 9.2rem /* 690/75 */;
    height: 2rem /* 150/75 */;
    border-radius: 0.2667rem /* 20/75 */;
    background-color: #fff;
    .van-uploader {
      margin-top: 0.3333rem /* 25/75 */;
      margin-left: 0.4rem /* 30/75 */;
    }
    .username {
      position: absolute;
      top: 50%;
      color: #333;
      font-size: 0.64rem /* 48/75 */;
      transform: translateY(-50%);
      left: 2.1333rem /* 160/75 */;
      &::after {
        border: none;
      }
    }
  }
  .inner-wrap {
    padding: 0 0.4rem /* 30/75 */ 0.8rem /* 60/75 */;
    margin: 0.4rem /* 30/75 */ auto 0;
    border-radius: 0.2667rem /* 20/75 */;
    // height: 12.1067rem /* 908/75 */;
    background-color: #fff;
    .van-cell-group {
      &::after {
        border-bottom: 1px solid #ddd;
      }
      .input-label {
        padding-top: 0.3467rem /* 26/75 */;
        font-size: 0.3733rem /* 28/75 */;
        color: #333;
        .van-cell {
          padding: 0.26667rem 0;
        }
      }
      .van-field__button {
        span {
          cursor: pointer;
          padding-left: 0.24rem /* 18/75 */;
          border-left: 1px solid #fdb428;
          font-size: 0.3733rem /* 28/75 */;
          color: #fdb428;
        }
      }
    }
    .agreement {
      margin: 0.8rem /* 60/75 */ 0 0.4rem /* 30/75 */;
    }
    .submit-btn {
      cursor: pointer;
      border-radius: 0.1333rem /* 10/75 */;
      width: 8.4rem /* 630/75 */;
      height: 0.9333rem /* 70/75 */;
      line-height: 0.9333rem /* 70/75 */;
      font-size: 0.4267rem /* 32/75 */;
      text-align: center;
      background: #fdb428;
      color: #333;
    }
  }
}
</style>
