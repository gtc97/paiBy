<template>
  <div>
    <common-header title="积分兑换" bg="#fff" />
    
    <div class="first" :style="'background:' + sysColor">
      <!-- <div class="title">我的银元</div> -->
      <div class="content">
        <div class="money">
          <div class="moneyTit">{{money}}</div>
          <!-- <div class="text">当前可用{{ integral }}</div> -->
        </div>
        <div class="textIn">
          <span>
           <!-- <router-link to="/SilverBack" style="color:#fff">查看明细</router-link> -->
          </span>
        </div>
      </div>
      <!-- <span class="right"><router-link to="/rakeback" style="color:#fff">明细</router-link></span> -->
    </div>
    <!-- <div class="second">
        <button :style="'background:' + sysColor "><router-link to="/convertIntegral" style="color:#fff">兑换</router-link></button>
    </div> -->
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: "list",
  data() {
    return {
      show: false,
      rewardInfo: {},
      sysColor: '#fdb428',
      money:'0.00',
      integral:'0.00',
    };
  },
  created(){
    this.getList()
    this.getUserInfo()
  },
  methods: {
    getList(){
      this.$api.cardlist().then((res) => {
        console.log(res);
        this.dataList = res.data
        // Toast(res.msg);
      });
    },
    getUserInfo(){
      this.$api.finance().then((res) => {
        this.money = res.data.credit2
      })
    },
  },
};
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
        color: #fff;
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