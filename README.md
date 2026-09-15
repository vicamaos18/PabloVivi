# Viviana ❤ [NOMBRE] — Nuestra historia

Landing page romántica de una sola página (one-page storytelling), construida con **HTML5 + CSS3 + JavaScript vanilla + Bootstrap 5 + AOS (Animate On Scroll)**, con efecto glassmorphism, parallax suave, un carrusel premium, tarjetas flip, una ruleta interactiva con confeti y una carta final editable.

Todo el contenido (fotos, video y textos) está preparado como **placeholders fáciles de reemplazar**.

---

## 1. Estructura del proyecto

```
proyecto-romantico/
├── index.html                     ← Toda la página (10 secciones)
├── css/
│   └── style.css                  ← Estilos, paleta de colores, animaciones
├── js/
│   └── script.js                  ← Interactividad (AOS, ruleta, blur reveal, etc.)
├── assets/
│   ├── images/                    ← Todas las fotos (ver tabla abajo)
│   └── videos/
│       └── guajira_atardecer.mp4  ← Video de La Guajira (placeholder)
└── README.md                      ← Este archivo
```

---

## 2. ⚠️ Reemplazar [NOMBRE]

El texto `[NOMBRE]` aparece en **3 lugares** y debe reemplazarse por el nombre real:

1. `index.html` → Sección 1 (portada): `<p class="hero-names">Viviana ❤ [NOMBRE]</p>`
2. `index.html` → Sección 10 (carta final): `<p class="letter-signature">...Viviana ❤ [NOMBRE]</p>`
3. `index.html` → pie de página (`<footer>`)
4. También en `<title>` dentro de `<head>`

Recomendado: abre `index.html`, usa "Buscar y reemplazar" de tu editor y cambia `[NOMBRE]` por el nombre real en todas las coincidencias.

---

## 3. Fotos y video — dónde van y qué reemplazar

Todas las imágenes actuales son **placeholders generados** (degradados en la paleta de colores del proyecto, con el nombre del archivo escrito encima) para que la página se vea completa desde ya. Reemplaza cada archivo por tu foto real **usando exactamente el mismo nombre** y no tendrás que tocar el HTML.

| Archivo (dentro de `assets/images/`) | Sección | Recomendación de tamaño |
|---|---|---|
| `portada.jpg` | 1 — Portada (hero) | Horizontal, mínimo 1920×1280px |
| `universidad.jpg` | 2 — Todo empezó mucho antes | Horizontal, ~1600×1067px |
| `primer_capitulo.jpg` | 3 — Nuestro primer capítulo | Horizontal, ~1600×1067px |
| `foto_mar.jpg` | 4 — La foto que cambió nuestra historia | Cuadrada, ~1400×1400px |
| `chat_01.jpg` … `chat_04.jpg` | 4 — Subsección "Las conversaciones" | Vertical (formato captura de celular), ~900×1600px |
| `guajira_01.jpg` … `guajira_04.jpg` | 5 — Carrusel de La Guajira | Horizontal, ~1600×1067px |
| `propuesta_noviazgo.jpg` | 5 — El día que nos elegimos | Horizontal, ~1600×1067px |
| `samanta.jpg` | 7 — Collage (foto grande) | Vertical, ~1200×1500px |
| `iris.jpg`, `nala.jpg`, `orion.jpg`, `aros.jpg` | 7 — Collage (fotos pequeñas) | Cuadradas, ~800×800px |
| `foto_final.jpg` | 10 — Carta final (fondo) | Horizontal, ~1600×1067px |
| `guajira_atardecer_poster.jpg` | 5 — Imagen mostrada antes de reproducir el video | Se regenera automáticamente si cambias el video (ver abajo) |

| Archivo (dentro de `assets/videos/`) | Sección | Notas |
|---|---|---|
| `guajira_atardecer.mp4` | 5 — La Guajira | Formato MP4 (H.264), recomendado máx. ~30-50 MB para que cargue rápido en celular. Si quieres actualizar la imagen de vista previa (poster), extrae un frame nuevo con: `ffmpeg -i tu_video.mp4 -ss 00:00:02 -frames:v 1 assets/images/guajira_atardecer_poster.jpg` |

