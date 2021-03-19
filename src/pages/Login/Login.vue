<template>
  <div class="container">
    <van-nav-bar class="login-header" title="登录" />
    <div class="logo" />
    <img
      src="/static/logo.jpg"
      style="width: 40%; margin-left: 30%"
      alt=""
    />
    <div class="login-wrap">
      <div class="title">
        <div class="title-l fl">国家/地区</div>
        <div class="title-r fr">中国(+86)</div>
      </div>
      <div class="input-wrap">
        <input
          v-model="loginForm.userPhone"
          type="text"
          placeholder="请输入您的手机号"
          maxlength="11"
        />
      </div>
      <div class="input-wrap vercode-box">
        <input
          v-model="loginForm.code"
          type="text"
          placeholder="请输入短信验证码"
          maxlength="6"
        />
        <span
          class="codenotice"
          @click="handleGetVerificationCode"
          :style="'color:' + sysColor"
          >{{ loginForm.notice }}</span
        >
      </div>
      <div class="agreement">
        <van-checkbox v-model="agreement" :checked-color="sysColor">
          <span>阅读并同意</span>
          <router-link to="/agreement" :style="'color:' + sysColor"
            >《用户注册协议》</router-link
          >
        </van-checkbox>
      </div>
      <div
        class="submit-btn"
        @click="handleLogin"
        :style="'background:' + sysColor + ';'"
      >
        登录
      </div>
      <div class="no-account">
        没有账号？
        <router-link
          :to="{ path: '/register', query: { invite: 1 } }"
          :style="'color:' + sysColor"
          >点击注册</router-link
        >

        <!-- <a href="/down/" >下载App</a> -->
        <!-- <span @click="wxLogin">微信登陆</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { checkPhone } from "@/utils/validate";
import axios from "axios";
import configObj from "@/http/config";

