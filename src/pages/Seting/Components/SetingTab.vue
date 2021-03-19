<template>
    <div class="seting-tab">
        <van-tabs v-model="active" type="card" animated>
            <van-tab title="支付宝" class="alipay">
                <template #title>
                    <van-icon class="icon" name="../../../../static/alipay_icon.png" />支付宝
                </template>
                <van-cell-group>
                    <van-uploader
                        v-model="fileList"
                        :max-count="1"
                        upload-icon="plus"
                        multiple
                        class="ercode"
                    ></van-uploader>
                    <van-field
                        v-model="alipay.payAccount"
                        label="支付宝号"
                        placeholder="请输入支付宝号或支付宝绑定手机号"
                    />
                    <van-field v-model="alipay.phone" label="手机号" placeholder="请输入手机号"></van-field>
                </van-cell-group>
                <div class="submit-btn" @click="handleSubmitalipayPay" :style="'background:' + sysColor">确认并保存</div>
            </van-tab>
            <van-tab title="微信" class="weixin">
                <template #title>
                    <van-icon class="icon" name="../../../../static/wechat_icon.png" />微 信
                </template>
                <van-cell-group>
                    <van-uploader
                        v-model="fileListWeiXin"
                        :max-count="1"
                        upload-icon="plus"
                        multiple
                        class="ercode"
                    ></van-uploader>
                    <van-field
                        v-model="weixin.payAccount"
                        label="微信号"
                        placeholder="请输入微信号或微信绑定手机号"
                    />
                    <van-field v-model="weixin.phone" label="手机号" placeholder="请输入手机号"></van-field>
                </van-cell-group>
                <div class="submit-btn" @click="handleSubmitWeixin" :style="'background:'+ sysColor +';'">确认并保存</div>
            </van-tab>
            <van-tab class="unionpay">
                <template #title>
                    <van-icon
                        class="icon unionpay_icon"
                        name="../../../../static/unionpay_icon.png"
                    />银行卡
                </template>
                <van-cell-group>
                    <van-field v-model="unionpay.name" label="姓名" placeholder="请输入真实姓名" />
                    <van-field v-model="unionpay.bankName" label="开户银行" placeholder="请输入开户银行" />
                    <van-field v-model="unionpay.bankOtherName" label="开户支行" placeholder="请输入开户支行" />
                    <van-field v-model="unionpay.cardNum" label="银行卡号" placeholder="请输入银行卡号" />
                    <van-field v-model="unionpay.phone" label="手机号" placeholder="请输入手机号"></van-field>
                </van-cell-group>
                <div class="submit-btn" @click="handleSubmitUnionpayPay" :style="'background:'+ sysColor +';'">确认并保存</div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import configObj from "@/http/config";

