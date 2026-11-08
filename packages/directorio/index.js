import artistas from './artistas.json' with { type: 'json' };
import estudios from './estudios.json' with { type: 'json' };
import estilos from './estilos.json' with { type: 'json' };
import contextoMexico from './contexto-mexico.json' with { type: 'json' };
import contextoMundo from './contexto-mundo.json' with { type: 'json' };
import etiquetas from './etiquetas.json' with { type: 'json' };

export { artistas, estudios, estilos, contextoMexico, contextoMundo, etiquetas };

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

/** Nombre legible de una etiqueta de estilo (por ejemplo "japones" → "Japonés"). */
export const etiqueta = (e) => etiquetas[e] ?? e;
/** Etiquetas finas del artista (o sus estilos base si no tiene). */
export const etiquetasDe = (a) => (a.etiquetas?.length ? a.etiquetas : a.estilos);
export const porEtiqueta = (e) => artistas.filter((a) => etiquetasDe(a).includes(e));
export const estudio = (slug) => estudios.find((e) => e.slug === slug);
export const artistasDeEstudio = (slug) => artistas.filter((a) => a.estudio === slug);
export const estudiosDe = (pais) => estudios.filter((e) => !e.esMagico && (!pais || e.pais === pais));
export const paises = () => [...new Set(artistas.map((a) => a.pais).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
export const esMarcador = (a) => a.nombre.startsWith('[');
/** Artistas reales (sin marcadores) de un país o de todos. */
export const reales = (pais) => artistas.filter((a) => !esMarcador(a) && (!pais || a.pais === pais));
