<script lang='ts' setup>

let lists = [
    {
        title: '首页',
        icon: "mdi-home",
        path: '/',
        target: false
    },
    {
        title: '网盘',
        icon: "mdi-cloud-download-outline",
        path: 'https://pan.aoe.top',
        target: false
    },
    {
        title: "游戏",
        icon: "mdi-controller",
        path: "https://game.aoe.top",
        target: false
    },
    {
        title: '博客',
        icon: "mdi-post-outline",
        path: 'https://blog.aoe.top',
        target: true
    },
    {
        title: '投喂',
        icon: "mdi-heart",
        path: '/donate',
        target: false,
    }
]

const main = useMain()



</script>
<template>
    <v-navigation-drawer v-model="main.leftMenu" :rail="main.leftMenuRail" class="left-menu">
        <v-list>
            <v-list-item v-for="item in lists" :key="item.path" :href="item.path" :prepend-icon="item.icon"
                :title="item.title" :target="item.target ? '_blank' : '_self'">
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <Income :key="$route.path"></Income>
            <v-list>
                <v-list-item @click="main.leftMenuRail = !main.leftMenuRail"
                    :prepend-icon="main.leftMenuRail ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'">
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>
<script lang='ts'>

export default {
    name: 'BaseLeftMenu',
}
</script>
<style lang='less' scoped></style>