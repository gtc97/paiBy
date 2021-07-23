<template>
    <div class="banner">
        <van-swipe :autoplay="10000" class="my-swipe" indicator-color="#FDB428">
            <van-swipe-item>
                <!-- <img style="100%" :src="bannerImgs" alt /> -->
                <van-image :src="bannerImgs" fit="cover" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    name: "GoodsDetailsBanner",
    props: {
        bannerImgs: {
            type: String,
            default() {
                return "";
            }
        }
    }
};
</script>

<!--穿透设置样式-->
<style lang="less">
.banner {
    overflow: hidden;
    border-radius: 0.266667rem /* 20/75 */;
    margin: auto;
    // width: 9.2rem /* 690/75 */;
    height: 9.2rem /* 350/75 */;
    .my-swipe {
        height: 100%;
        .van-swipe-item {
            width: 100%;
            height: 100%;
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;
            // background-color: #39a9ed;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .van-swipe__indicator {
            border-radius: 0.04rem /* 3/75 */;
            // width: 0.16rem /* 12/75 */;
            // height: 0.08rem /* 6/75 */;
            opacity: 1;
            background-color: #fff;
            &.van-swipe__indicator--active {
                width: 0.346667rem /* 26/75 */;
            }
        }
    }
}
.van-image {
    width: 100%;
    height: 100%;
}
</style>

