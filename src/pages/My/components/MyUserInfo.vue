<template>
  <div style="background: #bd2f3b">
    <div class="user-info">
      <div class="avatar">
        <img :src="userInfo.avater || '../../../../static/avatar.jpg'" alt="" />
      </div>
      <div class="info">
        <div class="username">
          {{ userInfo.userName || "游客" }}
          <span style="font-size: 0.4rem; margin-left: 0.8rem">
            <img
              style="height: 0.5rem; width: 0.5rem"
              src="../../../../static/huiyuan.png"
              alt=""
            />
            <span>{{ userInfo.user_level || "普通用户" }}</span>
          </span>
        </div>
        <div class="phone-num">{{ userInfo.userPhone }}</div>
      </div>
      <div v-show="userInfo.cardID" class="is-attestation">已实名</div>
    </div>
    <div class="showId">
      <div>ID:{{ userInfo.userId }}</div>
      <div
        style="margin-left: 0.5rem; font-size: 0.4rem"
        @click="copy(userInfo.userId)"
      >
        复制
      </div>
    </div>
    <div class="moneyOut">
      <div class="money">
        <div class="money-list">
          <router-link to="/wallet">
            <div>￥{{ money.drawMoney }}</div>
            <div>余额</div>
          </router-link>
        </div>
        <div class="money-list">
          <router-link to="/rewardsNew">
            <div>￥{{ money.credit3 }}</div>
            <div>佣金</div>
          </router-link>
        </div>
        <div class="money-list">
          <router-link to="/Silver">
            <div>￥{{ money.credit1 }}</div>
            <div>银币</div>
          </router-link>
        </div>
        <div class="money-list">
          <router-link to="/integral">
            <div>{{ money.credit2 }}</div>
            <div>积分</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "MyUserInfo",
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      money: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.getUserMoney();
  },
  methods: {
    getUserInfo() {
      this.userInfo = {
        userName: "游客",
        vipName: "用户",
        userPhone: "",
        avater: "",
      };
      this.$api.userinfo().then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.userInfo = res.data;
          if (
            this.userInfo.avater == null &&
            this.userInfo.avater == undefined
          ) {
            this.userInfo.avater = "";
          }
          if (res.data.vip == 0) {
            this.userInfo.vipName = "普通用户";
          } else {
            this.userInfo.vipName = "体验会员";
          }
        } else {
          this.userInfo = {
            userName: "游客",
            vipName: "用户",
            userPhone: "",
            avater: "",
          };
        }
      });
    },
    getUserMoney() {
      this.$api.finance().then((res) => {
        if (res.status != 1) {
          Toast(res.msg);
          return;
        }
        this.money = res.data;
        console.log(res);
      });
    },
    copy(url) {
      var domUrl = document.createElement("input");
      domUrl.value = url;
      domUrl.id = "creatDom";
      document.body.appendChild(domUrl);
      domUrl.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      let creatDom = document.getElementById("creatDom");
      creatDom.parentNode.removeChild(creatDom);
      // alert("已复制好，可贴粘。");
      Toast("复制成功");
    },
  },
};
</script>

<style lang="less" scoped>
.user-info {
  // background-color: #fff;
  color: #fff;
  overflow: hidden;
  padding: 0.7867rem /* 59/75 */ 0.4rem /* 30/75 */ 0;
  width: auto;
  .avatar {
    margin-right: 0.4rem /* 30/75 */;
    float: left;
    img {
      border-radius: 50%;
      width: 1.3333rem /* 100/75 */;
      height: 1.3333rem /* 100/75 */;
    }
  }
  .info {
    height: 1.3333rem /* 100/75 */;
    float: left;
    .username {
      // color: #333;
      font-size: 0.64rem /* 48/75 */;
    }
    .phone-num {
      margin-top: 0.0667rem /* 5/75 */;
      // color: #333;
      font-size: 0.32rem /* 24/75 */;
    }
  }
  .is-attestation {
    border: 1px solid #fff;
    // margin: 0.9467rem /* 71/75 */ 0 0 0.4rem /* 30/75 */;
    margin: 0.367rem /* 71/75; 0 0 0.4rem /* 30/75; */;
    float: left;
    border-radius: 12px;
    padding: 0 0.08rem /* 6/75 */;
    height: 0.32rem /* 24/75 */;
    font-size: 0.2133rem /* 16/75 */;
    line-height: 0.32rem /* 24/75 */;
  }
}
.moneyOut {
  // background-color: #fff;
  padding: 0.1rem /* 50/75 */ 0.4rem /* 30/75 */ 0.2667rem /* 20/75 */;
  // height: 1.6rem /* 120/75 */;
  margin-bottom: 0.4rem;
}
.money {
  border-radius: 0.33333rem;
  // background-color: #fff;
  display: flex;
  color: #fff;
  padding: 0.4rem /* 50/75 */ 0.02rem /* 30/75 */ 0.2667rem /* 20/75 */;
  // box-shadow: 0 0 0.22667rem 0 rgba(0, 0, 0, 0.15);
  .money-list {
    width: 25%;
    text-align: center;
    font-size: 0.4rem;
    a {
      color: #fff;
      // text-decoration: none;
    }
  }
}
.showId {
  display: flex;
  color: #fff;
  font-size: 0.32rem;
  padding: 0.3rem /* 50/75 */ 0.8rem 0 0.8rem;
  line-height: 0.8rem;
  margin-left: 1.35rem;
}
</style>
