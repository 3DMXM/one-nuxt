<script lang='ts' setup>
// import axios from 'axios'
import { IFileList } from '@/model/Interfaces';
import { isArray } from '@vue/shared';

const route = useRoute()
let path = computed(() => route.params.path as string[])
let list = ref<IFileList[]>([])
let readmeId = ref('')
let haveReadme = ref(false)
let Loading = ref(false)

watch(path, () => {
    GetList()
}, {
    immediate: true
})

function GetList() {

    Loading.value = true

    $fetch('/api/GetItem', {
        method: 'POST',
        body: JSON.stringify({ path: path.value })
    }).then((res) => {
        list.value = res.items
        Loading.value = false
        haveReadme.value = false
        if (Array.isArray(list.value)) {
            list.value?.forEach(item => {
                if (item.file_name == 'README.md') {
                    haveReadme.value = true
                    readmeId.value = item.file_fid
                    remove(list.value, item)
                }
            });
        }
    })
}


// 上级目录
let parent = computed(() => {
    let p = '/' + path.value.slice(0, path.value.length - 1).join('/')
    return p
})

function remove(arr: any[], val: any) {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

</script>
<template>
    <div class="list">
        <GoogleAd :key="$route.path"></GoogleAd>
        <v-row v-if="Loading" class="loading">
            <v-btn class="loading-btn" variant="text" :loading="true">
                <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                    </span>
                    正在获取文件列表...
                </template>
            </v-btn>
        </v-row>
        <v-row v-else-if="list.length > 0">
            <div class="list-body">
                <v-list lines="one" bg-color="transparent">
                    <!-- <v-list-subheader inset>文件</v-list-subheader> -->
                    <v-list-item v-if="path.length > 0" prepend-icon="mdi-arrow-up" :to="parent" title="..."></v-list-item>
                    <FilesItem v-for="item in list" :key="item.id" :item="item"></FilesItem>
                </v-list>
            </div>
        </v-row>
        <v-row v-else class="list-null">
            <v-col cols="12" class="Error">
                <v-icon icon="mdi-package-variant" class="icon"></v-icon>
                <h1 class="msg">当前文件夹为空</h1>
            </v-col>
        </v-row>
        <FilesReadme v-if="haveReadme" :readmeId="readmeId"></FilesReadme>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'FilesList',
}
</script>
<style lang='less' scoped>
.list {
    margin-top: 1rem;

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;

        .loading-btn {
            width: 250px;
            height: 250px;
            font-size: 1rem;
        }

    }


    .list-body {
        width: 100%;
    }

    .list-null {

        justify-content: center;

        .Error {
            display: flex;
            flex-direction: column;
            align-items: center;

            .icon {
                font-size: 10rem;
            }
        }
    }
}
</style>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>