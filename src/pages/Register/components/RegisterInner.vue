<template>
  <div class="register-inner">
    <!-- <div class="avatar">
      <van-uploader v-model="user.vatar " :max-count="1" />
      <van-cell-group class="username">
        <van-field v-model="user.name" placeholder="请输入用户名" />
      </van-cell-group>
      <div class="username">头像</div>
    </div> -->
    <div class="inner-wrap">
      <van-cell-group>
        <div class="input-label">姓名</div>
        <van-field v-model="user.userName" :rules="[{ required: true, message: '请填写姓名' }]" placeholder="请输入您的真实姓名" />
      </van-cell-group>
      <van-cell-group>
        <div class="input-label">身份证号</div>
        <van-field v-model="user.cardID" :rules="[{ required: true, message: '请填写身份证号' }]" placeholder="请输入身份证号" />
      </van-cell-group>
      <van-cell-group>
        <div class="input-label">手机号</div>
        <van-field v-model="user.userPhone" :rules="[{ required: true, message: '请填写手机号' }]" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group>
        <div class="input-label">验证码</div>
        <van-field v-model="user.code" :rules="[{ required: true, message: '请填写验证码' }]" placeholder="请输入短信验证码">
          <template #button>
            <span @click="handleGetVerificationCode">{{ user.notice }}</span>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <div class="input-label">邀请码</div>
        <van-field v-model="user.inviteCode" placeholder="请输入邀请码(没有请忽略)" />
      </van-cell-group>
      <div class="agreement">
        <van-checkbox v-model="agreement" checked-color="#FDB428">
          阅读并同意
          <!-- <router-link to="/agreement">《用户注册协议》</router-link> -->
          <router-link to="/zhuceAgreement">《用户注册协议》</router-link>
          <!-- <a href="/down/" style="margin-left: 4em">点击下载App</a> -->
        </van-checkbox>
      </div>
      <div class="submit-btn" @click="handleSubmitRegister">完成并登录</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { checkPhone, checkName, checkIdCard ,inviteCodeLimit} from '@/utils/validate'
