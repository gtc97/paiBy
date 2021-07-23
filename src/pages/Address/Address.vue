<template>
  <div class="container">
    <div v-show="!isShowEdit" class="address-list">
      <common-header title="收货地址" bg="#f5f5f5" />
      <van-radio-group v-model="radio">
        <div
          v-for="(item, index) of addressList"
          :key="item.addressId"
          class="address-item"
        >
          <van-radio
            :name="item.isDefault"
            class="radio-wrap"
            @click="handleRadioClick(index)"
          >
            <div class="address-top">
              <i class="name" v-html="item.name" />
              <i class="phone" v-html="item.phone">17688888888</i>
            </div>
            <div
              class="address-inner"
              v-html="
                item.provinceName +
                item.cityName +
                item.areaName +
                item.userAddress
              "
            />
          </van-radio>
          <div class="edit" @click="handleEditAddress(index)">编辑</div>
        </div>
        <!-- <div class="address-item">
          <van-radio class="radio-wrap" name="2">
            <div class="address-top">
              <i class="name">玺之斋</i>
              <i class="phone">17688888888</i>
            </div>
            <div class="address-inner">广东省深圳市XXXXXXXXXXXXXXX</div>
            <div class="edit">编辑</div>
          </van-radio>
        </div>-->
      </van-radio-group>
      <div class="add-address-wrap">
        <router-link
          to="/addAddress"
          class="add-address"
          :style="'background:' + sysColor + ';color: #fff'"
          >新增收货地址</router-link
        >
      </div>
    </div>
    <EditAddress v-if="isShowEdit" :info="info" @editSave="handleEditSave" />
  </div>
</template>

<script>
import { Toast } from "vant";
import EditAddress from "./components/EditAddress";
export default {
  name: "Address",
  components: {
    EditAddress,
  },
  data() {
    return {
      addressList: [],
      info: {},
      radio: 1,
      isShowEdit: 0,
      sysColor: localStorage.getItem("styleColor"),
    };
  },
  mounted() {
    setTimeout(function () {
      this.sysColor = localStorage.getItem("styleColor");
    }, 1000);
    this.getAddressList();
  },
  methods: {
    // 获取地址列表
    getAddressList() {
      this.$api.addressList().then((res) => {
        this.addressList = res.data.data;
        console.log(res);
      });
    },
    // 编辑地址
    handleEditAddress(index) {
      this.info = this.addressList[index];
      this.isShowEdit = 1;
    },
    // 处理编辑完成
    handleEditSave() {
      this.isShowEdit = 0;
      this.info = {};
      this.getAddressList();
    },
    // 处理单框点击
    handleRadioClick(index) {
      this.$api
        .setDefaultAddress({ addressId: this.addressList[index].addressId })
        .then((res) => {
          Toast(res.msg);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  .address-list {
    padding-bottom: 1.7333rem /* 130/75 */;
    .address-item {
      position: relative;
      margin: auto;
      width: 9.2rem /* 690/75 */;
      height: 2rem /* 150/75 */;
      .radio-wrap {
        margin-top: 0.4rem /* 30/75 */;
        border-radius: 0.2667rem /* 20/75 */;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        padding-left: 0.4rem /* 30/75 */;
        margin-right: 1.4267rem /* 107/75 */;
        width: 100%;
        height: 100%;
        background-color: #fff;
        .van-radio__label {
          margin-top: -0.1333rem /* -10/75 */;
        }
        .address-top {
          margin-left: 0.2267rem /* 17/75 */;
          .name {
            vertical-align: top;
            font-size: 0.3733rem /* 28/75 */;
            color: #333;
          }
          .phone {
            vertical-align: top;
            font-size: 0.32rem /* 24/75 */;
            color: #666;
          }
        }
        .address-inner {
          max-width: 6rem /* 450/75 */;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 0.2267rem /* 17/75 */;
          font-size: 0.32rem /* 24/75 */;
          color: #333;
        }
      }
      .edit {
        padding-left: 0.4rem /* 30/75 */;
        border-left: 1px solid #ddd;
        position: absolute;
        z-index: 999;
        right: 0.4rem /* 30/75 */;
        top: 50%;
        height: 0.5333rem /* 40/75 */;
        line-height: 0.5333rem /* 40/75 */;
        transform: translateY(-50%);
        font-size: 0.32rem /* 24/75 */;
        color: #333;
      }
    }
    .add-address-wrap {
      position: fixed;
      bottom: 0;
      background-color: #fff;
      width: 100%;
      height: 1.3333rem /* 100/75 */;

      .add-address {
        display: block;
        margin: 0.2rem /* 15/75 */ /* 30/75 */ auto 0;
        border-radius: 0.1333rem /* 10/75 */;
        width: 9.2rem /* 690/75 */;
        height: 0.9333rem /* 70/75 */;
        line-height: 0.9333rem /* 70/75 */;
        background-color: #fdb428;
        color: #333;
        text-align: center;
        font-size: 0.4267rem /* 32/75 */;
      }
    }
  }
}
</style>
