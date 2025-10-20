// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: ['types/**']
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL || 'http://localhost:3000/api/v1'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
