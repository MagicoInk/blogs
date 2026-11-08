import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const top = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/top' }),
  schema: z.object({
    titulo: z.string(),
    gancho: z.string(),
    fecha: z.coerce.date(),
    color: z.enum(['rojo', 'azul', 'verde', 'naranja']),
    puestos: z.array(z.object({
      titulo: z.string().optional(),
      artista: z.string().optional(),
      porque: z.string(),
    })),
  }),
});

export const collections = { top };
