<template>
  <div class="register-inner">
    <common-header title="佣金转赠" :bg="sysColor" />

    <div class="inner-wrap">
      <!-- <van-cell-group>
        <div class="input-label">手机号</div>
        <van-field
          v-model="user.userPhone"
          :rules="[{ required: true, message: '请填写手机号' }]"
          placeholder="请输入手机号"
        />
      </van-cell-group> -->
      <van-cell-group>
        <div class="input-label">转赠人Id</div>
        <van-field
          v-model="user.userId"
          :rules="[{ required: true, message: '请填写Id' }]"
          placeholder="请输入"
        />
      </van-cell-group>
      <van-cell-group>
        <div class="input-label">转赠人姓名</div>
        <van-field
          v-model="user.userName"
          :rules="[{ required: true, message: '请填写姓名' }]"
          placeholder="请输入真实姓名"
        />
      </van-cell-group>

      <van-cell-group>
        <div class="input-label">数量</div>
        <van-field v-model="user.num" placeholder="请输入数量" />
      </van-cell-group>

      <van-cell-group v-show="false">
        <div class="input-label">手机号</div>
        <van-field v-model="user.userPhone" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group>
        <div class="input-label">验证码</div>
        <van-field
          v-model="user.code"
          :rules="[{ required: true, message: '请填写验证码' }]"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <span @click="handleGetVerificationCode">{{ user.notice }}</span>
          </template>
        </van-field>
      </van-cell-group>
      <div
        class="submit-btn"
        @click="handleSubmitRegister"
        :style="'background:' + sysColor + ';color:#fff'"
      >
        提交
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
        avatar: [],
        userName: "",
        cardID: "",
        userPhone: JSON.parse(localStorage.getItem("userInfo")).userPhone,
        code: "",
        inviteCode:
          this.$route.query.invite === 1 ? "" : this.$route.query.invite,
        notice: "获取验证码",
        overtime: true,
        userId: "",
      },
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
      // this.user.userPhone = localStorage.getItem("userInfo").userPhone;

      this.$api
        .zhuanzeng({
          type: 1,
          tel: this.user.userPhone,
          name: this.user.userName,
          num: this.user.num,
          userId: this.user.userId,
          code: this.user.code,
        })
        .then((res) => {
          if (res.status === 1) {
            console.log(res.data.msg);
            this.$router.push({ path: "/my" });
          } else if (res.status == 3) {
            Toast("输入信息有误！");
          } else if (res.status == 2) {
            Toast("不足！");
          }
        });
    },
    // 处理获取验证码
    handleGetVerificationCode() {
      if (this.user.overtime === false) {
        Toast("请稍后重试");
        return;
      }
      if (!this.user.userPhone) {
        this.user.userPhone = JSON.parse(
          localStorage.getItem("userInfo")
        ).userPhone;
      }
      if (!checkPhone(this.user.userPhone)) {
        Toast("您输入的手机号有误，请重新输入");
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
      // width: 8.4rem /* 630/75 */;
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