export default {
    name: "SetingTab",
    data() {
        return {
            timelimt: true,
            notice: "获取验证码",
            fileList: [],
            fileListWeiXin: [],
            alipay: {
                phone: "",
                payAccount: "",
                img: "",
                type: 2
            },
            weixin: {
                phone: "",
                payAccount: "",
                img: "",
                type: 3
            },
            unionpay: {
                type: 1,
                phone: "",
                name: "",
                bankName: "",
                bankOtherName: "",
                cardNum: ""
            },
            active: 0,
            sysColor: localStorage.getItem('styleColor')
        };
    },
    watch: {
        fileList() {
            if (this.fileList.length > 0) {
                if (!/image\/[a-zA-z]+/.test(this.fileList[0].file.type)) {
                    Toast("请上传图片");
                    return false;
                }
                const self = this;
                const params = new FormData();
                params.append("file", this.fileList[0].file);
                const config = {
                    headers: {
                        // 添加请求头
                        "Content-Type": "multipart/form-data"
                    }
                };
                return new Promise((resolve, reject) => {
                    axios
                        .post(
                            configObj.baseURL + "/common/uploadPic",
                            params,
                            config
                        )
                        .then(res => {
                            console.log(res.data.data.src);
                            Toast(res.data.msg);
                            if (res.data.status === 1) {
                                self.alipay.img = res.data.data.src;
                            }
                        })
                        .catch(() => {
                            reject();
                        });
                });
            }
        },
        fileListWeiXin() {
            if (this.fileListWeiXin.length > 0) {
                if (!/image\/[a-zA-z]+/.test(this.fileListWeiXin[0].file.type)) {
                    Toast("请上传图片");
                    return false;
                }
                const self = this;
                const params = new FormData();
                params.append("file", this.fileListWeiXin[0].file);
                const config = {
                    headers: {
                        // 添加请求头
                        "Content-Type": "multipart/form-data"
                    }
                };
                return new Promise((resolve, reject) => {
                    axios
                        .post(
                            configObj.baseURL + "/common/uploadPic",
                            params,
                            config
                        )
                        .then(res => {
                            console.log(res.data.data.src);
                            Toast(res.data.msg);
                            if (res.data.status === 1) {
                                self.weixin.img = res.data.data.src;
                            }
                        })
                        .catch(() => {
                            reject();
                        });
                });
            }
        },
    },
    mounted() {
        this.getPaySetingInfo();
    },
    methods: {
        getPaySetingInfo() {
            this.$api.paySetingInfo().then(res => {
                if (res.data.unionpay) {
                    this.unionpay = {
                        type: 1,
                        phone: res.data.unionpay.phone,
                        code: res.data.unionpay.code,
                        name: res.data.unionpay.name,
                        bankName: res.data.unionpay.bankName,
                        bankOtherName: res.data.unionpay.bankOtherName,
                        cardNum: res.data.unionpay.cardNum
                    };
                }
                if (res.data.alipay) {
                    this.fileList[0] = {
                        url: baseConfig.apiurl+res.data.alipay.img
                    };
                    this.alipay = {
                        phone: res.data.alipay.phone,
                        code: res.data.alipay.code,
                        payAccount: res.data.alipay.payAccount,
                        img:  res.data.alipay.img,
                        type: 2
                    };
                }
                if (res.data.weixin) {
                    this.fileListWeiXin[0] = {
                        url: baseConfig.apiurl+res.data.weixin.img
                    };
                    this.weixin = {
                        phone: res.data.weixin.phone,
                        code: res.data.weixin.code,
                        payAccount: res.data.weixin.payAccount,
                        img:  res.data.weixin.img,
                        type: 3
                    };
                }
                console.log(this.weixin.img)
            });
        },
        // 处理新增支付宝收款设置
        handleSubmitalipayPay() {
            if (this.alipay.img.length <= 0) {
                Toast("请上传图片");
                return;
            } else if (!this.alipay.payAccount) {
                Toast("请输入支付宝号或支付宝绑定手机号");
                return;
            } else if (!this.alipay.phone) {
                Toast("请输入手机号");
                return;
            }
            this.$api.paySething(this.alipay).then(res => {
                console.log(res);
                if (res.status === -1) {
                    Toast(res.msg);
                    return;
                }
                Toast(res.msg);
            });
        },
        handleSubmitWeixin() {
            if (this.weixin.img.length <= 0) {
                Toast("请上传图片");
                return;
            } else if (!this.weixin.payAccount) {
                Toast("请输入微信号或微信绑定手机号");
                return;
            } else if (!this.weixin.phone) {
                Toast("请输入手机号");
                return;
            }
            this.$api.paySething(this.weixin).then(res => {
                console.log(this.weixin);
                if (res.status === -1) {
                    Toast(res.msg);
                    return;
                }
                Toast(res.msg);
            });
        },
        // 处理新增银联收款设置
        handleSubmitUnionpayPay() {
            this.$api.paySething(this.unionpay).then(res => {
                if (res.status === -1) {
                    Toast(res.msg);
                    return;
                }
                Toast(res.msg);
            });
        }
    }
};
</script>

