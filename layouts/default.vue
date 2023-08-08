<script lang='ts' setup>


const permissions = useCookie<boolean>('permissions')

let loading = ref(false)

function checking() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        permissions.value = true
    }, 3000)
}

</script>
<template>
    <v-card v-if="permissions">
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
    <div v-else class="login">
        <Income :key="$route.path"></Income>
        <h1>请完成下方验证以确认你不是机器人</h1>
        <v-btn @click="checking" :loading="loading">点击开始验证</v-btn>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'layoutsDefault',
}
</script>
<style lang='less' scoped>
.login {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>