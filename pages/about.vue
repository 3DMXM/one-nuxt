<script lang='ts' setup>
import marked from '@/model/marked';

let readme = ref('')


fetch('/README.md')
    .then(res => res.text())
    .then(res => {
        readme.value = marked(res)
    })

useSeoMeta({
    title: '关于小莫',
})

</script>
<template>
    <v-container class="about">
        <div class="markdown-body" v-html="readme"></div>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'about',
}
</script>
<style lang='less' scoped>
.about {
    padding: 10px;

    .markdown-body {
        background-color: transparent;


    }
}
</style>