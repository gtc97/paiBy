<template>
  <van-row class="goods-list">
    <van-col v-for="item of goodsList" :key="item.id" span="12">
      <!-- <router-link :to="'/goodsdetails/' + item.id" class="item"> -->
      <div class="item" @click="navTo(item)">
        <div class="item-img">
          <span class="stock" :style="'background:' + item.backColor">{{
            item.tiqian == 1 ? '可抢拍' : item.status
          }}</span>
          <!-- <img :src="item.goodsLogo" alt /> -->
          <van-image :src="item.goodsLogo" fit="cover" />
        </div>
        <div class="item-inner">
          <div class="title">{{ item.goodsName }}</div>
          <div class="info">
            <i class="price">￥{{ item.goodsPrice }}</i>
          </div>
        </div>
      </div>
      <!-- </router-link> -->
    </van-col>
    <van-empty class="emptyImg" v-if="!goodsList.length" image=".././static/icon_empty.png" description="暂无商品" />
  </van-row>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "GoodsItem",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    backColor(item) {
      var background = "background:'#C0C0C0'";
      if (item == "进行中") {
        background = "background:'#61AF4B'";
      } else if (item == "已结束") {
        background = "background:'#DE4B4B'";
      }
      console.log(background);
      return { background };
    },
  },
  methods: {
    navTo(item) {
      var that = this
      console.log(item);
      this.$api.goodsquan({ goodid: item.id }).then((res) => {
        if (res.data == 2 ) {
          Dialog.confirm({
            title: "购买入场卷",
            message: "您还没有入场券，是否前去购买入场券?",
          }).then(() => {
            that.$router.push({ name: "AdmissionTicket" });
          });
        }else{
          this.$router.push({ path: "/goodsdetails/" + item.id });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  padding: 0 0.4rem /* 30/75 */;
  .van-col {
    margin-top: 0.4rem /* 30/75 */;
    &:nth-child(2n) {
      text-align: right;
    }
    .item {
      overflow: hidden;
      border-radius: 0.1333rem /* 10/75 */;
      text-align: left;
      display: inline-block;
      width: 4.4rem /* 330/75 */;
      height: 5.1rem; //4.2667rem /* 320/75 */;
      background-color: #fff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
      .item-img {
        box-sizing: border-box;
        // padding-top: 0.52rem /* 39/75 */;
        background-color: #f8f8f8;
        text-align: center;
        width: 4.4rem /* 330/75 */;
        height: 3.5rem /* 200/75 */;
        position: relative;
        font-size: 0.5em;
        .stock {
          //   float: right;
          border-radius: 0.53rem /* 4/75 */;
          // width: 1.0667rem /* 80/75 */;
          // height: 0.3733rem /* 28/75 */;
          padding: 0.1rem 0.2rem;
          line-height: 0.3733rem /* 28/75 */;
          //   text-align: center;
          font-size: 0.2933rem /* 22/75 */;
          background-color: #c0c0c0;
          color: #fff;
          position: absolute;
          right: 0.4rem;
          top: 0.3rem;
          z-index: 99;
        }
        img {
          width: 100%; // 4.0267rem /* 302/75 */;
          height: 100%; //1.8933rem /* 142/75 */;
          border-radius: 0.13rem;
        }
      }
      .item-inner {
        padding: 0.1333rem /* 10/75 */ 0.3333rem 0;
        .title {
          line-height: 0.4rem /* 30/75 */;
          height: 0.68rem /* 51/75 */;
          font-size: 0.32rem /* 24/75 */;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .info {
          margin-top: 0.1333rem /* 10/75 */;
          .price {
            float: left;
            font-size: 0.3467rem /* 26/75 */;
            color: #ed3017;
          }
        }
      }
    }
  }
}
.emptyImg .van-empty__image{
  width: 100%;
  height: 5rem;
}

.van-image {
    width: 100%;
    height: 100%;
}
</style>
