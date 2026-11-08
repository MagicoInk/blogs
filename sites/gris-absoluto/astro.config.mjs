import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { avisoPendientes } from 'directorio';

avisoPendientes('Gris Absoluto');

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://grisabsoluto.com',
  integrations: [sitemap()],
});
