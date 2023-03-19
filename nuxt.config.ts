export default defineNuxtConfig({
    app: {
        head: {
            bodyAttrs: {
                class: 'dark',
            },
        },
    },
    modules: [
        'nuxt-windicss',
        '@tailvue/nuxt',
    ],
})
