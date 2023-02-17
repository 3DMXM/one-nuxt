<script lang='ts' setup>

</script>
<template>
    <v-app>
        <SeoKit />
        <NuxtLoadingIndicator></NuxtLoadingIndicator>
        <v-main class="layout">
            <BaseHeader></BaseHeader>
            <router-view></router-view>
            <BaseFooter></BaseFooter>
        </v-main>
    </v-app>
</template>
<script lang='ts'>

export default {
    name: 'layoutsDefault',
}
</script>
<style lang='less' scoped>

</style>