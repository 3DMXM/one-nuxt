<script lang='ts' setup>


const route = useRoute()
let path = computed(() => route.params.path as string[])

console.log(path.value);


let item = computed(() => {
    let items = [{
        title: "首页",
        to: '/'
    }]

    if (!path.value) {
        return items
    }

    for (let i = 0; i < path.value.length; i++) {
        let to = ''
        for (let j = 0; j <= i; j++) {
            to += '/' + path.value[j]
        }
        items.push({
            title: path.value[i],
            to: to
        })
    }
    return items
})

</script>
<template>
    <v-breadcrumbs :items="item" divider=">">
        <template v-slot:prepend>
            <v-icon size="small" icon="mdi-home"></v-icon>
        </template>
    </v-breadcrumbs>
</template>
<script lang='ts'>

export default {
    name: 'FilesBreadcrumbs',
}
</script>
<style lang='less' scoped></style>