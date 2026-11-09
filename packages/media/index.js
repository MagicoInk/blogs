import imagenes from './imagenes.json' with { type: 'json' };

/** Imágenes de dominio público o CC0, con su crédito (ver scripts/descargar-imagenes.py). */
export { imagenes };

/** URL pública de la imagen dentro de cada sitio (se copia a public/media/ al compilar). */
export const src = (img) => `/media/${img.archivo.replace(/^img\//, '')}`;
export const porTema = (...temas) => imagenes.filter((i) => temas.some((t) => i.temas.includes(t)));
export const imagen = (slug) => imagenes.find((i) => i.slug === slug);
/** Línea de crédito: autor, fecha y licencia. */
export const credito = (img) => [img.autor, img.fecha, img.licencia].filter(Boolean).join(' · ');
