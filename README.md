# Red editorial Magico Ink

Cinco sitios editoriales sobre tatuaje, cada uno con su marca, diseño, estructura de URLs y voz propia. Todos declaran que son un proyecto editorial de Magico Ink (pie de página, página "Quiénes somos" y un aviso en cada nota donde aparece Magico Ink o alguno de sus artistas).

| Sitio | Carpeta | Enfoque | Diseño | Voz | Estructura |
| --- | --- | --- | --- | --- | --- |
| Tinta Capital | `sites/tinta-capital` | México | Revista urbana amarilla y negra | Chilanga, directa, listas | `/guias/…`, `/ciudades/…` |
| Atlas Ink | `sites/atlas-ink` | Mundial | Crónica larga, serif, papel crema | Literaria, crónica | `/expediciones/…`, `/artistas/…`, `/indice` |
| Gris Absoluto | `sites/gris-absoluto` | Realismo negro y gris | Galería oscura con riel lateral | Técnica y precisa | `/tecnica/…`, `/sala/`, `/glosario/` |
| trazo fino | `sites/trazo-fino` | Fine line / microrrealismo | Diario minimalista pastel | Íntima, primera persona | `/notas/…`, `/artistas/`, `/preguntas/` |
| Color Bravo | `sites/color-bravo` | Color / neotradicional | Brutalista, colores planos | Energética, tops | `/top/…`, `/estilos/…`, `/quiz/` |

## Datos compartidos

`packages/directorio/` contiene la única fuente de artistas y estudios:

- `artistas.json`: nombre, estudio, ciudad, país, estilos, Instagram, bio, imágenes, `confirmado` y `permisoImagenes`.
- `estudios.json`: estudios (Magico Ink tiene `esMagico: true`, lo que activa el aviso de divulgación automáticamente).
- `estilos.json`: estilos usados para filtrar.

Hay 44 artistas reales con `bio`, `datos` y `fuentes`, más 3 marcadores de Magico Ink (`magico-artista-*`). `contexto-mexico.json` reúne datos sobre convenciones, regulación, historia y cifras de la escena mexicana.

**Verificación:** los datos se comprobaron con extractos de buscador, porque la red del entorno de redacción no permitía abrir las páginas. Cada ficha lleva `verificacion: "extractos-buscador"`. Al compilar, cada sitio avisa cuántas fichas faltan por revisar. Abre las URLs de `fuentes`, corrige lo que haga falta y luego quita ese campo.

### Antes de publicar

1. Revisa las fuentes de cada ficha y de cada artículo (campo `fuentes` del frontmatter), sobre todo las fechas de convenciones de 2026 y las cifras.
2. Avisa a los artistas incluidos o pide su autorización. Marca `confirmado` y, si te dan fotos, `permisoImagenes` en `true`.
3. Completa los datos de Magico Ink (ciudad, Instagram) y de sus artistas.
4. Define el dominio de cada sitio con la variable `SITE_URL` (o en su `astro.config.mjs`).

## Comandos

```bash
npm install
npm run build              # compila los 5 sitios (cada uno en sites/<sitio>/dist)
npm run dev:mexico         # Tinta Capital
npm run dev:mundial        # Atlas Ink
npm run dev:realismo       # Gris Absoluto
npm run dev:fineline       # trazo fino
npm run dev:color          # Color Bravo
```

Cada sitio es estático y se despliega por separado (Cloudflare Pages, Vercel o Netlify), con directorio raíz `sites/<sitio>`, comando `npm run build` y salida `dist`.

## Contenido

Cada sitio usa colecciones de contenido de Astro en `src/content/`. Para publicar una nota nueva, agrega un `.md` con el frontmatter del esquema en `src/content.config.ts`. Si incluyes artistas en `artistas: [...]` y alguno es de Magico Ink, el aviso de divulgación aparece solo.
