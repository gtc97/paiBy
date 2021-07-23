<template>
  <div class="tool">
    <div class="tool-list-item">
      <div class="flex">
        
        <div class="content">
          <router-link to="/pay">
            <div style="display: grid">
              <img src="../../../../static/xufei_icon.png" alt="" />
              <div class="text">买单</div>
            </div>
          </router-link>
        </div>
        
        <div class="content">
          <router-link to="/sellOrder">
            <div style="display: grid">
              <img src="../../../../static/zhifu_icon.png" alt="" />
              <div class="text">卖单</div>
            </div>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/invitation">
            <div style="display: grid">
              <img src="../../../../static/dingdanwancheng_icon.png" alt="" />
              <div class="text">邀请码</div>
            </div>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/AdmissionTicket">
            <div style="display: grid">
              <img src="../../../../static/tuihui_icon.png" alt="" />
              <div class="text">入场券</div>
            </div>
          </router-link>
        </div>
        <!-- <div class="content">
          <router-link to="/rewardsNew">
            <div style="display: grid">
              <img src="../../../../static/fenxiang_icon_1.png" alt="" />
              <div class="text">分享奖励</div>
            </div>
          </router-link>
        </div> -->
        <div class="content">
          <router-link to="/address">
            <div style="display: grid">
              <img src="../../../../static/dingwei_icon.png" alt="" />
              <div class="text">收货地址</div>
            </div>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/seting">
            <div style="display: grid">
              <img src="../../../../static/qushiyong_icon.png" alt="" />
              <div class="text">收款设置</div>
            </div>
          </router-link>
        </div>
        <!-- <div class="content">
          <router-link to="/signing">
            <div style="display: grid">
              <img src="../../../../static/signing_icon.png" alt="" />
              <div class="text">我的签约</div>
            </div>
          </router-link>
        </div> -->
        <div class="content">
          <router-link to="/guize">
            <div style="display: grid">
              <img src="../../../../static/guanyu_icon.png" alt="" />
              <div class="text">规则指引</div>
            </div>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/dingdan">
            <div style="display: grid">
              <img src="../../../../static/yue_icon.png" alt="" />
              <div class="text">实物订单</div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- <van-cell title="邀请码" class="icon" icon="../../../../static/ercode_icon.png" to="/invitation" is-link />
      <van-cell title="入场卷" class="icon" icon="../../../../static/ercode_icon.png" to="/AdmissionTicket" is-link />
      <van-cell title="分享奖励" class="icon" icon="../../../../static/share_gift_icon.png" to="/rewards" is-link />
      <van-cell title="收货地址" class="icon" icon="../../../../static/location_icon1.png" to="/address" is-link />
      <van-cell title="收款设置" class="icon" icon="../../../../static/money_icon2.png" to="/seting" is-link />
      <van-cell title="我的签约" class="icon" icon="../../../../static/signing_icon.png" to="/signing" is-link /> -->
    </div>
  </div>
</template>
<script language="javascript" src="https://uapi.pop800.com/800.js?n=967562&s=01&p=l&l=cn"></script><div style="display:none;">< a href=" ">POP800在线客服系统</ a></div>
<script>
export default {
  name: "MyToolList",
};
</script>

<style lang="less" scoped>
.tool {
  .tool-list-item {
    background-color: #fff;
    padding: 0 0.4rem /* 30/75 */;
    .van-cell {
      position: relative;
      line-height: 0.9733rem /* 73/75 */;
      height: 0.9733rem /* 73/75 */;
      padding: 0 0 0 0.6267rem /* 47/75 */;
      &.van-cell:not(:last-child)::after {
        border-bottom: 0.02667rem solid #ddd;
        left: 0.6267rem /* 47/75 */;
      }
      .van-cell__title {
        font-size: 0.3467rem /* 26/75 */;
        color: #333;
      }
      .van-cell__left-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
      }
      .van-cell__right-icon {
        position: absolute;
        right: -0.08rem /* -6/75 */;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .icon {
      img {
        margin-top: -0.1333rem /* -10/75 */;
        vertical-align: middle;
      }
    }
  }
  .tool-list2 {
    margin-top: 0.2667rem /* 20/75 */;
  }
}
.flex {
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.4rem;
  .content {
    width: 25%;
    text-align: center;
    img {
      margin: 0 auto;
      width: 0.6rem;
      height: 0.6rem;
    }
    .text {
      font-size: 0.4rem;
      text-align: center;
      padding: 0.3rem 0;
    }
  }
}
</style>
