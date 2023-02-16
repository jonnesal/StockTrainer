
module.exports = {

  // ...
  serverMiddleware: [
    // Tässä lisätään Express.js -sovellus serverMiddleware -kenttään.
    {
      path: '/api',
      handler: '~/server.js',
    },
  ],
  // ...
};

module.exports = {
  mode: 'universal', // or 'spa' for a single-page application
  // other config options here...
}
