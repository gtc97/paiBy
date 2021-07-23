<template>
  <van-row class="goods-list">
    <van-col v-for="item of goodsList" :key="item.id" span="12">
      <router-link :to="'/dhgoodsdetails/' + item.id" class="item">
        <div class="item-img">
          <span class="stock" :style="'background:' + item.backColor">{{
            item.status
          }}</span>
          <!-- <img :src="item.goodsLogo" alt /> -->
          <van-image  :src="item.goodsLogo" fit="cover" />
        </div>
        <div class="item-inner">
          <div class="title">{{ item.goodsName }}</div>
          <div class="info">
            <i class="price">{{ item.goodsPrice }}银币</i>
            <!-- <span class="stock">{{ item.status }}</span> -->
          </div>
        </div>
      </router-link>
    </van-col>
    <van-empty
      v-if="!goodsList.length"
      image=".././static/icon_empty.png"
      description="银币不够1000,暂时无法查看"
    />
    <!-- <van-col span="12">
      <router-link to="/" class="item">
        <div class="item-img">
          <img src="../../../../static/hemo_auction_img1.png" alt >
        </div>
        <div class="item-inner">
          <div class="title">foo169《牡丹》王开顺60*60cm</div>
          <div class="info">
            <i class="price">¥10000.00</i>
            <span class="stock">已售空</span>
          </div>
        </div>
      </router-link>
        </van-col>-->
  </van-row>
</template>

<script>
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
      height: 4.2667rem /* 320/75 */;
      background-color: #fff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
      position: relative;
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
      .item-img {
        box-sizing: border-box;
        padding-top: 0.52rem /* 39/75 */;
        background-color: #f8f8f8;
        text-align: center;
        width: 4.4rem /* 330/75 */;
        height: 2.6667rem /* 200/75 */;
        img {
          // width: 4.0267rem /* 302/75 */;
          // height: 1.8933rem /* 142/75 */;
          border-radius: 0.13rem;
        }
      }
      .item-inner {
        padding: 0.1333rem /* 10/75 */ 20px 0;
        .title {
          line-height: 0.4rem /* 30/75 */;
          height: 0.68rem /* 51/75 */;
          font-size: 0.32rem /* 24/75 */;
          color: #333;
        }
        .info {
          margin-top: 0.1333rem /* 10/75 */;
          .price {
            float: left;
            font-size: 0.3467rem /* 26/75 */;
            color: #ed3017;
          }
          .stock {
            float: right;
            border-radius: 0.0533rem /* 4/75 */;
            width: 1.0667rem /* 80/75 */;
            height: 0.3733rem /* 28/75 */;
            line-height: 0.3733rem /* 28/75 */;
            text-align: center;
            font-size: 0.2933rem /* 22/75 */;
            background-color: #ed3017;
            color: #fff;
          }
        }
      }
    }
  }
}
.van-empty__image {
    width: 100% !important;
    height: 5.26667rem  !important;
}
.van-image {
    width: 100%;
    height: 100%;
}
</style>