export default {
  name: 'RegisterInner',
  data() {
    return {
      user: {
        userName: '',
        cardID: '',
        userPhone: '',
        code: '',
        inviteCode:  localStorage.getItem('invite') == undefined? '': localStorage.getItem('invite'),//(this.$route.query.invite === 1 ? '' : this.$route.query.invite)
        notice: '获取验证码',
        overtime: true
      },
      agreement: false
    }
  },
  methods: {
    // 处理提交注册
    handleSubmitRegister() {
      var that = this
      if (!checkName(that.user.userName)) {
        Toast('您输入的用户名有误，请重新输入')
        return
      } else if (!checkIdCard(that.user.cardID)) {
        Toast('您输入的身份证号有误，请重新输入')
        return
      } else if (!checkPhone(that.user.userPhone)) {
        Toast('您输入的手机号有误，请重新输入')
        return
      }else if(!inviteCodeLimit(that.user.inviteCode)){
        Toast('您输入的邀请码有误，请重新输入')
        return
      } else if (that.user.code.length <= 5) {
        Toast('您输入的验证码有误，请重新输入')
        return
      } else if (!that.agreement) {
        Toast('请同意用户注册协议')
        return
      }
      that.$api.register(that.user).then(res => {
        if (res.status === 1) {
          // const userInfo = {
          //   userId: res.data.userId,
          //   inviteCode: res.data.inviteCode,
          //   userName: res.data.userName,
          //   userPhone: res.data.userPhone,
          //   money: res.data.money,
          //   is_bind: 1,
          // }

          // localStorage.setItem('is_bind',1)
          var userInfo = JSON.parse(localStorage.getItem('userInfo')) 
          // var is_bind = 1
          
          console.log(userInfo)
          let key = "is_bind";
          let value = 1
          userInfo[key] = value;
          console.log(userInfo)

          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('IDS', 1)
          // url = url.substring(0, url.indexOf('?'))
          // location.href = url
          this.$router.push({ path: '/my' })
        } else {
          Toast(res.msg)
        }
      })
    },
    // 处理获取验证码
    handleGetVerificationCode() {
      if (!checkPhone(this.user.userPhone)) {
        Toast('您输入的手机号有误，请重新输入')
        return
      }
      if (this.user.overtime === false) {
        Toast('请稍后重试')
        return
      }
      this.$api.verificationCode({ userPhone: this.user.userPhone, function: 'register' }).then(res => {
        this.overtime(60)
        Toast(res.msg)
      })
    },
    overtime(timelimit) {
      this.user.overtime = false
      if (timelimit === 0) {
        this.user.overtime = true
        this.user.notice = '获取验证码'
      } else {
        timelimit -= 1
        this.user.notice = timelimit + 's后重试'
        setTimeout(() => {
          this.overtime(timelimit)
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less">
.register-inner {
  .avatar {
    .van-uploader {
      .van-uploader__wrapper {
        border-radius: 50%;
        .van-uploader__upload {
          width: 1.3333rem /* 100/75 */;
          height: 1.3333rem /* 100/75 */;
          margin: 0;
          .van-uploader__input {
            width: 1.3333rem /* 100/75 */;
            height: 1.3333rem /* 100/75 */;
          }
        }
      }
      .van-uploader__preview {
        width: 1.3333rem /* 100/75 */;
        height: 1.3333rem /* 100/75 */;
        .van-image {
          width: 1.3333rem /* 100/75 */;
          height: 1.3333rem /* 100/75 */;
          img {
            border-radius: 50%;
            width: 1.3333rem /* 100/75 */;
            height: 1.3333rem /* 100/75 */;
          }
        }
      }
    }
    .username {
      .van-field__control {
        font-size: 0.64rem /* 48/75 */;
        color: #333;
      }
    }
  }
  .inner-wrap {
    .van-cell {
      padding: 0.26667rem 0;
      .van-field__control {
        color: #333;
        font-size: 0.3733rem /* 28/75 */;
      }
    }
    .agreement {
      .van-icon{
        border-color: #FDB428;
      }
      .van-checkbox__label {
        color: #999;
        font-size: 0.32rem /* 24/75 */;
        a {
          color: #fdb428;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.register-inner {
  .avatar {
    overflow: hidden;
    position: relative;
    margin: auto;
    width: 9.2rem /* 690/75 */;
    height: 2rem /* 150/75 */;
    border-radius: 0.2667rem /* 20/75 */;
    background-color: #fff;
    .van-uploader {
      margin-top: 0.3333rem /* 25/75 */;
      margin-left: 0.4rem /* 30/75 */;
    }
    .username {
      position: absolute;
      top: 50%;
      color: #333;
      font-size: .64rem /* 48/75 */;
      transform: translateY(-50%);
      left: 2.1333rem /* 160/75 */;
      &::after {
        border: none;
      }
    }
  }
  .inner-wrap {
    padding: 0 0.4rem /* 30/75 */ .8rem /* 60/75 */;
    margin: 0.4rem /* 30/75 */ auto 0;
    border-radius: 0.2667rem /* 20/75 */;
    // height: 12.1067rem /* 908/75 */;
    background-color: #fff;
    .van-cell-group {
      &::after {
        border-bottom: 1px solid #ddd;
      }
      .input-label {
        padding-top: 0.3467rem /* 26/75 */;
        font-size: 0.3733rem /* 28/75 */;
        color: #333;
        .van-cell {
          padding: 0.26667rem 0;
        }
      }
      .van-field__button {
        span {
          cursor: pointer;
          padding-left: .24rem /* 18/75 */;
          border-left: 1px solid #FDB428;
          font-size: .3733rem /* 28/75 */;
          color: #FDB428;
        }
      }
    }
    .agreement {
      margin: 0.8rem /* 60/75 */ 0 0.4rem /* 30/75 */;
    }
    .submit-btn {
      cursor: pointer;
      border-radius: .1333rem /* 10/75 */;
      width: 8.4rem /* 630/75 */;
      height: .9333rem /* 70/75 */;
      line-height: .9333rem /* 70/75 */;
      font-size: .4267rem /* 32/75 */;
      text-align: center;
      background: #FDB428;
      color: #fff;
    }
  }
}
</style>
