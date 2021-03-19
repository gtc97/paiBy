<template>
  <div class="container">
    <div class="first">
      <div class="title">我的佣金</div>
      <div class="content">
        <div class="money">
          <div class="moneyTit">{{money}}</div>
          <div>
            <button><router-link to="/withdrawalCommission" style="color:#fff">佣金提现</router-link></button>
          </div>
        </div>
        <div class="textIn">
          <img src="../../../static/ercode_icon.png" alt="">
          <span>
           <router-link to="/invitation" style="color:#fff">邀请码</router-link>
          </span>
        </div>
      </div>
      <span class="right"><router-link to="/rakeback" style="color:#fff">明细</router-link></span>
    </div>
    <div class="second">
      <div class="item">
        <div class="itemLeft">
          <span>邀请好友</span>
          <span style="color:#DF4C4C;font-size:0.5rem;">{{peopNum.friends_count}}人</span>
        </div>
        <div class="itemRight"><span><router-link to="/friends">好友明细>></router-link></span></div>
        <div style="clear: both;"></div>
      </div>
      <div class="item">
        <div class="itemLeft">
          <span>推荐奖励</span>
          <span style="color:#DF4C4C;font-size:0.5rem;">￥{{peopNum.invite_cashs}}</span>
        </div>
        <div class="itemRight"><span><router-link to="/rakeback">奖励明细>></router-link></span></div>
        <div style="clear: both;"></div>
      </div>
      <div class="item">
        <div class="itemLeft">
          <span>团队奖</span>
          <span style="color:#DF4C4C;font-size:0.5rem;">￥{{peopNum.order_cashs}}</span>
        </div>
        <div class="itemRight"><span><router-link to="/rakeback">奖金明细>></router-link></span></div>
        <div style="clear: both;"></div>
      </div>
      <div class="item">
        <div class="itemLeft">
          <span>团队业绩</span>
          <span style="color:#DF4C4C;font-size:0.5rem;">￥{{'0'}}</span>
        </div>
        <div class="itemRight"><span><router-link to="/rakeback">业绩明细>></router-link></span></div>
        <div style="clear: both;"></div>
      </div>
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
      sysColor:localStorage.getItem('styleColor'),
      money:'0.00',
      peopNum:{},
    }
  },
  mounted() {
    this.getShareReward()
    this.getyjinfo()
  },
  methods: {
    handleShowMask() {
      this.show = true
    },
    handleCloseMask() {
      this.show = false
    },
    // 获取分享奖励内容
    getShareReward() {
      this.$api.shareReward().then((res) => {
        this.rewardInfo = res.data
      })
    },
    getyjinfo(){
      this.$api.yjinfo().then((res) => {
        this.peopNum = res.data
      })
    },
    
    // handleShowMask() {
    //   this.$emit('showMask', true)
    // },
    handleBack() {
      this.$router.go(-1)
    },
    
    onSelect(item) {
      switch (item.name) {
        case '提现历史':
          this.$router.push('/')
          break

        case '常见问题':
          this.$router.push('/')
          break
      }
      this.$emit('closeMask')
      Toast(item.name)
    },
    onCancel() {
      Toast('取消')
      this.$emit('closeMask')
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    background: #F8F8F8;
    // height: 100%;
    // padding: 0 .4rem /* 30/75 */;
  }
  .first{
    background: crimson;
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
    position: relative;
    top: -0.8rem;
    margin: 0.2rem;
    padding: 0.3rem;
    background: #fff;
    border-radius: 0.2rem;
    font-size: 0.4rem;
    .item{
      padding: 0.4rem;
      margin: 0.3rem 0;
      background: #FFEFD9;
      border-radius: 0.4rem;
      .itemLeft{

      }
      .itemRight{
        float: right;
        // position: absolute;
        bottom: 0.5rem;
      }
    }
  }
</style>
