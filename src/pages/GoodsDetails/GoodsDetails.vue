<template>
  <div class="container">
    <common-header title="商品详情"/>
    <GoodsDetailsBanner :banner-imgs="goodDetails.goodsLogo" />
    <GoodsDetailsInfo :good-details="goodDetails" />
  </div>
</template>

<script>
import GoodsDetailsBanner from './Components/GoodsDetailsBanner'
import GoodsDetailsInfo from './Components/GoodsDetailsInfo'
export default {
  name: 'GoodsDetails',
  components: {
    GoodsDetailsBanner,
    GoodsDetailsInfo
  },
  data() {
    return {
      goodDetails: {}
    }
  },
  mounted() {
    this.getGoodsDetails(this.$route.params.id)
  },
  methods: {
    getGoodsDetails(id) {
      this.$api.goodsDetails({ id }).then(res => {
        this.goodDetails = res.data
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>