import { Nuxt, Builder } from 'nuxt';
import express from 'express';
import app from './server';
const port = process.env.PORT || 3000;

// Luo Nuxt-instanssi
import config from '../nuxt.config';
config.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(config);

// Käynnistä Nuxt Builder, jos sovellus ei ole tuotannossa
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

// Liitä Nuxt käyttämään serverMiddleware-kenttää
app.use(nuxt.render);

// Kuuntele porttia
app.listen(port, () => {
  console.log(`Palvelin käynnistyi osoitteessa http://localhost:${port}`);
});
