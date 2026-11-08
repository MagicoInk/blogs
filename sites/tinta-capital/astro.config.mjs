import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { avisoPendientes } from 'directorio';

avisoPendientes('Tinta Capital');

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://tintacapital.mx',
  integrations: [sitemap()],
});
