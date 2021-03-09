<template>
  <div class="container">
    <OrderHeader/>
    <OrderInner :address="address" :good-details="goodDetails" :user-pay-info="userPayInfo"/>
  </div>
</template>

<script>
import OrderHeader from './components/OrderHeader'
import OrderInner from './components/OrderInner'

export default {
  name: 'Order',
  components: {
    OrderHeader,
    OrderInner
  },
  data() {
    return {
      address: {},
      goodDetails: [],
      userPayInfo: []
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.getDefaultAddress()
    this.queryOrder(this.$route.query.id)
  },
  methods: {
    // 获取默认地址
    getDefaultAddress() {
      this.$api.defaultAddress().then((res) => {
        this.address = res.data
        // console.log(res)
      })
    },
    // 查询订单
    queryOrder(id) {
      this.$api.queryOrder({ ids: id }).then(res => {
        if (res.status === -1 || res.data.length === 0) {
          this.$router.go(-1)
          return
        }
        this.goodDetails = res.data
        // 获取用户支付信息
        this.$api.getUserPayInfo({ userId: res.data[0].userId, goodsId: res.data[0].goodsId }).then(res2 => {
          this.userPayInfo = res2.data
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
