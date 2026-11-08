import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tecnica = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tecnica' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    nivel: z.enum(['Básico', 'Intermedio', 'Avanzado']),
    orden: z.number(),
    fecha: z.coerce.date(),
    claves: z.array(z.string()).max(4),
    fuentes: z.array(z.object({ titulo: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { tecnica };
