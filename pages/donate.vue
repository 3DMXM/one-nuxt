<script lang='ts' setup>
const { zfb, wx, lazy_img } = useMain()

useSeoMeta({
    title: '给小莫投食',
})

</script>
<template>
    <v-container class="donate">
        <v-row>
            <v-col cols="12">
                <h1>给小莫投食</h1>
                <p>如果小莫的一些作品对你有用,那么就顺便给快要饿死的小莫投喂点零食吧~</p>
            </v-col>
        </v-row>
        <v-row class="qr">
            <v-col cols="6" md="3">
                <v-img :src="wx" :lazy-src="lazy_img" :aspect-ratio="1 / 1" alt="微信"></v-img>
                <p class="des">微信</p>
            </v-col>
            <v-col cols="6" md="3">
                <v-img :src="zfb" :lazy-src="lazy_img" :aspect-ratio="1 / 1" alt="支付宝"></v-img>
                <p class="des">支付宝</p>
            </v-col>
        </v-row>
        <div class="footer">
            <div class="comment">
                <v-img src="comment.png" :aspect-ratio="162 / 75" :eager="false"></v-img>
            </div>
        </div>

    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'donate',
}
</script>
<style lang='less' scoped>
.donate {
    h1 {
        text-align: center;
    }

    p {
        color: rgb(156, 156, 156);
        text-align: center;
    }

    .qr {
        display: flex;
        justify-content: center;
    }

    .footer {
        padding: 0 25px;
        text-align: right;
        display: flex;
        flex-direction: row-reverse;

        .comment {
            width: 162px;
        }
    }
}
</style>