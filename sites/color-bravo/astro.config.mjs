import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { avisoPendientes } from 'directorio';

avisoPendientes('Color Bravo');

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://colorbravo.com',
  integrations: [sitemap()],
});
