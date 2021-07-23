<template>
  <div class="container">
    <RegisterHeader />
    <RegisterInner />
    <div class="mask1" v-show="modelShow">
      <div class="model1"></div>
      <div class="firstCont1">
        <img src="../../../static/gzhLogo.jpg" alt="" />
        <div class="TitleText">请先关注,长按或扫码关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterHeader from "./components/RegisterHeader";
import RegisterInner from "./components/RegisterInner";
export default {
  name: "Register",
  components: {
    RegisterHeader,
    RegisterInner,
  },
  data() {
    return {
      modelShow: false,
    };
  },
  mounted() {
    this.getgunzhu();
  },
  methods: {
    getgunzhu() {
      var openid = JSON.parse(localStorage.getItem("userInfo")).openid;
      this.$api.isSubscribe({ openid: openid }).then((res) => {
        if (res.data.subscribe == 0) {
          this.modelShow = true;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 0.4rem /* 30/75 */;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.mask1 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  font-size: 0.5rem;
  text-align: center;
  padding: 0.2rem 0 0 0.2rem;
  font-weight: 600;
  color: rgb(189, 47, 59);
}
</style>
