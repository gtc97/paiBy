<template>
  <div>
    <common-header title="收货地址" bg="#fff" />
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      show-set-default
      show-search-result
      @save="onSave"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
import areaList from '@/utils/areaList.js'
export default {
  name: 'AddAddress',
  data() {
    return {
      areaList
    }
  },
  methods: {
    onSave(content) {
      // 根据值找key
      const findKey = (obj, value, compare = (a, b) => a === b) => {
        return Object.keys(obj).find(k => compare(obj[k], value))
      }
      const obj = {
        name: content.name,
        phone: content.tel,
        provinceId: findKey(areaList.province_list, content.province),
        cityId: findKey(areaList.city_list, content.city),
        areaId: findKey(areaList.county_list, content.county),
        userAddress: content.addressDetail,
        isDefault: content.isDefault ? '1' : '0'
      }

      this.$api.addAddress(obj).then(res => {
        if (res.status !== 1) {
          Toast(res.msg)
          return
        }
        Toast(res.msg)
        this.$router.push({ path: '/address' })
      })
    }
  }
}
</script>
