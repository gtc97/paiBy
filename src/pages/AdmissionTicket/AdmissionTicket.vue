<template>
  <div>
    <common-header title="入场券" bg="#fff" />
    <div v-for="(item, index) in dataList" :key="index">
      <div class="content">
        <div class="leftTop">{{ item.card_name }}</div>
        <!-- <div class="leftBottom">剩余{{ item.time }}张</div> -->
        <div class="leftBottom">{{ item.user_level }}</div>
        <span class="rightTop">{{ item.time }}天</span>
        <span class="rightBottom">￥{{ item.money }}</span>
      </div>
      <div style="width: 100%; text-align: center">
        <button class="buttonBuy" @click="sureItem(item)">立即抢购</button>
      </div>
    </div>
    <div class="mask" v-show="modelShow">
      <div class="model" @click="modelShow = false"></div>
      <div class="firstCont">
        <div class="first">
          <!-- <img class="right" src="../../../static/avatar.jpg" alt="" /> -->
          <div class="right" @click="modelShow = false">x</div>
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
          <div class="immediately" :style="'background:' + sysColor" @click="buy">
            立即支付
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "list",
  data() {
    return {
      memberNum: 500,
      VIPNum: 100,
      dataList: [],
      modelShow: false,
      sysColor: "#FDDD9B",
      money: 0,
      sure: {},
    };
  },
  created() {
    setTimeout(() => {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.getList();
    this.getPayMoney();
  },
  methods: {
    getPayMoney() {
      this.$api.finance().then((res) => {
        console.log(res);
        this.money = res.data.drawMoney;
        Toast(res.msg);
      });
    },
    buy(num) {
      var userId = JSON.parse(localStorage.getItem("USER")).userId;
      // if (num == 1) {
      //   card_id = 3;
      // } else {
      //   card_id = 3;
      // }
      // console.log({ userId: userId, card_id: card_id });
      this.$api.payCard({ userId: userId, card_id: this.sure.id }).then((res) => {
        console.log(res);
        Toast(res.msg);
      });
    },
    getList() {
      this.$api.cardlist().then((res) => {
        console.log(res);
        this.dataList = res.data;
        Toast(res.msg);
      });
    },
    sureItem(item){
      this.modelShow = true
      this.sure = item
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
  // width: 100%;
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
</style>