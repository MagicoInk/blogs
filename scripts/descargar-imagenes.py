#!/usr/bin/env python3
"""Descarga, con pausas amplias, las imágenes de dominio público o CC0 listadas en
packages/media/seleccion.tsv (slug<TAB>File:Título en Commons<TAB>temas) y escribe
packages/media/imagenes.json con su crédito.

Antes de guardar cada archivo vuelve a comprobar la licencia con la API de Wikimedia
Commons. Se puede volver a ejecutar: se salta lo que ya está descargado.

Uso: python3 scripts/descargar-imagenes.py            (con verificación por la API)
     python3 scripts/descargar-imagenes.py --directo   (si la API está limitada: baja la
         miniatura estándar sin consultar la API y marca la imagen como pendiente de
         reverificar; la próxima ejecución normal completa autor, fecha y licencia)
"""
import hashlib
import html
import json
import re
import subprocess
import sys
import time
import urllib.parse
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
MEDIA = RAIZ / "packages" / "media"
IMG = MEDIA / "img"
MANIFIESTO = MEDIA / "imagenes.json"
UA = "MagicoRedEditorial/1.0 (sitio editorial sobre tatuaje; descarga puntual de imagenes de dominio publico)"
PAUSA = 20          # segundos entre peticiones
ESPERA_429 = 900    # segundos si Wikimedia pide esperar y no dice cuánto
ANCHO = 960         # tamaño estándar de miniatura de Wikimedia

LICENCIAS_OK = re.compile(r"(public domain|^pd\b|pd-|cc0|no known copyright)", re.I)


def curl(url: str, destino: Path | None = None) -> tuple[int, bytes, dict]:
    """Devuelve (código HTTP, cuerpo, cabeceras)."""
    cab = MEDIA / ".cabeceras"
    args = ["curl", "-sS", "-m", "60", "-A", UA, "-D", str(cab), "-w", "%{http_code}", url]
    args += ["-o", str(destino)] if destino else ["-o", "-"]
    r = subprocess.run(args, capture_output=True)
    salida = r.stdout
    codigo = int(salida[-3:] or b"0") if salida[-3:].isdigit() else 0
    cuerpo = b"" if destino else salida[:-3]
    cabeceras = {}
    if cab.exists():
        for linea in cab.read_text(errors="ignore").splitlines():
            if ":" in linea:
                k, v = linea.split(":", 1)
                cabeceras[k.strip().lower()] = v.strip()
    return codigo, cuerpo, cabeceras


def pedir(url: str, destino: Path | None = None):
    """Pide una URL respetando los 429 de Wikimedia."""
    while True:
        codigo, cuerpo, cabeceras = curl(url, destino)
        if codigo == 429 or codigo == 0:
            espera = int(cabeceras.get("retry-after", ESPERA_429) or ESPERA_429)
            espera = max(espera, 120)
            print(f"  429/sin respuesta, espero {espera}s", flush=True)
            time.sleep(espera)
            continue
        time.sleep(PAUSA)
        return codigo, cuerpo


def limpiar(texto: str) -> str:
    texto = re.sub(r"<[^>]+>", " ", texto or "")
    return re.sub(r"\s+", " ", html.unescape(texto)).strip()


def url_miniatura(titulo: str, ancho: int = ANCHO) -> str:
    nombre = titulo.removeprefix("File:").replace(" ", "_")
    h = hashlib.md5(nombre.encode()).hexdigest()
    q = urllib.parse.quote(nombre)
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{ancho}px-{q}"


def directo(manifiesto: list) -> None:
    """Descarga sin la API: miniatura estándar, crédito provisional."""
    hechos = {m["slug"] for m in manifiesto}
    for linea in (MEDIA / "seleccion.tsv").read_text().splitlines():
        if not linea.strip():
            continue
        slug, titulo, temas = linea.split("\t")
        if slug in hechos:
            continue
        nombre = titulo.removeprefix("File:")
        ext = ".png" if nombre.lower().endswith(".png") else ".jpg"
        destino = IMG / f"{slug}{ext}"
        codigo, _ = pedir(url_miniatura(titulo), destino)
        if codigo != 200 or destino.stat().st_size < 5000 or destino.read_bytes()[:15].startswith(b"<!DOCTYPE"):
            # imágenes más angostas que 960 px: Wikimedia no genera miniatura; se intenta 640
            codigo, _ = pedir(url_miniatura(titulo, 640), destino)
            if codigo != 200 or destino.stat().st_size < 5000:
                destino.unlink(missing_ok=True)
                print(f"  {slug}: descarga {codigo}, lo dejo para la próxima", flush=True)
                continue
        manifiesto.append({
            "slug": slug, "archivo": f"img/{destino.name}", "tituloCommons": nombre,
            "descripcion": "", "autor": "", "fecha": "", "licencia": "Dominio público o CC0",
            "fuente": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(nombre.replace(" ", "_")),
            "temas": temas.split(","), "ancho": None, "alto": None, "pendienteVerificar": True,
        })
        MANIFIESTO.write_text(json.dumps(manifiesto, ensure_ascii=False, indent=2) + "\n")
        print(f"  ok {slug} ({destino.stat().st_size // 1024} KB)", flush=True)


