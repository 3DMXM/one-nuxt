<script lang='ts' setup>
</script>
<template>
    <v-app-bar>
        <v-row>
            <v-col cols="12">
                <FilesBreadcrumbs></FilesBreadcrumbs>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
<script lang='ts'>

export default {
    name: 'BaseHeader',
}
</script>
<style lang='less' scoped>
.header {
    display: flex;
    justify-content: space-between;
}
</style>