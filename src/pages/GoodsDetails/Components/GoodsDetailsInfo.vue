<template>
    <div class="info-wrap">
        <div class="info">
            <h2 class="title">{{ goodDetails.goodsName }}</h2>
            <p class="price">{{ goodDetails.goodsPrice }}</p>
        </div>
        <div class="img-details">
            <h3 class="details-title">图文详情</h3>
            <div class="img-list" v-html="goodDetails.goodsContent" />
            <div class="foot">
                <div class="purchase-btn" @click="handleCreateOrder">点击下单</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";

export default {
    name: "GoodsDetailsInfo",
    props: {
        goodDetails: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        handleCreateOrder() {
            console.log(this.$route.params.id);
            this.$api
                .createOrder({ id: this.$route.params.id, num: 1 })
                .then(res => {
                    console.log(res);
                    if (res.status === 1) {
                        Toast("订单创建成功");
                        this.$router.push({ path: "/pay?active=wait" });
                    } else {
                        Toast(res.msg);
                    }
                });
        }
    }
};
</script>
<style lang="less">
.info-wrap {
    .img-details {
        .img-list {
            p {
                line-height: 0.6667rem /* 50/75 */;
                padding: 0 0.2667rem /* 20/75 */;
                margin-top: 0.1333rem /* 10/75 */;
            }
        }
    }
}
</style>

<style lang="less" scoped>
.info-wrap {
    .info {
        background-color: #fff;
        padding: 0.4rem /* 30/75 */ 0.4rem /* 30/75 */ 0;
        .title {
            font-size: 0.3733rem /* 28/75 */;
            color: #333;
        }
        .price {
            margin-top: 0.3333rem /* 25/75 */;
            font-size: 0.4267rem /* 32/75 */;
            color: #ed3017;
            padding-bottom: 0.3867rem /* 29/75 */;
        }
    }
    .img-details {
        max-width: 100%;
        box-sizing: border-box;
        padding: 0.4rem /* 30/75 */;
        padding-bottom: 3rem;
        min-height: 9.16rem /* 687/75 */;
        background-color: #f5f5f5;
        .details-title {
            height: 1.1733rem /* 88/75 */;
            text-align: center;
            color: #333;
            font-size: 0.4267rem /* 32/75 */;
        }
        .img-list {
            img {
                margin: 0 auto 0.4rem /* 30/75 */;
                display: block;
                width: 9.1867rem /* 689/75 */;
            }
            font-size: 0.4267rem /* 32/75 */;
        }
        .foot {
            width: 100%;
            height: 2rem;
            position: fixed;
            bottom: 0rem;
            right: 0rem;
            background-color: #fff;
            .purchase-btn {
                cursor: pointer;
                position: fixed;
                bottom: 0.6rem;
                right: 0.8rem;
                margin: auto;
                border-radius: 0.1333rem /* 10/75 */;
                width: 8.4rem /* 630/75 */;
                height: 0.9333rem /* 70/75 */;
                line-height: 0.9333rem /* 70/75 */;
                text-align: center;
                font-size: 0.4267rem /* 32/75 */;
                color: #333;
                background: #fdb428;
            }
        }
    }
}
</style>
