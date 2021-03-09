<template>
  <div class="container">
    <GoodsHeader/>
    <GoodsItem :goods-list="goodsList"/>
  </div>
</template>

<script>
import GoodsHeader from './components/GoodsHeader'
import GoodsItem from './components/GoodsItem'
export default {
  name: 'Goods',
  components: {
    GoodsHeader,
    GoodsItem
  },
  data() {
    return {
      goodsList: []
    }
  },
  mounted() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      this.$api.goodsList({ catId: this.$route.query.type }).then(res => {
        this.goodsList = res.data
        console.log(res)
      })
    }
  }
}
</script>
