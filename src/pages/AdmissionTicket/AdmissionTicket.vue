<template>
  <div style="position: relative">
    <common-header title="入场券" bg="#fff" />
    <div class="headRight" @click="guize = true">购买须知</div>
    <div v-for="(item, index) in dataList" :key="index">
      <div class="content">
        <div class="leftTop">{{ item.card_name }}</div>
        <!-- <div class="leftBottom">剩余{{ item.time }}张</div> -->
        <div class="leftBottom">{{ item.user_level }}</div>
        <span class="rightTop">{{ item.time }}天</span>
        <span class="rightBottom">￥{{ item.money }}</span>
      </div>
      <div style="width: 100%; text-align: center">
        <button class="buttonBuy" @click="sureItem(item)">
          {{ item.id == item.uservipid ? "立即续费" : "立即抢购" }}
        </button>
      </div>
    </div>
    <div class="mask" v-show="modelShow">
      <div class="model" @click="modelShow = false"></div>
      <div class="firstCont">
        <div class="first">
          <!-- <img class="right" src="../../../static/avatar.jpg" alt="" /> -->
          <div class="right" @click="modelShow = false">×</div>
          <span>立即支付</span>
        </div>
        <div class="second">
          <div class="payType">支付方式</div>
          <div class="payList">
            <img src="" alt="" />
            <span
              >余额支付<span style="color: #cdb4b8"
                >（可用￥{{ money }}）</span
              ></span
            >
          </div>
          <div
            class="immediately"
            :style="'background:' + sysColor"
            @click="buy"
          >
            立即支付
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="guize">
      <div class="model" @click="guize = false"></div>
      <div class="secondCont">
        <div class="first">
          <div class="right" @click="guize = false">×</div>
          <span>购买须知</span>
        </div>
        <div class="second">
          <div>
            <p style="color: #989898">
              <span class="red">【初级入场券】</span
              >普通会员自购买首张起，即成为“普通会员”；在
              <span class="red">【初级入场券】</span
              >有效期内，可参与所有委拍专场和预售专区的抢拍，每天有
              <span class="red">5</span> 次提交订单机会，同时每天有<span
                class="red"
              >
                5</span
              >
              单转拍资格；自<span class="red">【初级入场券】</span
              >生效起，会员体验期自动结束。
            </p>
            <p>为不影响您入场抢拍，请您及时或提前购券续期。</p>
            <p>----------------------------------------</p>
            <p>
              <span class="red">【高级入场券】</span
              >是普通会员才可以购买的入场券，在<span class="red"
                >【高级入场券】</span
              >有效期内，会员可以<span class="red">提前30分钟</span
              >进场，并可以时时不停抢拍，每天有<span class="red"> 10 </span
              >次提交订单的机会，同时每天有<span class="red"> 10</span>
              次转拍资格。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog, Toast } from "vant";
