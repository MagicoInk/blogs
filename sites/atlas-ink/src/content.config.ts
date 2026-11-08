import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const expediciones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/expediciones' }),
  schema: z.object({
    titulo: z.string(),
    entradilla: z.string(),
    lugar: z.string(),
    numero: z.number(),
    fecha: z.coerce.date(),
    firma: z.string().default('La redacción de Atlas'),
    artistas: z.array(z.string()).default([]),
    mencionaMagico: z.boolean().default(false),
  }),
});

export const collections = { expediciones };
