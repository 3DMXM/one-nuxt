<script lang='ts' setup>

</script>
<template>
    <v-card>
        <SeoKit />
        <v-layout>
            <NuxtLoadingIndicator></NuxtLoadingIndicator>
            <BaseLeftMenu></BaseLeftMenu>
            <BaseHeader></BaseHeader>
            <v-main style="min-height: 100vh;">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
                <BaseFooter></BaseFooter>
            </v-main>
        </v-layout>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'layoutsDefault',
}
</script>
<style lang='less' scoped></style>