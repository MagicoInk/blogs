// Junta los 5 sitios compilados en una sola carpeta navegable sin servidor:
// convierte los enlaces absolutos ("/guias/x/") en relativos ("../guias/x/index.html").
// Uso: npm run build && node scripts/vista-previa.mjs [carpeta-salida]
import fs from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
const salida = path.resolve(process.argv[2] ?? path.join(raiz, 'vista-previa'));
const sitios = ['tinta-capital', 'atlas-ink', 'gris-absoluto', 'trazo-fino', 'color-bravo'];

fs.rmSync(salida, { recursive: true, force: true });

function resolver(dirSitio, destino) {
  const [ruta, ancla = ''] = destino.split('#');
  const limpia = ruta.replace(/^\//, '');
  const candidatos = ruta.endsWith('/') || ruta === '/'
    ? [path.join(limpia, 'index.html')]
    : [limpia, `${limpia}.html`, path.join(limpia, 'index.html')];
  const hallado = candidatos.find((c) => fs.existsSync(path.join(dirSitio, c)) && fs.statSync(path.join(dirSitio, c)).isFile());
  return { archivo: hallado ?? limpia, ancla };
}

function recorrer(dir, fn) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    e.isDirectory() ? recorrer(p, fn) : fn(p);
  }
}

for (const sitio of sitios) {
  const origen = path.join(raiz, 'sites', sitio, 'dist');
  const destino = path.join(salida, sitio);
  fs.cpSync(origen, destino, { recursive: true });
  recorrer(destino, (archivo) => {
    if (!archivo.endsWith('.html')) return;
    const carpeta = path.dirname(archivo);
    const html = fs.readFileSync(archivo, 'utf8').replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (_, attr, url) => {
      const { archivo: objetivo, ancla } = resolver(destino, url);
      let rel = path.relative(carpeta, path.join(destino, objetivo)) || 'index.html';
      return `${attr}="${rel}${ancla ? `#${ancla}` : ''}"`;
    });
    fs.writeFileSync(archivo, html);
  });
  for (const extra of fs.readdirSync(destino)) if (extra.startsWith('sitemap')) fs.rmSync(path.join(destino, extra));
}
console.log(`Vista previa en ${salida}`);