export default {
  name: "list",
  data() {
    return {
      memberNum: 500,
      VIPNum: 100,
      dataList: [],
      modelShow: false,
      guize: false,
      sysColor: "#c8525d",
      money: 0,
      sure: {},
      userInfo: {},
    };
  },
  created() {
    setTimeout(() => {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.getList();
    this.getPayMoney();
    this.getuserinfo();
  },
  methods: {
    getPayMoney() {
      this.$api.finance().then((res) => {
        console.log(res);
        this.money = res.data.drawMoney;
        // Toast(res.msg);
      });
    },
    buy(num) {
      Dialog.confirm({
        title: "确认购买？",
        message: "",
      }).then(() => {
        // var userId = JSON.parse(localStorage.getItem("USER")).userId;
        var userId = "";
        if (localStorage.getItem("userInfo") == undefined) {
          userId = JSON.parse(localStorage.getItem("USER")).userId;
        } else {
          userId = JSON.parse(localStorage.getItem("userInfo")).userId;
        }
        this.$api
          .payCard({ userId: userId, card_id: this.sure.id })
          .then((res) => {
            if (res.msg == "您的余额不足，请先充值" && res.status == -1) {
              Dialog.confirm({
                title: "余额不足",
                message: "您的余额不足，请先充值?",
              }).then(() => {
                this.$router.push({ path: "/rechargetype" });
              });
            } else {
              Toast(res.msg);
              this.$router.push({ path: "/my" });
            }
          });
      });
    },
    getList() {
      this.$api.cardlist().then((res) => {
        console.log(res);
        this.dataList = res.data;
        // Toast(res.msg);
      });
    },
    getuserinfo() {
      var that = this;
      that.$api.userinfo().then((res) => {
        console.log(res);
        if (res.status == 1) {
          that.userInfo = res.data;
        }
      });
    },
    sureItem(item) {
      if (item.id == 4) {
        if (this.userInfo.vip == 0) {
          Toast('必须先成为普通会员！')
        }else if(this.userInfo.vip == 3){
          this.modelShow = true;
          this.sure = item;
        }else if (this.userInfo.vip == 4) {
          this.modelShow = true;
          this.sure = item;
        }
      } else {
        if (this.userInfo.vip == 0) {
          this.modelShow = true;
          this.sure = item;
        }else if(this.userInfo.vip == 3){
          this.modelShow = true;
          this.sure = item;
        }else if (this.userInfo.vip == 4) {
          Toast('高级会员未到期，不能购买！')
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 0.3rem;
  color: #fff;
  background: #c8525d;
  border-radius: 0.4rem;
  display: flex;
  height: 3rem;
  position: relative;
}
.leftTop {
  font-size: 0.7rem;
  position: absolute;
  top: 0.486rem;
  left: 0.5rem;
}
.leftBottom {
  font-size: 0.35rem;
  position: absolute;
  bottom: 0.51rem;
  left: 0.5rem;
}
.rightTop {
  font-size: 0.35rem;
  right: 0;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
}
.rightBottom {
  font-size: 0.55rem;
  position: absolute;
  bottom: 0.3rem;
  right: 0.4rem;
}
.buttonBuy {
  margin: 0 auto;
  background: #fff;
  border: 0.02rem solid #c8525d;
  color: #c8525d;
  border-radius: 2rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.4rem;
}
.mask {
  position: fixed;
  width: 100%;
  top: 0;
  // height: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  .model {
    height: 100%;
    width: 100%;
    background: rgba(122, 122, 122, 0.459);
  }
  .firstCont {
    position: fixed;
    background: #fff;
    width: 100%;
    text-align: center;
    bottom: 0;
    .first {
      font-size: 0.4rem;
      height: 0.9rem;
      line-height: 0.9rem;
      .right {
        width: 0.9rem;
        height: 0.9rem;
        float: right;
        top: -0.1rem;
      }
    }

    .second {
      text-align: left;
      font-size: 0.45rem;
      .payType {
        height: 1.2rem;
        line-height: 1.2rem;
        padding-left: 0.2rem;
        font-size: 0.44rem;
      }
      .payList {
        height: 1.2rem;
        line-height: 1.2rem;
        padding-left: 0.2rem;
        font-size: 0.42rem;
      }
      .immediately {
        text-align: center;
        font-size: 0.5rem;
        width: 100%;
        height: 1.4rem;
        line-height: 1.4rem;
        color: #fff;
      }
    }
  }
}
.headRight {
  position: absolute;
  top: 0.3rem;
  z-index: 999;
  right: 0.3rem;
  font-size: 0.4rem;
}
.secondCont {
  position: fixed;
  background: #fff;
  width: 80%;
  top: 4.2rem;
  left: 10%;
  margin: 0 auto;
  text-align: center;
  font-size: 0.6rem;
  .right {
    width: 0.9rem;
    height: 0.9rem;
    float: right;
    top: -0.1rem;
  }
  .second {
    text-align: left;
    padding: 0.3rem;
    font-size: 0.4rem;
  }
}
.red {
  color: #a3272f;
}
</style>