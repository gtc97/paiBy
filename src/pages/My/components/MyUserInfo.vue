<template>
  <div>
    <div class="user-info">
      <div class="avatar">
        <img src="../../../../static/avatar.jpg" alt="头像" />
      </div>
      <div class="info">
        <div class="username">{{ userInfo.userName }}</div>
        <div class="phone-num">{{ userInfo.userPhone }}</div>
      </div>
      <div class="is-attestation">已实名</div>
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
          <router-link to="/withdrawal">
            <div>￥{{ money.credit3 }}</div>
            <div>佣金</div>
          </router-link>
        </div>
        <div class="money-list">
          <router-link to="/Silver">
            <div>￥{{ money.credit1 }}</div>
            <div>银元</div>
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
      userInfo: JSON.parse(localStorage.getItem("USER")),
      money: {},
    };
  },
  created() {},
  mounted() {
    this.getUserMoney();
  },
  methods: {
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
  },
};
</script>

<style lang="less" scoped>
.user-info {
  background-color: #fff;
  overflow: hidden;
  padding: 0.7867rem /* 59/75 */ 0.4rem /* 30/75 */ 0;
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
      color: #333;
      font-size: 0.64rem /* 48/75 */;
    }
    .phone-num {
      margin-top: 0.0667rem /* 5/75 */;
      color: #333;
      font-size: 0.32rem /* 24/75 */;
    }
  }
  .is-attestation {
    border: 1px solid #333;
    margin: 0.9467rem /* 71/75 */ 0 0 0.4rem /* 30/75 */;
    float: left;
    border-radius: 12px;
    padding: 0 0.08rem /* 6/75 */;
    height: 0.32rem /* 24/75 */;
    font-size: 0.2133rem /* 16/75 */;
    line-height: 0.32rem /* 24/75 */;
  }
}
.moneyOut {
  background-color: #fff;
  padding: 0.4rem /* 50/75 */ 0.4rem /* 30/75 */ 0.2667rem /* 20/75 */;
  height: 1.6rem /* 120/75 */;
}
.money {
  border-radius: 0.33333rem;
  background-color: #fff;
  display: flex;
  padding: 0.4rem /* 50/75 */ 0.02rem /* 30/75 */ 0.2667rem /* 20/75 */;
  box-shadow: 0 0 0.22667rem 0 rgba(0, 0, 0, 0.15);
  .money-list {
    width: 25%;
    text-align: center;
    font-size: 0.4rem;
  }
}
</style>
