import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { avisoPendientes } from 'directorio';

avisoPendientes('Trazo Fino');

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://trazofino.com',
  integrations: [sitemap()],
});
