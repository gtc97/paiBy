<template>
  <div class="container">
    <common-header title="风险提示" bg="#fff" />
    <div class="content">
      <h2 class="title">c2c个人支付风险</h2>
      <p>温馨提示：</p>
      <p>线下付款时，不推荐您使用花呗或信用卡付款，有政策违规风险，由此造成的个人损失，后果自担，请您谨慎操作！</p>
      <p>线下收款时，不推荐您使用商家收款码收款，面临被第三方支付公司直接扣除收款手续费的风险，由此造成的个人损失，后果自担，请您谨慎操作！</p>
      <p>1.用户在委托转卖、购买商品的支付方式为买家个人对卖家个人的支付方式。卖家需向买家提供实名认证的个人微信、支付宝、银行账户等支付方式。</p>
      <p>2.买家在付款的时候，请核实卖家的信息是否为真实信息，是否是为实名认证，是否信息正确。确认信息无误后，方可向卖家付款。</p>
      <p>3.在付款过程中，若发现卖家的账号异常或信息未实名认证，请谨慎付款。一旦付款，所造成的经济损失，均由买家自行承担，与本平台无关。</p>
      <p>4.买家付款后，卖家并未收到款，请与卖家电话或微信等方式沟通协商，提供的付款信息是否错误或账户异常等。若沟通无效或引起财产纠纷，可以联系本平台官方客服(微信baozihaochima)介入,进行协助调解。</p>
      <p>5.买家付款后，卖家并未发货，请与卖家电话或微信等方式沟通协商，若卖家依旧不点击“我已收款”，请联系本平台介入进行查明原因，并协调处理。</p>
      <p>6.以上所有的支付行为，均为用户自愿行为，本平台不收取任何的费用。若出现任何支付风险，造成财产经济损失，均由客户自行承担，本平台协助协调或协助司法机关追究违约方，但本平台不承担因C2C自由交易带来的财产损失的连带责任。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RiskTips'
}
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  .content {
    padding: .2667rem /* 20/75 */ 0.4rem /* 30/75 */ 0;
    .title {
      font-weight: bold;
      padding: 0.1333rem /* 10/75 */ 0;
      font-size: 0.4267rem /* 32/75 */;
      color: #333;
      text-align: center;
    }
    p {
      margin-top: .1333rem /* 10/75 */;
      text-indent: .4267rem /* 32/75 */;
      font-size: 0.3733rem /* 28/75 */;
      line-height: .6133rem /* 46/75 */;
      color: #444;
    }
  }
}
</style>
