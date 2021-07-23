<template>
  <div id="app">
    <div class="topStyle" v-if="modelShow" @click="modelGunZhuShow = true">
      您还未关注公众号，请点击关注
      <button class="buttonGunzhu" @click="navTo">前往关注</button>
    </div>
    <router-view />
    <div v-show="showMask" class="location" @click="navtTO">
      <img src="../static/home.png" alt="" />
      <span style="text-align: center; font-size: 0.25rem">首页</span>
    </div>
    <div class="mask1" v-show="modelGunZhuShow">
      <div class="model1" @click="modelGunZhuShow = false">×</div>
      <div class="firstCont1">
        <!-- <img src="../static/gzhLogo.jpg" alt="" /><button class="buttonGunzhu" @click="navTo">前往关注</button> -->
        <img src="../static/gzhLogo.jpg" alt="" />
        <div class="TitleText">请长按或扫码关注</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import configObj from "@/http/config";
var showMask = false;
export default {
  data() {
    return {
      showMask: showMask,
      modelShow: false,
      modelGunZhuShow: false,
    };
  },
  created() {
    this.creat();
    var token = localStorage.getItem("TOKEN");
    var to = window.location.href;
    if (localStorage.getItem("invite") == null && to.indexOf("invite=") != -1) {
      var numTo = to.indexOf("invite=");
      var string = to.slice(numTo + 7, numTo + 12);
      localStorage.setItem("invite", string);
    }
    if (!token) {
      this.getWX();
    } else {
      this.getget();
    }
    this.getColor();
    this.getShow();
    this.getgunzhu();
  },
  onshow() {
    this.getShow();
  },
  methods: {
    navTo() {
      window.location.href =
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg5MTU5ODQzNg==&scene=124&uin=&key=&devicetype=Windows+10+x64&version=63020170&lang=zh_CN&a8scene=7&fontgear=2";
    },
    getgunzhu() {
      var openid = JSON.parse(localStorage.getItem("userInfo")).openid;
      this.$api.isSubscribe({ openid: openid }).then((res) => {
        if (res.data.subscribe == 0) {
          this.modelShow = true;
        }
      });
    },
    creat() {
      var useragent = navigator.userAgent;
      if (useragent.match(/MicroMessenger/i) != "MicroMessenger") {
        window.location.href = "../../static/wxError.html"; //若不是微信浏览器，跳转到温馨error页面
        return;
      }
    },
    getWX() {
      var to = window.location.href;
      var invite = localStorage.getItem("invite");
      var token = localStorage.getItem("TOKEN");
      let num1 = to.indexOf("code=");
      let num2 = to.indexOf("&state=");
      var code = "";
      if (num1 !== -1 && num2 !== -1) {
        code = to.slice(num1 + 5, num2);
      }
      var userName = "";
      console.log("token", token, "num1", num1, "num2", num2);
      if (token == null && num1 == -1 && num2 == -1) {
        var SCOPE = "snsapi_userinfo";
        var STATE = userName;
        var urls = "http://pmapi.chaoyuephp.com" //"http://hj.chaoyuephp.com"; // window.location.href //"http://pmapi.chaoyuephp.com"; //; // window.location.href  "http://pmapi.chaoyuephp.com"
        // "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc4fc9c52231729c7&redirect_uri=" +
        urls = urls.split("?")[0];
        var url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f648303799a12ba&redirect_uri=" +
          urls +
          "&response_type=code&scope=" +
          SCOPE +
          "&state=" +
          STATE +
          "#wechat_redirect";

        // 请求微信授权，获取code
        window.location.href = url;
        return;
      } else if (code !== "" && code !== undefined && code != null) {
        this.getget({ invite: invite, code: code });
      } else {
        this.$router.push({ name: "Register" });
      }
    },
    getget(data) {
      console.log(typeof data);
      var url = window.location.href;
      const params = "";
      const config = {
        headers: {
          // 添加请求头
          "Content-Type": "multipart/form-data",
        },
      };
      var data1 = data;
      if (data1) {
        if (!data1.invite) {
          data.invite = "";
        }
      } else {
        return;
      }
      axios
        .get(
          configObj.baseURL +
            "/login/wxlogin?code=" +
            data1.code +
            "&invite=" +
            data1.invite,
          params,
          config
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          localStorage.setItem("TOKEN", res.data.data.token);
          if (res.data.data.is_bind == 1) {
            // localStorage.setItem('is_bind',1)
            this.$router.push({ name: "会员中心" });
          } else {
            // localStorage.setItem("is_bind", 0);
            this.$router.push({ name: "Register" });
          }
        })
        .catch((res) => {
          console.log(res);
          reject();
        });
    },
    getColor() {
      const params = new FormData();
      const config = {
        headers: {
          // 添加请求头
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(configObj.baseURL + "/Common/coloron", params, config)
        .then((res) => {
          localStorage.setItem("styleColor", res.data);
        })
        .catch(() => {
          localStorage.setItem("styleColor", "#fdb428");
          reject();
        });
    },
    getShow() {
      var invate = window.location.href; //
      if (
        invate.indexOf("Register") == -1 &&
        invate.indexOf("zhuceAgreement") == -1
      ) {
        this.showMask = true;
        showMask = true;
      } else {
        showMask = false;
        this.showMask = false;
      }
    },
    navtTO() {
      // var invate = window.location.href //
      // if(invate.indexOf('Register') == -1 && invate.indexOf('zhuceAgreement') == -1){
      this.$router.push({ name: "竞拍" });
      // }else{

      // }
    },
  },
};
</script>
<style>
.topStyle {
  /* background: rgb(189, 47, 59); */
  background: #000;
  opacity: 0.65;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  margin: 0 auto;
  height: 0.8rem;
  line-height: 0.8rem;
}
.buttonGunzhu {
  height: 0.6rem;
  line-height: 0.3rem;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  /* height: 100%; */
  font-size: 0.3rem;
  padding:0 0.1rem;
  border: 0.05rem solid #b41601;
  border-radius: 0.1rem;
  background: #b41601;
  color: #fff;
}
#app {
  width: 100%;
}
.van-empty__image {
  width: 100% !important;
  height: 5.26667rem !important;
}
.location {
  background: rgb(243, 243, 243);
  z-index: 999;
  position: fixed;
  bottom: 2.5rem;
  right: 0.2rem;
  padding: 0.3rem;
  border-radius: 50%;
  display: grid;
  height: 0.8rem;
  width: 0.8rem;
}
.location img {
  height: 0.8rem;
  width: 0.8rem;
  margin-top: -0.1rem;
}

.mask1 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.model1 {
  height: 100%;
  width: 100%;
  background: rgba(122, 122, 122, 0.459);
}
.firstCont1 {
  top: 20%;
  position: absolute;
  left: 15%;
  text-align: center;
  width: 70%;
  background: #fff;
}
.firstCont1 img {
  margin: 0 auto;
}

.TitleText {
  font-size: 0.6rem;
  text-align: center;
}
</style>