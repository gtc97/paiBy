<template>
  <div class="container">
    <common-header title="" bg="transparent" />
    <div class="qr-code-wrap tc">
      <!-- <div class="invite-title">邀请码</div> -->
      <div>
        <p class="invite-code"></p>
        <!-- {{ inviteCode }} -->
        <div id="qrcode" class="qr-code"></div>
      </div>
      <!-- <p class="tips">扫码关注加入我们</p> -->
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "Invitation",
  components: { QRCode },
  data() {
    return {
      inviteCode: JSON.parse(localStorage.getItem("USER")).inviteCode,
      link:
        window.location.protocol +
        "//" +
        window.location.host +
        "/#/register?invite=",
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.qrcode();
    });
  },
  methods: {
    //  生成二维码
    qrcode() {
      new QRCode("qrcode", {
        width: 150,
        height: 150,
        text: this.link + this.inviteCode, // 二维码内容,
        render: "table",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  background-size: 100%;
  // background: url("../../../static/bg.jpg") no-repeat;
  background: url("../../../static/back.jpg") no-repeat;
  background-color: #E2F0E5;
  background-size: 100%;
  #qrcode {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qr-code-wrap {
    overflow: hidden;
    margin: auto;
    width: 9.2rem /* 429/75 */;
    height: 11rem /* 636/75 */;
    // background-color: #fff;
    .invite-title {
      margin-top: 0.48rem /* 36/75 */;
      color: #333;
      font-size: 0.48rem /* 36/75 */;
    }
    .invite-code {
      margin-top: 0.0667rem /* 5/75 */;
      color: #fc6a4f;
      font-size: 0.64rem /* 48/75 */;
      margin-top: 6rem;
    }
    .tips {
      margin-top: 0.4rem /* 30/75 */;
      color: #999;
      font-size: 0.32rem /* 24/75 */;
    }
  }
}
</style>
