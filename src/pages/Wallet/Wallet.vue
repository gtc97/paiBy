<template>
  <div class="container">
    <common-header title="我的钱包" bg="#f5f5f5"/>
    <WalletBalance :money="money"/>
    <WalletLink :money="money"/>
    <WalletInfo :recorded-data="recordedData" :no-recorded-data="noRecordedData"/>
  </div>
</template>

<script>
import WalletBalance from './Components/WalletBalance'
import WalletLink from './Components/WalletLink'
import WalletInfo from './Components/WalletInfo'
export default {
  name: 'Wallet',
  components: {
    WalletBalance,
    WalletLink,
    WalletInfo
  },
  data() {
    return {
      recordedData: [],
      noRecordedData: [],
      money: ''
    }
  },

  mounted() {
    this.getDrawHistory()
  },
  methods: {
    getDrawHistory() {
      this.$api.drawHistory().then((res) => {
        this.money = res.data.drawMoney
        console.log(res)
        this.recordedData = res.data.drawList.filter(x => x.status === 2)
        this.noRecordedData = res.data.drawList.filter(x => x.status === 1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0 .4rem /* 30/75 */;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
