<template>
  <van-list v-model="loading" :finished="finished" class="notice-list" finished-text="没有更多了">
    <van-cell v-for="(item,index) in notifyList" :key="index" :to="'/noticeDetails/'+item.articleId">
      <h2 class="item-title">{{ item.articleTitle }}</h2>
      <p class="item-time">{{ "发布日期：" + item.createTime }}</p>
    </van-cell>
  </van-list>
</template>

<script>
export default {
  name: 'NoticeList',
  props: {
    notifyList: {
      type: Array,
      default() {
        return []
      }
    }

  },
  data() {
    return {
      list: [
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        },
        {
          title: '关于用户李*违反平台运营规则的处罚公示',
          time: '发布日期：2020.5.20 12:12'
        }
      ],
      loading: false,
      finished: true
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.notice-list {
  padding-right: 0.4rem /* 30/75 */;
  .van-cell {
    padding: 0.5rem /* 30/75 */ 0 0.4rem /* 30/75 */ 0.4rem /* 30/75 */;
    &:not(:last-child)::after {
      border-bottom: 0.02667rem solid #ddd;
    }
    .item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
      // line-height: 0.3733rem /* 28/75 */;
      font-size: 0.3733rem; /* 28/75 */
    }
    .item-time {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 0.1867rem /* 14/75 */;
      color: #999;
      line-height: 0.32rem /* 24/75 */;
      font-size: 0.32rem; /* 24/75 */
    }
  }
}
</style>
