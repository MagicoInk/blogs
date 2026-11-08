import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notas' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    temas: z.array(z.string()),
    extracto: z.string(),
    dibujo: z.enum(['rosa', 'luna', 'ola', 'golondrina']),
    artistas: z.array(z.string()).default([]),
    mencionaMagico: z.boolean().default(false),
  }),
});

export const collections = { notas };
