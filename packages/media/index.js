import { readFileSync, existsSync } from 'node:fs';

const ruta = new URL('./imagenes.json', import.meta.url);
/** Imágenes de dominio público o CC0, con su crédito (ver scripts/descargar-imagenes.py). */
export const imagenes = existsSync(ruta) ? JSON.parse(readFileSync(ruta, 'utf8')) : [];

/** URL pública de la imagen dentro de cada sitio (se copia a public/media/ al compilar). */
export const src = (img) => `/media/${img.archivo.replace(/^img\//, '')}`;
export const porTema = (...temas) => imagenes.filter((i) => temas.some((t) => i.temas.includes(t)));
export const imagen = (slug) => imagenes.find((i) => i.slug === slug);
/** Línea de crédito: autor, fecha y licencia. */
export const credito = (img) => [img.autor, img.fecha, img.licencia].filter(Boolean).join(' · ');
