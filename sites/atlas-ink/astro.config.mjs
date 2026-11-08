import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { avisoPendientes } from 'directorio';

avisoPendientes('Atlas Ink');

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://atlasink.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
