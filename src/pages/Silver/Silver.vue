<template>
  <div class="container">
    <common-header title="我的银元" :bg="sysColor" style="color:#fff"/>
    <div class="first" :style="'background:' + sysColor">
      <!-- <div class="title">我的银元</div> -->
      <div class="content">
        <div class="money">
          <div class="moneyTit">{{money}}</div>
        </div>
        <div class="textIn">
          <span>
           <router-link to="/SilverBack" style="color:#fff">查看明细</router-link>
          </span>
        </div>
      </div>
      <!-- <span class="right"><router-link to="/rakeback" style="color:#fff">明细</router-link></span> -->
    </div>
    <div class="second">
        <button :style="'background:' + sysColor"><router-link to="/SilverGive" style="color:#fff">转增</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RewardsNew',
  data() {
    return {
      show: false,
      rewardInfo: {},
      sysColor: '#F0721E',
      money:'0.00',
    }
  },
  mounted() {
      setTimeout(() => {
          this.sysColor = localStorage.getItem('styleColor')
      }, 100);
    this.getSilver()
  },
  methods: {
    // 获取我的佣金数额
    getSilver() {
      this.$api.finance().then((res) => {
        this.money = res.data.credit1
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .container {
    background: #fff;
  }
  .first{

    padding: 0.1rem 0.8rem;
    font-size: 0.5rem;
    color: #fff;
    position: relative;
    .right{
      position: absolute;
      top: 0.08rem;
      right: 0.08rem;
      font-size: 0.39rem;
    }
    .money{
      display: grid;
      text-align:center;
      .moneyTit{
        font-size: 0.8rem;
      }
      button{
        border:0.02rem solid #fff;
        background: transparent;
        padding: 0.1rem 1rem;
        border-radius: 0.8rem;
        font-size: 0.4rem;
      }
    }
    .title{
      margin: 0.2rem 0.8rem;
      text-align: center;
    }
    .textIn{
          text-align: center;
          margin: 0.6rem 0 0.8rem 0 ;
      img{
        height: 0.8rem;
        width: 0.8rem;
      }
    }
  }
  .second{
      width: 100%;
      text-align: center;
      margin: 0 auto;
      padding-top: 1.5rem;
      button{
          font-size: 0.4rem;
          padding: 0.3rem 1.5rem;
          border-radius: 0.3rem;
          color: #fff,
      }
  }
  .van-nav-bar__title{
      color:#fff;
  }
</style>
