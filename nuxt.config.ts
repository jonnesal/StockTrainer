import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  // ...
  serverMiddleware: [
    {
      // Tässä määritellään polku, joka vastaa Express-sovelluksen juuripolkua
      path: '/',
      // Huomaa, että polku `./` viittaa root-kansioon
      handler: './server.js',
    },
  ],
  // ...
};

export default config;
