<script lang='ts' setup>
import { IFileList } from '@/model/Interfaces';

const route = useRoute()
const props = defineProps<{
    item: IFileList
}>()

let path = computed(() => route.params.path as string[])

let Loading = ref(false)

let icon = computed(() => {
    if (props.item.file_type == 'folder') {
        return "mdi-folder-outline"
    }
    return file_ico(props.item.file_name)
})

let size = computed(() => {
    return human_filesize(props.item.file_size)
})
let f_path = computed(() => {
    return file_path(props.item.file_name)
})

// 正常显示 文件图标
function file_ico(item: string) {
    item = item.toLowerCase();
    var index = item.lastIndexOf(".");
    var suffix = item.substr(index + 1);

    if (['bmp', 'jpg', 'jpeg', 'png', 'gif'].indexOf(suffix) > -1) {
        return "mdi-image-area";
    } else if (['mp4', 'mkv', 'webm', 'avi', 'mpg', 'mpeg', 'rm', 'rmvb', 'mov', 'wmv', 'mkv', 'asf'].indexOf(suffix) > -1) {
        return "mdi-video";
    } else if (['ogg', 'mp3', 'wav', 'flac'].indexOf(suffix) > -1) {
        return "mdi-volume-high";
    } else if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'iso'].indexOf(suffix) > -1) {
        return "mdi-archive";
    } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'].indexOf(suffix) > -1) {
        return "mdi-file-pdf";
    } else if (['txt', 'md'].indexOf(suffix) > -1) {
        return "mdi-file-document";
    }

    return "mdi-file-outline";
}

// 序列化文件大小
function human_filesize(filesize: number) {
    if (null == filesize) {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    // var srcsize = filesize;
    index = Math.floor(Math.log(filesize) / Math.log(1024));
    let size: any = filesize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
}

function file_path(name: string) {
    if (path.value.length == 0) {
        return `/${name}`
    }
    let p = `/${path.value.join('/')}/${name}`
    return p
}


</script>
<template>
    <v-list-item :prepend-icon="icon" :title="item.file_name" :subtitle="`${item.file_up_time} ${size}`" class="item">
        <template v-slot:append>
            <v-btn variant="text" v-if="item.file_type == 'folder'" :loading="Loading" @click="Loading = true"
                append-icon="mdi-folder-open-outline" :to="file_path(item.file_name)">
                打开
            </v-btn>
            <v-btn variant="text" v-else :loading="Loading" @click="Loading = true" append-icon="mdi-download"
                color="#4FC3F7" :href="item.file_downloadUrl" target="_blank">下载</v-btn>
        </template>
    </v-list-item>
</template>
<script lang='ts'>

export default {
    name: 'FilesItem',
}
</script>
<style lang='less' scoped>
.item {
    // 0.5s 动画
    transition: background-color 0.3s;


    &:hover {
        background-color: rgba(255, 255, 255, .1);
    }
}
</style>