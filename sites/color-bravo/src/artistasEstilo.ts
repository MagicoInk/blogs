import { artistas, etiquetasDe } from 'directorio';
/** Artistas del directorio que encajan con cada estilo de Color Bravo. */
export const artistasDeEstilo = (slug: string) =>
  artistas.filter((a) => {
    const t = etiquetasDe(a);
    if (slug === 'realismo-color') return a.estilos.includes('realismo') && a.estilos.includes('color');
    return t.includes(slug);
  });
