// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css'
    ],
    devtools: { enabled: true },
    modules: [
        '@nuxt/test-utils/module',
        '@nuxt/ui'
    ],
    typescript: {
        strict: true,
        typeCheck: true
    }
});
