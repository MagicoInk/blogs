import artistas from './artistas.json' with { type: 'json' };
import estudios from './estudios.json' with { type: 'json' };
import estilos from './estilos.json' with { type: 'json' };
import contextoMexico from './contexto-mexico.json' with { type: 'json' };

export { artistas, estudios, estilos, contextoMexico };

export const estudioDe = (artista) => estudios.find((e) => e.slug === artista.estudio) ?? null;
export const esMagico = (artista) => Boolean(estudioDe(artista)?.esMagico);
export const porEstilo = (estilo) => artistas.filter((a) => a.estilos.includes(estilo));
export const porPais = (pais) => artistas.filter((a) => a.pais === pais);
export const internacionales = () => artistas.filter((a) => a.pais !== 'México');
export const porCiudad = (ciudad) => artistas.filter((a) => a.ciudad === ciudad);
/** Fichas verificadas solo con extractos de buscador: revisar fuentes antes de publicar. */
export const porRevisar = () => artistas.filter((a) => a.verificacion === 'extractos-buscador');
export const ciudades = (pais) => [...new Set(artistas.filter((a) => !pais || a.pais === pais).map((a) => a.ciudad))].filter((c) => c && !c.startsWith('['));
export const artista = (slug) => artistas.find((a) => a.slug === slug);
export const estilo = (slug) => estilos.find((e) => e.slug === slug);
/** Fichas aún sin confirmar con el artista (nombre, datos y permiso de imágenes). */
export const pendientes = () => artistas.filter((a) => !a.confirmado || !a.permisoImagenes);
export const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Texto de divulgación común a toda la red. */
export const DIVULGACION = 'Este medio es un proyecto editorial de Magico Ink. Cuando hablamos de Magico Ink o de sus artistas, lo señalamos.';

/** Avisa en consola, al compilar, cuántas fichas siguen sin confirmar. */
export function avisoPendientes(sitio) {
  const n = pendientes().length;
  if (n) console.warn(`\n[${sitio}] ${n} fichas de artistas sin confirmar o sin permiso de imágenes (packages/directorio/artistas.json).\n`);
  const r = porRevisar().length;
  if (r) console.warn(`[${sitio}] ${r} fichas verificadas solo con extractos de buscador: abre sus fuentes antes de publicar.\n`);
}

/** "Ciudad, País" sin campos vacíos ni marcadores; `sep` permite otro separador. */
export const lugar = (a, sep = ', ') => [a.ciudad, a.pais].filter((x) => x && !x.startsWith('[')).join(sep) || 'Ubicación por confirmar';
