<template>
  <div>
    <div class="container" id="poster" v-if="!posterDataUrl">
      <common-header title="" bg="transparent" />
      <div class="qr-code-wrap tc">
        <!-- <div class="invite-title">邀请码</div> -->
        <div>
          <p class="invite-code">{{ inviteCode }}</p>
          <div id="qrcode" class="qr-code"></div>
        </div>
        <!-- <p class="tips">扫码关注加入我们</p> -->
      </div>
    </div>
    <div v-else>
      <common-header style="position: fixed;width: 100%;" title="邀请好友" bg="transparent" />
      <img :src="posterDataUrl" alt="" />
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { html2canvas } from "html2canvas";
export default {
  name: "Invitation",
  components: { QRCode },
  data() {
    return {
      // inviteCode: JSON.parse(localStorage.getItem("USER")).inviteCode,
      inviteCode: JSON.parse(localStorage.getItem("userInfo")).inviteCode,
      link: window.location.protocol + "//" + window.location.host + "/#/?invite=",
      posterDataUrl: "",
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
      const W = document.body.clientWidth;
      const rate = 750.0 / W;
      const widthNum = 250 / rate;
      new QRCode("qrcode", {
        width: widthNum,
        height: widthNum,
        text: this.link + this.inviteCode, // 二维码内容,
        render: "table",
      });
      this.createPicture();
    },
    createPicture() {
      let poster = document.getElementById("poster");
      new html2canvas(poster,{dpi: 300,scale: 1}).then((canvas) => {
        let oImg = new Image();
        oImg.src = canvas.toDataURL();
        this.posterDataUrl = oImg.src;
        console.log(oImg.src);
      });
      // new html2canvas(poster, {
      //   onrendered: function(canvas) {
      //     console.log(canvas)
      //     let oImg = new Image();
      //     oImg.src = canvas.toDataURL()
      //     this.posterDataUrl = oImg.src
      //     // document.body.appendChild(canvas);
      //   },
      // width: 300,
      // height: 300
      // });
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
  background-color: #e2f0e5;
  background-size: 100%;
  #qrcode {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.3rem;
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
      // margin-top: 0.0667rem /* 5/75 */;
      color: #fff;//#fc6a4f;
      font-size: 0.68rem /* 48/75 */;
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
