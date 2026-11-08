// Copia las imágenes de packages/media/img a public/media/ del sitio que se compila.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const origen = resolve(import.meta.dirname, '../packages/media/img');
const destino = resolve(process.cwd(), 'public/media');
mkdirSync(destino, { recursive: true });
if (existsSync(origen)) cpSync(origen, destino, { recursive: true });
