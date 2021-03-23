<template>
  <div class="container">
    <common-header :title="details.articleTitle"/>
    <div class="notice-content">
      <p v-html="details.articleContent"></p>
      <div class="time">文章创建时间: {{ details.createTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeDetails',
  data() {
    return {
      details: {}
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    this.getNotifyDetails(this.$route.params.id)
  },
  methods: {
    getNotifyDetails(id) {
      this.$api.notifyDetails({ articleId: id }).then((res) => {
        this.details = res.data
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  height: 100vh;
  .notice-content{
    padding: .2rem /* 15/75 */ .4rem /* 30/75 */ 0;
    p {
      font-size: .4267rem /* 32/75 */;
      color: #333;

    }
    .time{
      margin-top: .2667rem /* 20/75 */;
      text-align: right;
      font-size: .3467rem /* 26/75 */;
      color: #333;
    }
  }
}

</style>
