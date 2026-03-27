export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@sidebase/nuxt-session'
  ],
  session: {
    isEnabled: true,
    expiryInSeconds: 60 * 60 * 24 * 7
  }
})
