<template>
  <div class="container">
    <!-- <common-header title="我的银元" :bg="sysColor" /> -->
    <div class="barrer">
      <van-nav-bar
        title="我的银币"
        :style="{ backgroundColor: sysColor  }"
        class="common-header"
        @click-left="handleBack"
        id="reset"
      >
        <template #left>
          <van-icon name="arrow-left" size="0.4rem" color="#333" />
        </template>
      </van-nav-bar>
    </div>
    <div class="first" :style="'background:' + sysColor">
      <div class="content">
        <div class="money">
          <div class="moneyTit">{{ money }}</div>
        </div>
        <div class="textIn">
          <span>
            <router-link to="/SilverBack" style="color: #fff"
              >查看明细</router-link
            >
          </span>
        </div>
      </div>
    </div>
    <div class="second">
      <router-link to="/SilverGive" style="color: #fff"
        ><button :style="'background:' + sysColor">转增</button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "RewardsNew",
  data() {
    return {
      show: false,
      rewardInfo: {},
      sysColor: "#bd2f3b",
      money: "0.00",
    };
  },
  mounted() {
    setTimeout(() => {
      this.sysColor = localStorage.getItem("styleColor");
    }, 100);
    this.getSilver();
  },
  methods: {
    // 返回上一层
    handleBack() {
      this.$router.go(-1);
    },
    // 获取我的佣金数额
    getSilver() {
      this.$api.finance().then((res) => {
        this.money = res.data.credit1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background: #fff;
}
.first {
  padding: 0.1rem 0.8rem;
  font-size: 0.5rem;
  color: #fff;
  position: relative;
  .right {
    position: absolute;
    top: 0.08rem;
    right: 0.08rem;
    font-size: 0.39rem;
  }
  .money {
    display: grid;
    text-align: center;
    .moneyTit {
      font-size: 0.8rem;
    }
    button {
      border: 0.02rem solid #fff;
      background: transparent;
      padding: 0.1rem 1rem;
      border-radius: 0.8rem;
      font-size: 0.4rem;
    }
  }
  .title {
    margin: 0.2rem 0.8rem;
    text-align: center;
  }
  .textIn {
    text-align: center;
    margin: 0.6rem 0 0.8rem 0;
    img {
      height: 0.8rem;
      width: 0.8rem;
    }
  }
}
.second {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding-top: 1.5rem;
  button {
    font-size: 0.4rem;
    padding: 0.3rem 1.5rem;
    border-radius: 0.3rem;
    color: #fff;
  }
}
</style>
<style>
#reset .van-ellipsis{
  color: #ffffff;
}
</style>
