<template>
  <div class="container">
    <HomeHeader/>
    <HomeBanner :banner-list="bannerList"/>
    <HomeBroadcast/>
    <div class="userInfo">
      <div class="left">
        <img src="../../../static/avatar.jpg" alt="">
      </div>
      <div class="right">
        <div>{{userInfo.userName || userInfo.nickname || '游客'}}</div>
        <img src="../../../static/location_icon1.png" alt="">
        <span style="font-size: 0.355rem;color:#D8413F;">{{userInfo.vip == 0 ? '普通用户' : 'VIP用户'}}</span>
      </div>
    </div>
    <HomeAuction :goods-cat-list="goodsCatList"/>
  </div>
</template>
<script>
import HomeHeader from './components/HomeHeader'
import HomeBanner from './components/HomeBanner'
import HomeBroadcast from './components/HomeBroadcast'
import HomeAuction from './components/HomeAuction'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeBanner,
    HomeBroadcast,
    HomeAuction
  },
  data() {
    return {
      goodsCatList: [],
      bannerList: [],
      titShow: false,
      userInfo:{},
      vipInfo:{},
    }
  },
  created(){
    this.userInfo = localStorage.getItem('USER')
    this.getuserinfo()
  },
  mounted() {
    this.getList()
    this.getBannerList()
    // this.getCkpayinfo()
  },
  methods: {
    getuserinfo(){
      var that = this
      that.$api.userinfo().then((res) => {
        console.log(res)
        if(res.status == 1){
          that.userInfo = res.data
        }else{
          that.userInfo = {name:'游客',vip:0}
        }
      })
    },
    getCkpayinfo(){
      this.$api.ckpayinfo().then((res) => {
        if(res.data.msg == '未设置收款信息' && res.data.status == 1010){
          this.titShow = true
        }
      })
    },
    getBannerList() {
      this.$api.getBanner().then((res) => {
        this.bannerList = res.data
      })
    },
    getList() {
      this.$api.homeData().then(res => {
        this.goodsCatList = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    padding: 0 .4rem /* 30/75 */ .8rem /* 60/75 */;
  }
  .userInfo{
    display: flex;
    margin: 0.15rem 0 0.4rem 0;
    padding: 0 0.4rem 0.4rem 0.4rem;
    box-shadow: #000000 0.8rem;
    .left{
      height: 1.2rem;
      width: 1.2rem;
      img{
        border-radius: 50%;
      }
    }
    .right{
      display: flex;
      font-size: 0.5rem;
      line-height: 1.2rem;
      height: 1.2rem;
      div{
        margin: 0 0.4rem;
      }
      img{
        margin-right: 0.2rem;
        margin-top: 0.4rem;
        height: 0.45rem;
        width: 0.38rem;
      }
    }
  }
</style>