**Optimización recomendada:** antes de subir tus fotos reales, comprímelas (por ejemplo con [Squoosh](https://squoosh.app) o `ffmpeg`/`imagemagick`) a formato `.jpg` de buena calidad pero peso moderado (idealmente <400KB por foto) para que el sitio cargue rápido en celular.

---

## 4. Dónde editar cada texto

Todos los textos están directamente en `index.html`, dentro de comentarios `<!-- EDITAR TEXTO AQUÍ -->` que marcan exactamente qué bloque tocar. Los textos ya vienen redactados según el guion original de cada sección; solo la **Sección 10 (Carta final)** se dejó intencionalmente en blanco (con corchetes `[ ... ]`) para que la escribas cuando quieras, dentro del bloque:

```html
<div id="carta-final-texto" class="letter-text">
  <p>[ Escribe aquí el inicio de tu carta... ]</p>
  ...
</div>
```

Puedes agregar tantos `<p>` como necesites.

### Ruleta del amor (Sección 9)

Las opciones de la ruleta se editan en `js/script.js`, en el arreglo `WHEEL_OPTIONS` (al inicio del bloque comentado "SECCIÓN 9"). Agregar o quitar opciones ajusta automáticamente el tamaño de los gajos.

### Tarjetas "Las cosas que amo de ti" (Sección 6) y "Nuestros sueños" (Sección 8)

Cada tarjeta es un bloque independiente en `index.html`, marcado con comentarios `EDITAR/AGREGAR TARJETAS AQUÍ`. Puedes copiar y pegar un bloque completo para agregar más tarjetas.

---

## 5. Cómo previsualizar localmente

No necesitas instalar nada. Simplemente:

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html` para abrirlo en tu navegador, **o** sirve la carpeta con un servidor local (recomendado para que el video y las fuentes carguen sin problemas de rutas):

   ```bash
   # Con Python instalado:
   python3 -m http.server 8080
   # Luego abre http://localhost:8080 en tu navegador
   ```

---

## 6. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado, según prefieras).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio (`index.html` debe quedar en la raíz, no dentro de una subcarpeta).
3. Ve a **Settings → Pages**.
4. En "Source", selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
5. Guarda. GitHub te dará una URL tipo `https://tu-usuario.github.io/tu-repositorio/`.
6. Espera 1-2 minutos y visita la URL.

> El proyecto usa rutas relativas (`css/style.css`, `assets/images/...`, etc.), por lo que funciona correctamente tanto en la raíz de un dominio como en una subcarpeta de GitHub Pages.

---

## 7. Publicar en Netlify

**Opción A — Arrastrar y soltar (la más rápida):**
1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa `proyecto-romantico` a la ventana del navegador.
3. Netlify la publica automáticamente y te da una URL `https://algo-al-azar.netlify.app`.
4. Desde el panel de Netlify puedes personalizar el subdominio (Site settings → Change site name).

**Opción B — Conectando un repositorio Git:**
1. Sube el proyecto a GitHub (ver sección anterior).
2. En Netlify, "Add new site" → "Import an existing project" → conecta tu repositorio.
3. Build command: (déjalo vacío, no hay build).
4. Publish directory: `/` (la raíz).
5. Deploy.

---

## 8. Notas técnicas

- **Librerías usadas (vía CDN, no requieren instalación):** Bootstrap 5.3.3, AOS 2.3.4, canvas-confetti 1.9.3, Google Fonts (Playfair Display + Jost).
- **Sin build ni dependencias de Node/npm.** Es HTML/CSS/JS puro, listo para cualquier hosting estático.
- **Responsive:** probado mentalmente para 3 rangos (celular ~375px, tablet ~768px, escritorio ≥1200px). El menú de puntos lateral (`#dot-nav`) se oculta automáticamente en pantallas menores a 992px para no estorbar.
- **Accesibilidad:** las imágenes tienen `alt` descriptivo, los botones tienen `aria-label`, y las animaciones respetan `prefers-reduced-motion` para los corazones flotantes.
- **Rendimiento:** todas las imágenes usan `loading="lazy"` salvo la portada. El video usa `preload="metadata"` para no descargarlo completo hasta que el usuario decida reproducirlo.
- **Sin dependencias de backend/servidor:** todo funciona como archivos estáticos.

---

## 9. Personalizar colores

La paleta completa está centralizada en `css/style.css`, en el bloque `:root` al inicio del archivo:

```css
:root {
  --color-white: #ffffff;
  --color-ivory: #fffaf0;
  --color-sand: #e6d6b8;
  --color-gold: #c6a15b;
  --color-sunset-blue: #3a5a78;
  --color-sunset-blue-dark: #233a52;
  ...
}
```

Cambiar cualquiera de estas variables actualiza el color en todo el sitio automáticamente.

---

Hecho con ❤ para contar una historia, con calma y con cariño.
