<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
import configObj from "@/http/config";
export default {
  created() {
    var token = localStorage.getItem("TOKEN");
    this.creat();
    if(!token){
      this.getWX();
    }
    this.getColor();
  },
  methods: {
    creat() {
      var useragent = navigator.userAgent;
      if (useragent.match(/MicroMessenger/i) != "MicroMessenger") {
        window.location.href = "../../static/wxError.html"; //若不是微信浏览器，跳转到温馨error页面
        return;
      }
    },
    getWX() {
      var to = window.location.href;
      var token = localStorage.getItem("TOKEN");
      let num1 = to.indexOf("code=");
      let num2 = to.indexOf("&state=");
      var code = '';
      if(num1 !== -1 && num2 !== -1){
        code = to.slice(num1 + 5, num2)
      }
      var invite = this.$route.query.invite;
      var userName = "";
      localStorage.setItem("invite", invite);
      if (token == null && num1 == -1 && num2 == -1 ) {
        var SCOPE = "snsapi_userinfo";
        var STATE = userName;
        var urls = "http://pmapi.chaoyuephp.com"; // window.location.href; // window.location.href  "http://pmapi.chaoyuephp.com"
        var url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f648303799a12ba&redirect_uri=" +
          urls +
          "&response_type=code&scope=" +
          SCOPE +
          "&state=" +
          STATE +
          "#wechat_redirect";
        console.log(url);
        // 请求微信授权，获取code
        window.location.href = url;
        return;
      } else if(token == null && code !== '' && code !== undefined && code != null ){
        this.getget({ invite: invite, code: code });
      }else{
        this.$router.push({ name: "会员中心" });
      }
    },
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    delCodeandstate(to) {
      //函数作用：去除url中的code和state
      let path = "";
      for (let i in to.query) {
        if (i != "code" && i != "state") {
          path = path + "&" + i + "=" + to.query[i];
        }
      }
      path = path == "" ? "" : path.substring(1, path.length);
      path = path == "" ? "" : "/?" + path;
      return path;
    },
    getget(data) {
      console.log(typeof data);
      var url = window.location.href
      const params = "";
      const config = {
        headers: {
          // 添加请求头
          "Content-Type": "multipart/form-data",
        },
      };
      if (!data.invite) {
        data.invite = "";
      }
      axios
        .get(
          configObj.baseURL +
            "/login/wxlogin?code=" +
            data.code +
            "&invite=" +
            data.invite,
          params,
          config
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          console.log("TOKEN",res.data.data.token)
          localStorage.setItem("TOKEN", res.data.data.token);
          debugger
          if (res.data.data.is_bind === 1) {
            // url = url.substring(0, url.indexOf('?'))
            // debugger
            // location.href = url + '/#/my'
            this.$router.push({ name: "会员中心" });
          } else {
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
  },
};
</script>