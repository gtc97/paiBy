<template>
  <div class="container">
    <MyHeader />
    <MyUserInfo />
    <!-- <MyCard /> -->
    <MyToolList />
  </div>
</template>
<script language="javascript" src="https://uapi.pop800.com/800.js?n=967562&s=01&p=l&l=cn"></script>
<script>
import MyHeader from './components/MyHeader'
import MyUserInfo from './components/MyUserInfo'
import MyCard from './components/MyCard'
import MyToolList from './components/MyToolList'
export default {
  name: 'My',
  components: {
    MyHeader,
    MyUserInfo,
    MyCard,
    MyToolList
  }
}
</script>

<style lang="less" scoped>
.container {
  // background-color: #f5f5f5;
  min-height: calc(100vh - 1.33333rem);
}
</style>
