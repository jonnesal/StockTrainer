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
