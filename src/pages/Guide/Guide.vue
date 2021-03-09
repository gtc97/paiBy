<template>
  <div class="container">
    <common-header title="用户指南" bg="#fff" />
    <div class="content">
      <h2 class="title">用户指南</h2>
      <p>用户指南如使用中遇到问题请联系客服，更多信息可关注官方微信公众号“玺之斋艺术文化”或扫码进群了解详情。</p>
      <h3 class="title">《用户注册流程》</h3>
      <p>第一步：扫码或关注公众号进入平台“会员中心</p>
      <p>第二步：点击“登录/注册”</p>
      <p>第三步：进入到注册页面依次填写信息</p>
      <p>第四步：填写邀请码（如没有邀请人可无需填写）</p>
      <p>第五步：点击“确认”</p>
      <p>第六步：请详细阅读《注册协议》中的内容</p>
      <p>第七步：认同内容请点击《注册协议》中“我同意”完成注册。</p>
      <p>
        第八步：回到“会员中心”页面，点击《风险提示》及《拍卖规则》，仔细阅读内容。
        注意：如果有邀请人，请如实填写邀请人编码；如无邀请人无需填写邀请码。填写邀请码仅在初次注册时可填写，后期不能修改或补填。另外，请认真阅读《注册协议》以及个人中心中的《风险提示》及《拍卖规则》内容，一旦使用平台功能，将默认您知悉并理解《注册协议》和《风险提示》及《拍卖规则》中的所有内容。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guide'
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
      font-size: 0.3733rem /* 28/75 */;
      line-height: 0.5333rem /* 40/75 */;
      color: #444;
    }
  }
}
</style>
