export default {

  modules: [
    '@nuxtjs/tailwindcss',
    'postcss-custom-properties',
    'nuxt-icon',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Ubuntu Mono': true
    }
  },

  serverMiddleware: [
    { path: '/', handler: '~/api/index.js' }
  ]

}
