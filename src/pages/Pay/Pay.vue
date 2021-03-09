<template>
  <div class="container">
    <common-header title="我的买单" bg="#f5f5f5"/>
    <PayTab :order-list="orderList"/>
  </div>
</template>

<script>
import PayTab from './components/PayTab'
export default {
  name: 'Pay',
  components: {
    PayTab
  },
  data() {
    return {
      orderList: []
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.$api.orderList().then(res => {
        this.orderList = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
