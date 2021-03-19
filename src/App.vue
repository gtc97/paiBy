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
    this.creat();
    this.getColor();
    // this.getWX()
  },
  methods: {
    creat(){
      var useragent = navigator.userAgent;
      if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
          window.location.href = "../../static/wxError.html";//若不是微信浏览器，跳转到温馨error页面
          return
      }
    },
    getWX(){
      // var isWXlogin = localStorage.getItem("WXlogin")
      var isWXlogin = localStorage.getItem('WXlogin')
      if(isWXlogin == null){
        localStorage.setItem("WXlogin",'微信授权')
        var url = configObj.baseURL + "/login/wxlogin"
        location.href = url
      }
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
          localStorage.setItem("styleColor", '#fdb428');
          reject();
        });
      // this.$api.getcolor().then((res) => {
      //   console.log(res)
      //   localStorage.setItem('styleColor',JSON.stringify(res))
      //   // localStorage.setItem("USER", JSON.stringify(userInfo));
      // });
    },
  },
};
</script>