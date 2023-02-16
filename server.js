const express = require('express');

// Luo uusi Express.js -sovellus
const app = express();

// Reititin, joka vastaa `/api/test` -polkuun
app.get('/test', (req, res) => {
  res.send('Hello from Express.js!');
});

// Varmista, että Nuxt.js serverMiddleware toimii
module.exports = app;
