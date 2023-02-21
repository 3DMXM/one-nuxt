<script lang='ts' setup>
import { useTheme } from "vuetify";
const theme = useTheme();
theme.global.name.value = "dark";

useHead({
    script: [
        // 引入百度统计 https://hm.baidu.com/hm.js?0fba1f3013c5565107a4b39759647150
        {
            src: 'https://hm.baidu.com/hm.js?0fba1f3013c5565107a4b39759647150',
            async: true,
            defer: true,
        },
        // 引入Google广告
        {
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5978423097771370',
            async: true,
            defer: true,
        }
    ],
})

</script>
<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script lang='ts'>

export default {
    name: 'App',
}
</script>
<style lang='less' scoped></style>