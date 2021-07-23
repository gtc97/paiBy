<template>
  <div class="wallet-info">
    <div class="info-list">
      <h4 class="list-title">提现申请（未入账）</h4>
      <ul class="info-des">
        <li v-for="item of noRecordedData" :key="item.id" class="info-des-item">
          <div class="item-left">
            <p class="event-title">{{ printTypeText(item.type) }}</p>
            <p class="event-time">{{ item.createTime }}</p>
          </div>
          <div class="itme-right">+{{ item.money }}</div>
        </li>
        <!-- <li class="info-des-item">
          <div class="item-left">
            <p class="event-title">提现到支付宝</p>
            <p class="event-time">2020.5.20 12:12</p>
          </div>
          <div class="itme-right">-123.00</div>
        </li> -->
      </ul>
    </div>
    <div class="info-list">
      <h4 class="list-title">近期账单（已入账）</h4>
      <ul class="info-des">
        <li v-for="item of recordedData" :key="item.id" class="info-des-item">
          <div class="item-left">
            <p class="event-title">{{ printTypeText(item.type) }}</p>
            <p class="event-time">{{ item.checkTime }}</p>
          </div>
          <div class="itme-right">+{{ item.money }}</div>
        </li>
        <!-- <li class="info-des-item">
          <div class="item-left">
            <p class="event-title">提现到支付宝</p>
            <p class="event-time">2020.5.20 12:12</p>
          </div>
          <div class="itme-right">-123.00</div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WalletInfo',
  props: {
    recordedData: {
      type: Array,
      default() {
        return {}
      }
    },
    noRecordedData: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  methods: {
    printTypeText(type) {
      let text = ''
      switch (type) {

        case 1:
          text = '银行卡'
          break
        case 2:
          text = '支付宝'
          break
        case 3:
          text = '微信'
          break
      }
      return text
    }
  }
}
</script>

<style lang="less" scoped>
.wallet-info {
  padding-bottom: .4rem /* 30/75 */;
  .info-list {
    .list-title {
      border-bottom: 1px solid #ddd;
      height: 1.2rem /* 90/75 */;
      line-height: 1.2rem /* 90/75 */;
      font-size: 0.4267rem /* 32/75 */;
      font-weight: bold;
      color: #333;
    }
    .info-des {
      .info-des-item {
        border-bottom: 1px solid #ddd;
        height: 1.5733rem /* 118/75 */;
        display: flex;
        .item-left {
          box-sizing: border-box;
          height: 100%;
          padding-top: .3467rem /* 26/75 */;
          flex: 1;
          .event-title{
            height: .5467rem /* 41/75 */;
            font-size: .32rem /* 24/75 */;
            color: #333;
          }
          .event-time{
            font-size: .2933rem /* 22/75 */;
            color: #999;
          }
        }
        .itme-right {
          line-height: 1.5733rem /* 118/75 */;
          font-size: .48rem /* 36/75 */;
          color: #ED3017;
          text-align: right;
          flex: 1;
        }
      }
    }
  }
}
</style>
