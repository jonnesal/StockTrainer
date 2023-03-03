export default defineNuxtConfig({

  modules: [
    '@nuxtjs/tailwindcss',
    'postcss-custom-properties',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@sidebase/nuxt-auth',
  ],

  googleFonts: {
    families: {
      'Ubuntu Mono': true
    }
  },

  typescript: {
    shim: false
  },

  /* serverMiddleware: [
     path: '/', handler: '~/server/api/index.js' 
  ] */

})
