const { Nuxt, Builder } = require('nuxt');
const app = require('express')();
const port = process.env.PORT || 3000;

// Luodaan Nuxt-instanssi
const config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(config);

// Käynnistetään kehityspalvelin (Development server) ja muodostetaan yhteys Nuxt-instanssiin
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build().catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  app.use(nuxt.render);
}

// Kuunnellaan porttia
app.listen(port, () => {
  console.log(`Palvelin käynnistyi osoitteessa http://localhost:${port}`);
});
