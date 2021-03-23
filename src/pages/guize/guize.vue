<template>
  <div class="container">
    <NoticeHeader/>
    <NoticeList :notify-list="notifyList"/>
  </div>
</template>

<script>
import NoticeHeader from './Components/NoticeHeader'
import NoticeList from './Components/NoticeList'
export default {
  name: 'Notice',
  components: {
    NoticeHeader,
    NoticeList
  },
  data() {
    return {
      notifyList: []
    }
  },
  mounted() {
    this.getNotifyList()
  },
  methods: {
    getNotifyList() {
      this.$api.notifyList({ catId: 7 }).then(res => {
        this.notifyList = res.data
        console.log(res)
      })
    }
  }
}
</script>