export default {
  name: "Login",
  data() {
    return {
      agreement: false,
      loginForm: {
        userPhone: "",
        code: "",
        notice: "获取验证码",
        overtime: true,
      },
      sysColor: localStorage.getItem("styleColor"),
    };
  },
  created() {
    // // 微信授权登录
    // var isWXlogin = localStorage.getItem("WXlogin")
    // if(isWXlogin == null){
    //   localStorage.setItem("WXlogin",'微信授权')
    //   // var url = configObj.baseURL + "/login/wxlogin"
    //   var url = configObj.baseURL + "/login/wxlogin2"
    //   location.href = url
    // }

    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
  },
  methods: {
    wxLogin() {
      const params = {appid:'wx1f648303799a12ba',redirect_uri: 'http://pmapi.chaoyuephp.com',response_type: 'code',scope: 'snsapi_userinfo',state: 'wx1f648303799a12ba'};
      // const params = {appid:'wx1f648303799a12ba',redirect_uri: 'http://192.168.1.7:8080',response_type: 'code',scope: 'snsapi_userinfo',state: 'wx1f648303799a12ba'};
      const config = {
        headers: {
          // 添加请求头
          "Content-Type": "multipart/X-WWW-FORM-URLENCODED",
        },
      };
      axios.get(configObj.baseURL + "/login/wxlogin", params, config).then((res) => {
          console.log(res);
          const userInfo = {
            userId: res.data.userId,
            inviteCode: res.data.inviteCode,
            userName: res.data.userName,
            userPhone: res.data.userPhone,
            money: res.data.money,
          };
          localStorage.setItem("USER", JSON.stringify(userInfo));
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("IDS", 1);
        })
        .catch((ress) => {
          console.log(ress);
          reject();
        });
    },
    // 处理登录
    handleLogin() {
      if (!this.agreement) {
        Toast("请先勾选用户协议");
        return;
      } else if (!checkPhone(this.loginForm.userPhone)) {
        Toast("您输入的手机号不正确");
        return;
      } else if (this.loginForm.code.length <= 5) {
        Toast("您输入的验证码不正确");
        return;
      }
      this.$api.login(this.loginForm).then((res) => {
        if (res.status === 1) {
          const userInfo = {
            userId: res.data.userId,
            inviteCode: res.data.inviteCode,
            userName: res.data.userName,
            userPhone: res.data.userPhone,
            money: res.data.money,
          };
          localStorage.setItem("USER", JSON.stringify(userInfo));
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("IDS", 1);
          this.$router.push({ path: "/" });
        } else {
          Toast(res.msg);
        }
      });
    },
    // 处理获取验证码
    handleGetVerificationCode() {
      if (this.loginForm.userPhone.length <= 0) {
        Toast("您还没填写手机号");
        return;
      }
      if (this.loginForm.overtime === false) {
        Toast("请稍后重试");
        return;
      }
      this.$api
        .verificationCode({
          userPhone: this.loginForm.userPhone,
          function: "login",
        })
        .then((res) => {
          if (res.status === 1) {
            this.overtime(60);
            Toast(res.msg);
          } else {
            Toast(res.msg);
          }
        });
    },
    overtime(timelimit) {
      this.loginForm.overtime = false;
      if (timelimit === 0) {
        this.loginForm.overtime = true;
        this.loginForm.notice = "获取验证码";
      } else {
        timelimit -= 1;
        this.loginForm.notice = timelimit + "s后重试";
        setTimeout(() => {
          this.overtime(timelimit);
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  box-sizing: border-box;
  background-color: #f5f5f5;
  min-height: 100vh;

  .login-header {
    background-color: #f5f5f5;

    &::after {
      border: none;
    }
  }

  .login-wrap {
    box-sizing: border-box;
    padding: 0.5333rem /* 40/75 */ 0.4rem /* 30/75 */ 0.2667rem /* 20/75 */;
    border-radius: 0.2667rem /* 20/75 */;
    margin: 1.0667rem /* 80/75 */ auto 0;
    width: 9.2rem /* 690/75 */;
    height: 7.6267rem /* 572/75 */;
    background-color: #fff;

    .title {
      overflow: hidden;
      font-size: 0.4267rem /* 32/75 */;
      color: #333;
    }

    .input-wrap {
      margin-top: 0.3333rem /* 25/75 */;
      overflow: hidden;
      border-radius: 0.5333rem /* 40/75 */;
      height: 1.0667rem /* 80/75 */;
      border: 1px solid #ddd;

      &.vercode-box {
        input {
          float: left;
          width: 5.4667rem /* 410/75 */;
          // background-color: pink;
        }

        span {
          cursor: pointer;
          margin-top: 0.2667rem /* 20/75 */;
          border-left: 0.0267rem /* 2/75 */ solid #ddd;
          padding-left: 0.24rem /* 18/75 */;
          float: left;
          // line-height: 1.0667rem /* 80/75 */;
          font-size: 0.3733rem /* 28/75 */;
          color: #fdb428;
        }
      }

      input {
        box-sizing: border-box;
        padding: 0 0.4rem /* 30/75 */;
        font-size: 0.3733rem /* 28/75 */;
        vertical-align: top;
        color: #999;
        width: 100%;
        height: 100%;
      }
    }

    .agreement {
      margin: 0.8rem /* 60/75 */ 0 0.4rem /* 30/75 */;

      .van-icon {
        border-color: #fdb428;
      }

      span {
        vertical-align: top;
        display: inline-block;
        line-height: 0.53333rem;
        color: #999;
        font-size: 0.32rem /* 24/75 */;
      }

      a {
        vertical-align: top;
        display: inline-block;
        line-height: 0.53333rem;
        color: #fdb428;
        font-size: 0.32rem /* 24/75 */;
      }
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

    .no-account {
      margin-top: 0.2667rem /* 20/75 */;
      text-align: center;
      color: #999;
      font-size: 0.32rem /* 24/75 */;

      a {
        color: #fdb428;
        font-size: 0.32rem /* 24/75 */;
      }
    }
  }
}
</style>
