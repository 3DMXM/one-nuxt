// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    css: [
        'vuetify/styles',
        '@mdi/font/css/materialdesignicons.css',
        'assets/main.less'
    ],
    build: {
        transpile: ['vuetify'],
    },
    // ssr: process.env.NODE_ENV != 'development',
    ssr: false,
    modules: [
        'nuxt-og-image',
        "nuxt-vercel-analytics",
        "nuxt-gtag",
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // 自动引入 `usePinia()`
                    'defineStore',
                    // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
                    ['defineStore', 'definePiniaStore'],
                ],
            },
        ],
    ],
    imports: {
        dirs: ['./stores'],
    },
    extends: [
        'nuxt-seo-kit'
    ],
    runtimeConfig: {
        public: {
            siteUrl: process?.env?.NUXT_PUBLIC_SITE_URL || 'https://pan.aoe.top',
            siteName: process?.env?.site_siteName || '小莫的云网盘',
            siteDescription: '小莫的网盘, 分享一些能用得上的东西~',
            language: 'zh', // prefer more explicit language codes like `en-AU` over `en`
            onedrive_root: process?.env?.onedrive_root || '/public',
            refreshToken: process?.env?.refreshToken || '',
        },
    },
    gtag: {
        id: 'G-L04H04RSS7'
    }

})
