<script lang='ts' setup>
import axios from 'axios'
import marked from '@/model/marked';

const props = defineProps<{
    readmeId: string
}>()

let readme = ref('')

watch(props, () => {
    GetReadme()
}, {
    immediate: true
})

function GetReadme() {
    axios.post('/api/GetReadme', { fid: props.readmeId }).then(({ data }) => {
        readme.value = marked(data.data)
    })
}

</script>
<template>
    <div class="readme">
        <div class="name">
            <v-chip variant="elevated" prepend-icon="mdi-material-design">README.md</v-chip>
        </div>
        <div class="markdown-body" v-html="readme"></div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'FilesRedme',
}
</script>
<style lang='less' scoped>
.readme {
    padding: 1.5rem;

    .name {
        margin-bottom: 1rem;
    }

    .markdown-body {
        background-color: transparent;
    }
}
</style>