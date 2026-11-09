// Sincroniza packages/media/img con public/media/ del sitio que se compila
// (borra primero, para que no queden imágenes retiradas de la selección).
import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
const origen = resolve(import.meta.dirname, '../packages/media/img');
const destino = resolve(process.cwd(), 'public/media');
rmSync(destino, { recursive: true, force: true });
if (existsSync(origen)) cpSync(origen, destino, { recursive: true });
