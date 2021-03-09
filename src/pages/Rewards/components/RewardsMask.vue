<template>
  <div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>

</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'RewardsMask',
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      actions: [
        { name: '提现历史' },
        { name: '常见问题' }
      ]
    }
  },
  methods: {
    onSelect(item) {
      switch (item.name) {
        case '提现历史':
          this.$router.push('/')
          break

        case '常见问题':
          this.$router.push('/')
          break
      }
      this.$emit('closeMask')
      Toast(item.name)
    },
    onCancel() {
      Toast('取消')
      this.$emit('closeMask')
    }
  }
}
</script>

