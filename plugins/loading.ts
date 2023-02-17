import NProgress from 'nprogress';

export default defineNuxtPlugin(nuxtApp => {
    // console.log('loading.ts');

    let bar = ref<any>(null)
    nuxtApp.hook("app:beforeMount", () => {
        if (!bar.value) {
            bar.value = NProgress.configure({
                easing: 'ease',
                speed: 500,
                showSpinner: false,
                trickleSpeed: 200,
                minimum: 0.3
            })
        }
    })

    nuxtApp.hook("page:start", () => {
        bar.value?.start()

    })
    nuxtApp.hook("page:finish", () => {
        setTimeout(() => {
            bar.value?.done()
        }, 150)
    })

    nuxtApp.hook("app:mounted", () => {
        setTimeout(() => {
            bar.value?.done()
        }, 150)
    })
    nuxtApp.hook("app:error", () => {
        // 判断是否是客户端
        if (process.client) {
            bar.value?.done()
        }
    })
})
