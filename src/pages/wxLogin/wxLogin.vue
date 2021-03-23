<template>
  <button type="primary" @click="handLogin()">微信授权登录</button>
</template>

<script>
import axios from "axios";
import configObj from "@/http/config";
export default {
  data() {
    return {
      code: "", // 前端获取 code 传给后端调用相应接口
    };
  },
  created() {
    // 从 window.location.href 中截取 code 并且赋值
    if (window.location.href.indexOf("CSDN_state") !== -1) {
      // 此方法仅供参考！！！
      this.code = window.location.href
        .split("?")[1]
        .split("=")[1]
        .split("&")[0];
    }

    if (this.code) {
      // 存在 code 直接调用接口
      var invite = this.$router.query.invite;
      var data = { code: this.code, invite: invite };
      this.handGetUserInfo(data);
    }
  },
  methods: {
    handLogin() {
      // 重定向地址重定到当前页面，在路径获取 code
      const hrefUrl = window.location.href;
      if (this.code === "") {
        window.location.href = `
						https://open.weixin.qq.com/connect/oauth2/authorize
						?appid=wx1f648303799a12ba
						&redirect_uri=${encodeURIComponent(hrefUrl)}
						&response_type=code
						&scope=snsapi_userinfo
						&state=CSDN_state#wechat_redirect
					`;
      }
    },
    handGetUserInfo(data) {
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
      // 调用后端接口，参数为 code 剩下工作量交给后端即可
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
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("TOKEN", res.data.token);
          if (res.data.is_bind == 0) {
            this.$router.push({ path: "/register" });
          } else {
            this.$router.push({ path: "/my" });
          }
        })
        .catch((res) => {
          console.log(res);
          reject();
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>

