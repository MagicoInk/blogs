// Junta los sitios compilados en una carpeta navegable sin servidor:
// convierte los enlaces absolutos ("/guias/x/") en relativos ("../guias/x/index.html")
// y guarda las imágenes una sola vez en <salida>/media/.
//
// Uso: npm run build && node scripts/vista-previa.mjs [carpeta-salida] [--sitios a,b,c] [--plano]
//   --sitios  lista de sitios a incluir (por defecto, los cinco)
//   --plano   con un solo sitio, lo escribe en la raíz de la salida en lugar de en una subcarpeta
import fs from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const opcion = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const posicional = args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--sitios'));
const salida = path.resolve(posicional ?? path.join(raiz, 'vista-previa'));
const sitios = (opcion('--sitios') ?? 'tinta-capital,atlas-ink,gris-absoluto,trazo-fino,color-bravo').split(',');
const plano = args.includes('--plano') && sitios.length === 1;
const media = path.join(salida, 'media');

fs.rmSync(salida, { recursive: true, force: true });
fs.mkdirSync(media, { recursive: true });

function resolver(dirSitio, destino) {
  const [ruta, ancla = ''] = destino.split('#');
  const limpia = ruta.replace(/^\//, '');
  if (limpia.startsWith('media/')) return { absoluto: path.join(salida, limpia), ancla };
  const candidatos = ruta.endsWith('/') || ruta === '/'
    ? [path.join(limpia, 'index.html')]
    : [limpia, `${limpia}.html`, path.join(limpia, 'index.html')];
  const hallado = candidatos.find((c) => fs.existsSync(path.join(dirSitio, c)) && fs.statSync(path.join(dirSitio, c)).isFile());
  return { absoluto: path.join(dirSitio, hallado ?? limpia), ancla };
}

function recorrer(dir, fn) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    e.isDirectory() ? recorrer(p, fn) : fn(p);
  }
}

for (const sitio of sitios) {
  const origen = path.join(raiz, 'sites', sitio, 'dist');
  const destino = plano ? salida : path.join(salida, sitio);
  fs.cpSync(origen, destino, { recursive: true, filter: (o) => !o.startsWith(path.join(origen, 'media')) });
  const mediaSitio = path.join(origen, 'media');
  if (fs.existsSync(mediaSitio)) fs.cpSync(mediaSitio, media, { recursive: true });
  recorrer(destino, (archivo) => {
    if (!archivo.endsWith('.html') || archivo.startsWith(media)) return;
    const carpeta = path.dirname(archivo);
    const html = fs.readFileSync(archivo, 'utf8').replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (_, attr, url) => {
      const { absoluto, ancla } = resolver(destino, url);
      const rel = path.relative(carpeta, absoluto) || 'index.html';
      return `${attr}="${rel}${ancla ? `#${ancla}` : ''}"`;
    });
    fs.writeFileSync(archivo, html);
  });
  for (const extra of fs.readdirSync(destino)) if (extra.startsWith('sitemap')) fs.rmSync(path.join(destino, extra));
}
console.log(`Vista previa en ${salida}`);
