<script lang='ts' setup>

const route = useRoute()
let path = computed(() => route.params.path as string[])

let title = computed(() => {
    if (path.value.length == 0) {
        return '首页'
    }
    return path.value.join('/')
})

useSeoMeta({
    title: title
})

</script>
<template>
    <v-container>
        <FilesBreadcrumbs></FilesBreadcrumbs>
        <v-no-ssr>
            <FilesList></FilesList>
        </v-no-ssr>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'Index',
}
</script>
<style lang='less' scoped>
.index {
    min-height: calc(100vh - 300px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .Timo {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        .logo {
            box-shadow: 0 0 2rem #42b883;
            cursor: pointer;
            // 0.5s 动画
            transition: all 0.5s;

            &:hover {
                box-shadow: 0 0 3rem #42b883;
            }
        }
    }

    h1 {
        margin-top: 0.5rem;
    }

    h2 {
        color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
        text-align: center;
    }
}
</style>