<template>
  <div class="auction">
    <div>
      <!--<div v-for="(item,index) in goodsCatList" :key="index">
             <div class="auction-header">
                <div class="auction-header-title">
                    <van-icon
                        class="icon"
                        size="0.3733rem"
                        name="../../../../static/alarm_clock_icon.png"
                    />
                    <h2 class="text">{{ item.parentName }}</h2>
                </div>
                <div class="auction-header-time">{{ item.onlineTime }}</div>
            </div> -->
      <div class="auction-content">
        <div v-for="(v, k) in goodsCatList" :key="k" class="auction-start">
          <!-- <div class="auction-header-time">{{ v.onlineTime }}</div> -->

          <div class="classStyle" v-if="v.statusName == '交易中'">
            <!-- <div class="style" style="background-color: #eb4343;">{{ v.statusName }}</div> -->
            <router-link
              :to="{
                path: '/goods',
                query: { type: v.catId, title: v.catName },
              }"
              class="auction-start-item "
              :class=" v.tiqian == 1 ?'current-qiang' : 'current-start'"
            >
              <img :src="v.catLogo" width="100%" alt="2" />
              <div class="time">
                <div class="time-style">{{ v.onlineTime }}</div>
              </div>
              <!-- <div class="title">{{ v.catName }}</div> -->
            </router-link>
          </div>
          <div class="classStyle" v-if="v.statusName == '已结束'">
            <!-- <div class="style" style="background-color: #C0C0C0;">{{ v.statusName }}</div> -->
            <router-link
              :to="{
                path: '/goods',
                query: { type: v.catId, title: v.catName },
              }"
              class="auction-start-item"
              :class=" v.tiqian == 1 ?'current-qiang' : 'current-end'"
            >
              <img :src="v.catLogo" width="100%" alt="2" />
              <div class="time">
                <div class="time-style">{{ v.onlineTime }}</div>
              </div>
              <!-- <div class="title">{{ v.catName }}</div> -->
            </router-link>
          </div>
          <div class="classStyle" v-if="v.statusName == '未开始'">
            <!-- <div class="style" style="background-color: #C0C0C0;">{{ v.statusName }}</div> -->
            <router-link
              :to="{
                path: '/goods',
                query: { type: v.catId, title: v.catName },
              }"
              class="auction-start-item"
              :class=" v.tiqian == 1 ?'current-qiang' : 'current-ready'"
            >
              <img :src="v.catLogo" width="100%" alt="2" />
              <div class="time">
                <div class="time-style">{{ v.onlineTime }}</div>
              </div>
              <!-- <div class="title">{{ v.catName }}</div> -->
            </router-link>
          </div>
          <!-- <div v-if="v.statusName == '未开始'">
            <router-link
              :to="{
                path: '/goods',
                query: { type: v.catId, title: v.catName },
              }"
              class="auction-start-item current-ready"
            >
              <img :src="v.catLogo" width="100%" alt="2" />
              <div class="time">
                <div class="time-style">{{ v.onlineTime }}</div>
              </div>
            </router-link>
          </div> -->
        </div>
      </div>
      <!-- </div  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeAuction",
  props: {
    goodsCatList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      sysColor: localStorage.getItem("styleColor"),
    };
  },
};
</script>

<style lang="less" scoped>
.classStyle {
  position: relative;
}
.style {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  font-size: 0.32rem;

  border-radius: 0 0 0 0.2667rem;
}
.auction {
  position: relative;

  .auction-header {
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
    border-radius: 0.2667rem /* 20/75 */;
    padding: 0 0.4rem /* 30/75 */;
    overflow: hidden;
    height: 1.3333rem /* 100/75 */;
    background-color: #fb4656;

    .auction-header-title {
      float: left;

      .icon {
        margin-top: 0.2133rem /* 16/75 */;
        vertical-align: top;

        img {
          width: 0.48rem /* 36/75 */;
          height: 0.4533rem /* 34/75 */;
        }
      }

      .text {
        margin-top: 0.2133rem /* 16/75 */;
        vertical-align: top;
        display: inline-block;
        font-size: 0.3733rem /* 28/75 */;
        color: #fff;
      }
    }

    .auction-header-time {
      margin-top: 0.2133rem /* 16/75 */;
      visibility: top;
      float: right;
      border-radius: 0.2267rem /* 17/75 */;
      width: 3.1333rem /* 160/75 */;
      height: 0.4533rem /* 34/75 */;
      text-align: center;
      line-height: 0.4533rem /* 34/75 */;
      font-size: 0.2933rem /* 22/75 */;
      color: #fb4656;
      background-color: #fff;
    }
  }

  .auction-content {
    position: relative;
    top: -0.5333rem /* -40/75 */;

    .current-start {
      &::after {
        content: "进行中";
        background-color: #eb4343; //#6cc253;
      }
    }

    .current-end {
      &::after {
        content: "已结束";
        background-color: #c0c0c0; //#eb4343;
      }
    }
    .current-ready {
      &::after {
        content: "未开始";
        background-color: #c0c0c0;
      }
    }
    .current-qiang {
      &::after {
        content: "可抢拍";
        background-color: #1ac252;
      }
    }
    .current-ready,
    .current-start,
    .current-end {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 0px 0px 0px 0.2667rem;
        width: 2rem /* 100/75 */;
        height: 0.8rem /* 60/75 */;
        line-height: 0.8rem /* 60/75 */;
        text-align: center;
        font-size: 0.32rem /* 24/75 */;
        color: #fff;
        opacity: 0.9;
      }
    }

    .auction-start {
      border-top-right-radius: 0.2667rem /* 20/75 */;
      border-top-left-radius: 0.2667rem /* 20/75 */;
      background-color: #fff;
      img {
        border-radius: 0.266rem;
        // height: 4.8rem;
      }
      .auction-start-item {
        position: relative;
        display: block;
        .title {
          position: absolute;
          clear: both;
          width: 100%;
          top: 30%;
          text-align: center;
          color: #fff;
          font-size: 0.9em;
        }
        .time {
          position: absolute;
          clear: both;
          width: 100%;
          top: 57%;
          text-align: center;
          //   margin-top: 20%;
          //   margin: 0 auto;
          color: #fff;
          //   background: #c0c0c0;
          font-size: 0.5em;
        }
        .time-style {
          background: #10101096;
          width: 65%;
          margin: 0 auto;
          border-radius: 0.8em;
        }
      }
      margin-bottom: 0.2133rem /* 16/75 */;
    }

    .auction-end {
      box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
      border-radius: 20px;
      padding: 0.4rem /* 30/75 */ 0.2667rem /* 20/75 */;

      .auction-end-item {
        position: relative;
        display: block;
        margin-bottom: 0.2667rem /* 20/75 */;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
