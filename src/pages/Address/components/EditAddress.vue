<template>
  <div class="edit-address">
    <van-nav-bar title="编辑地址" @click-left="$emit('editSave', 1)">
      <template #left>
        <van-icon name="arrow-left" size="0.4rem" color="#333" />
      </template>
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="addressInfo"
      show-set-default
      show-search-result
      show-delete
      @delete="onDelete"
      @save="onSave"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
import areaList from '@/utils/areaList.js'
export default {
  name: 'EditAddress',
  props: {
    info: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      areaList,
      addressInfo: {
        addressDetail: '',
        areaCode: '',
        city: '',
        country: '',
        county: '',
        isDefault: '',
        name: '',
        province: '',
        tel: ''
      }
    }
  },
  created() {
    this.addressInfo = {
      addressDetail: this.info.userAddress,
      areaCode: String(this.info.areaId),
      city: this.info.cityName,
      country: '',
      county: this.info.areaName,
      isDefault: this.info.isDefault === 1,
      name: this.info.name,
      province: this.info.provinceName,
      tel: this.info.phone
    }
  },
  methods: {
    onSave(content) {
      // 根据值找key
      const findKey = (obj, value, compare = (a, b) => a === b) => {
        return Object.keys(obj).find(k => compare(obj[k], value))
      }
      const obj = {
        addressId: this.info.addressId,
        name: content.name,
        phone: content.tel,
        provinceId: findKey(areaList.province_list, content.province),
        cityId: findKey(areaList.city_list, content.city),
        areaId: findKey(areaList.county_list, content.county),
        userAddress: content.addressDetail,
        isDefault: content.isDefault ? '1' : '0'
      }

      this.$api.editAddress(obj).then(res => {
        if (res.status !== 1) {
          Toast(res.msg)
          return
        }
        Toast(res.msg)
        this.$emit('editSave', 1)
      })
    },
    // 处理删除
    onDelete(content) {
      this.$api.deleteAddress({ addressId: this.info.addressId }).then(res => {
        if (res.status !== 1) {
          Toast(res.msg)
          return
        }
        this.$emit('editSave', 1)
      })
    }
  }
}
</script>

