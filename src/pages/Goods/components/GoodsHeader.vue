<template>
    <van-nav-bar :title="title" id="header" class="notice-title" @click-left="handleBack">
        <template #left>
            <van-icon name="arrow-left" size="0.4rem" color="#333" />
        </template>
    </van-nav-bar>
</template>

<script>
export default {
    name: "GooodsHeader",
    data() {
        return {
            title: this.$route.query.title
        };
    },
    methods: {
        handleBack() {
            this.$router.go(-1);
        }
    }
};
</script>
