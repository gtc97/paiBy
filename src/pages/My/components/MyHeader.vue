<template>
  <van-nav-bar class="my-header" title="会员中心" @click-right="onClickRight">
    <!-- <template #left>
      <van-icon class="icon" name="../../../../static/customer_service_icon.png" />
    </template> -->
    <template #right>
      <van-icon class="icon seting_icon" name="../../../../static/seting.png" />
    </template>
  </van-nav-bar>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'MyHeader',
  methods: {
    onClickRight() {
      Dialog.confirm({
        title: '退出登录',
        message: '确定退出登录吗?'
      }).then(() => {
        this.$api.loginOut().then(res => {
          if (res.status === 1) {
            localStorage.clear()
            // var url = window.location.href
            // url = url.split("?")[0]
            // url = url.substring(0, url.indexOf('?'))
            // location.href = url
            // window.location.reload()
            this.$router.push({path: "/",});
          }
        })
      })
    }
  }
}
</script>
<style lang="less" >
.my-header{
  background-color: #BD2F3B !important;
  .van-nav-bar__title{
    color:#fff !important;
  }
}
.my-header{
  &::after {
    border: none;
  }
  .icon {
    img {
      width: .48rem /* 36/75 */;
      height: auto;
    }
  }
  .seting_icon{
    img{
      width: .5333rem /* 40/75 */;
    }
  }
}
</style>