def main() -> int:
    IMG.mkdir(parents=True, exist_ok=True)
    manifiesto = json.loads(MANIFIESTO.read_text()) if MANIFIESTO.exists() else []
    if "--directo" in sys.argv:
        directo(manifiesto)
        print(f"Listo: {len(manifiesto)} imágenes (pendientes de reverificar con la API)", flush=True)
        return 0
    # Las descargadas en modo directo se reverifican aquí (licencia, autor, fecha).
    manifiesto = [m for m in manifiesto if not m.get("pendienteVerificar")] + [m for m in manifiesto if m.get("pendienteVerificar")]
    hechos = {m["slug"] for m in manifiesto if not m.get("pendienteVerificar")}
    rechazados = []
    for linea in (MEDIA / "seleccion.tsv").read_text().splitlines():
        if not linea.strip():
            continue
        slug, titulo, temas = linea.split("\t")
        if slug in hechos:
            continue
        print(f"→ {slug}", flush=True)
        api = ("https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo"
               f"&iiprop=url|extmetadata|size&iiurlwidth={ANCHO}&titles=" + urllib.parse.quote(titulo))
        codigo, cuerpo = pedir(api)
        if codigo != 200:
            print(f"  API {codigo}, lo dejo para la próxima", flush=True)
            continue
        paginas = json.loads(cuerpo)["query"]["pages"]
        info = next(iter(paginas.values())).get("imageinfo", [None])[0]
        if not info:
            rechazados.append((slug, "no existe"))
            continue
        meta = info.get("extmetadata", {})
        licencia = limpiar(meta.get("LicenseShortName", {}).get("value", ""))
        if not LICENCIAS_OK.search(licencia):
            rechazados.append((slug, f"licencia: {licencia}"))
            print(f"  rechazada por licencia: {licencia}", flush=True)
            manifiesto = [m for m in manifiesto if m["slug"] != slug]
            for viejo in IMG.glob(f"{slug}.*"):
                viejo.unlink()
            MANIFIESTO.write_text(json.dumps(manifiesto, ensure_ascii=False, indent=2) + "\n")
            continue
        url = info.get("thumburl") or info["url"]
        ext = ".png" if url.lower().endswith(".png") else ".jpg"
        destino = IMG / f"{slug}{ext}"
        codigo, _ = pedir(url, destino)
        if codigo != 200 or destino.stat().st_size < 5000:
            destino.unlink(missing_ok=True)
            print(f"  descarga {codigo}, lo dejo para la próxima", flush=True)
            continue
        manifiesto = [m for m in manifiesto if m["slug"] != slug]
        manifiesto.append({
            "slug": slug,
            "archivo": f"img/{destino.name}",
            "tituloCommons": titulo.removeprefix("File:"),
            "descripcion": limpiar(meta.get("ImageDescription", {}).get("value", ""))[:400],
            "autor": limpiar(meta.get("Artist", {}).get("value", "")) or "Autor desconocido",
            "fecha": limpiar(meta.get("DateTimeOriginal", {}).get("value", "")),
            "licencia": "CC0" if "cc0" in licencia.lower() else "Dominio público",
            "fuente": info.get("descriptionurl", ""),
            "temas": temas.split(","),
            "ancho": info.get("thumbwidth") or info.get("width"),
            "alto": info.get("thumbheight") or info.get("height"),
        })
        MANIFIESTO.write_text(json.dumps(manifiesto, ensure_ascii=False, indent=2) + "\n")
        print(f"  ok ({destino.stat().st_size // 1024} KB, {licencia})", flush=True)
    (MEDIA / ".cabeceras").unlink(missing_ok=True)
    print(f"Listo: {len(manifiesto)} imágenes; rechazadas: {rechazados}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
