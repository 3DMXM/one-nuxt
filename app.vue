<script lang='ts' setup>
import { useTheme } from "vuetify";
const theme = useTheme();
theme.global.name.value = "dark";

useHead({
    // 引入百度统计 https://hm.baidu.com/hm.js?0fba1f3013c5565107a4b39759647150
    script: [
        {
            src: 'https://hm.baidu.com/hm.js?0fba1f3013c5565107a4b39759647150',
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
<style lang='less' scoped>

</style>