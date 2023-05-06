export const useMain = defineStore('main', {
    state: () => ({
        lazy_img: '/lazy_img.webp',
        wx: 'https://mod.3dmgame.com/static/upload/mod/202302/MOD63eb01f0e3e14.png@webp',
        zfb: 'https://mod.3dmgame.com/static/upload/mod/202302/MOD63eb01f0e2912.png@webp',
        logo: 'https://mod.3dmgame.com/static/upload/mod/202211/MOD6386ccf455c06.png@webp',
        leftMenu: true,
        leftMenuRail: false,

    }),

    getters: {
        // 相当于计算属性
        // double: (state) => state.n * 2,
    },

    actions: {

    },
})
