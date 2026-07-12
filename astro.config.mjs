import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://outofnoise.netlify.app',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Atkinson Hyperlegible',
      cssVariable: '--font-atkinson',
    },
  ],
});