<style lang="less">
.seting-tab {
    overflow: hidden;
    border-radius: 0.2667rem /* 20/75 */;
    margin: auto;
    width: 9.2rem /* 690/75 */;
    background-color: #fff;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
    .van-tabs__wrap {
        margin-top: 15px;
        height: 2rem;
        .van-tabs__nav {
            border: 1px;
            height: 1.3333rem /* 100/75 */;
            .van-tab {
                height: 1.3333rem /* 100/75 */;
                line-height: 1.3333rem /* 100/75 */;
                color: #333;
                font-size: 0.3733rem /* 28/75 */;
                border: rgba(0, 0, 0, 0.15);
            }
            .van-tab.van-tab--active {
                background-color: #f8f8f8;
            }
        }
    }

    .van-tabs__content {
        .van-cell-group {
            padding-right: 0.4rem /* 30/75 */;
        }

        .van-cell {
            .van-field__label {
                width: 1.8rem /* 135/75 */;
                font-size: 0.3733rem /* 28/75 */;
                color: #333;
            }

            .van-cell__value {
                .van-field__control {
                    font-size: 0.3733rem /* 28/75 */;
                    color: #999;
                }
            }
        }

        .alipay {
            .ercode {
                padding: 0.8rem /* 60/75 */ 2.6667rem /* 200/75 */ 0;
                box-sizing: border-box;
                text-align: center;
                width: 100%;
                .van-uploader__wrapper {
                    width: 4rem;

                    .van-uploader__upload {
                        background-color: transparent;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 1px solid #333;
                        .van-icon {
                            margin: auto;
                            font-size: 0.5333rem /* 40/75 */;
                            color: #ddd;
                            font-weight: 400;
                        }

                        .van-image__img {
                            height: 4rem;
                            width: 4rem;
                        }
                    }
                }

                .van-uploader__preview {
                    margin: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .ercode-text {
                    font-size: 0.32rem /* 24/75 */;
                    text-align: center;
                    color: #333;
                }
            }
        }
        .weixin {
            .ercode {
                padding: 0.8rem /* 60/75 */ 2.6667rem /* 200/75 */ 0;
                box-sizing: border-box;
                text-align: center;
                width: 100%;
                .van-uploader__wrapper {
                    width: 4rem;

                    .van-uploader__upload {
                        background-color: transparent;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 1px solid #333;
                        .van-icon {
                            margin: auto;
                            font-size: 0.5333rem /* 40/75 */;
                            color: #ddd;
                            font-weight: 400;
                        }

                        .van-image__img {
                            height: 4rem;
                            width: 4rem;
                        }
                    }
                }

                .van-uploader__preview {
                    margin: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .ercode-text {
                    font-size: 0.32rem /* 24/75 */;
                    text-align: center;
                    color: #333;
                }
            }
        }
    }

    .icon {
        margin-right: 0.2667rem /* 20/75 */;

        img {
            width: 0.48rem /* 36/75 */;
            height: auto;
        }
    }

    .unionpay_icon {
        img {
            width: 0.5867rem /* 44/75 */;
        }
    }

    .van-field__button {
        span {
            cursor: pointer;
            padding-left: 0.24rem /* 18/75 */;
            border-left: 1px solid #ddd;
            font-size: 0.3733rem /* 28/75 */;
            color: #fdb428;
        }
    }

    .submit-btn {
        margin: 0.8rem /* 60/75 */ auto;
        cursor: pointer;
        border-radius: 0.1333rem /* 10/75 */;
        width: 8.4rem /* 630/75 */;
        height: 0.9333rem /* 70/75 */;
        line-height: 0.9333rem /* 70/75 */;
        font-size: 0.4267rem /* 32/75 */;
        text-align: center;
        background: #fdb428;
        color: #333;
    }
    .van-tabs--card > .van-tabs__wrap {
        height: 1.3rem;
    }
}
</style>
