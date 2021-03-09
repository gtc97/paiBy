<template>
  <div class="container">
    <HomeHeader/>
    <HomeBanner :banner-list="bannerList"/>
    <HomeBroadcast/>
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
      bannerList: []
    }
  },
  mounted() {
    this.getList()
    this.getBannerList()
  },
  methods: {
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
</style>

