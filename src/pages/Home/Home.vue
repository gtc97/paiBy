<template>
  <div>
    <HomeHeader/>
    <HomeBanner :banner-list="bannerList"/>
    <div  class="container">
      <HomeBroadcast/>
      <div class="userInfo">
        <div class="left">
          <img :src="userInfo.avater || '../../../static/avatar.jpg'" alt="">
        </div>
        <div class="right">
          <div>{{userInfo.userName || userInfo.nickname || '游客'}}</div>
          <img src="../../../static/huiyuan.png" alt="">
          <span style="font-size: 0.355rem;color:#D8413F;">{{userInfo.user_level || '普通用户'}}</span>
        </div>
      </div>
      <HomeAuction :goods-cat-list="goodsCatList"/>
    </div>
  </div>
</template>
<script>
import HomeHeader from './components/HomeHeader'
import HomeBanner from './components/HomeBanner'
import HomeBroadcast from './components/HomeBroadcast'
import HomeAuction from './components/HomeAuction'

import { Dialog } from 'vant'

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
    var token = localStorage.getItem("TOKEN");
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    var is_bind = this.userInfo.is_bind
    console.log(this.userInfo)
    console.log(is_bind)
    if (token && (is_bind == 0 || is_bind == null || is_bind == undefined )) {
      this.$router.push({ name: "Register" });
      return
    }
    this.getList()
    this.getuserinfo()
    this.getBannerList()
    this.getCkpayinfo()
  },
  methods: {
    // navTo(){
    //   window.location.href= 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg5MTU5ODQzNg==&scene=124&uin=&key=&devicetype=Windows+10+x64&version=63020170&lang=zh_CN&a8scene=7&fontgear=2'
    // },
    // getgunzhu() {
    //   var openid = JSON.parse(localStorage.getItem("userInfo")).openid;
    //   this.$api.isSubscribe({ openid: openid }).then((res) => {
    //     if (res.data.subscribe == 0) {
    //       this.modelShow = true;
    //     }
    //   });
    // },
    getuserinfo(){
      var that = this
      that.userInfo = {userName:'游客',vipName:'用户',userPhone:'',avater:''}
      that.$api.userinfo().then((res) => {
        console.log(res)
        if(res.status == 1){
          that.userInfo = res.data
        }else{
          that.userInfo = {userName:'游客',vipName:'用户',userPhone:'',avater:''}
        }
      })
    },
    getCkpayinfo(){
      var that = this
      this.$api.ckpayinfo().then((res) => {
        if(res.msg == '未设置收款信息'){
          this.titShow = true
          Dialog.confirm({
            title: '未设置收款信息',
            message: '您还没有设置收款信息,前去设置?'
          }).then(() => {
            that.$router.push({ name: "Seting" });
          })
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
        height: 0.4rem;
        width: 0.4rem;
      }
    }
  }

</style>  

