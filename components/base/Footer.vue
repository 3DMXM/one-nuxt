<script lang='ts' setup>

let friendChain = [
    {
        name: '深沟导航-深沟导航_shyngo',
        url: 'http://www.shyngo.cn/',
    }
]

let year = new Date().getFullYear()

</script>
<template>
    <v-container fluid>
        <v-divider></v-divider>
        <v-container class="footer">
            <p class="copyright">小莫网盘 @2020-2023 如果网盘中有包含侵犯您权利的内容，请联系邮箱xm@xmsky.onmicrosoft.com</p>
            <p class="footer-link">
                <a href="https://blog.aoe.top/notes/490" target="_blank">下载速度慢提速方案</a>
                <a href="https://blog.aoe.top/notes/497" target="_blank">下载提示需要登录?</a>
                <a href="https://blog.aoe.top/notes/511" target="_blank">下载完不会安装?</a>
            </p>
            <p class="copyright">COPYRIGHT 2019-{{ year }} WWW.AOE.TOP ALL RIGHT RESERVED <a
                    href="https://beian.miit.gov.cn/" target="_blank" rel="nopener norefoerrer">湘ICP备2021011453号-1</a>
            </p>
        </v-container>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'BaseFooter',
}
</script>
<style lang='less' scoped>
.footer {
    font-size: 14px;

    .friend-chain {
        a {
            margin-right: 15px;
        }
    }

    .copyright {
        text-align: center;
        color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
    }

    .footer-link {
        text-align: center;

        a {
            color: aqua;
            margin: 0 0.5rem;
        }
    }

    a {
        text-decoration: none;
        color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
    }
}
</style>