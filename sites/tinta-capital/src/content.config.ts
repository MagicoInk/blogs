import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: z.object({
    titulo: z.string(),
    bajada: z.string(),
    seccion: z.enum(['Guías', 'Listas', 'Ciudades', 'Cultura']),
    fecha: z.coerce.date(),
    autor: z.string().default('Redacción Tinta Capital'),
    artistas: z.array(z.string()).default([]),
    mencionaMagico: z.boolean().default(false),
    destacada: z.boolean().default(false),
    portada: z.string().optional(),
    fuentes: z.array(z.object({ titulo: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { guias };
