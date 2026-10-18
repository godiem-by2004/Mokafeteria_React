// Fotos del carrusel de "Sobre nosotros".
//
// ── CÓMO AGREGAR TUS FOTOS ──────────────────────────────────────────────
// 1. Copia las fotos dentro de la carpeta  src/assets/galeria/
//    (jpg, jpeg, png, webp, avif o gif).
// 2. Listo: aparecen solas en el carrusel. No hace falta tocar este archivo.
//
// ORDEN: el carrusel las muestra por orden alfabético del nombre del archivo.
// Para elegir el orden, empieza cada nombre con un número de dos cifras:
//   01-fachada.jpg, 02-barista.jpg, 03-mesas.jpg ...
//
// TEXTO ALTERNATIVO (opcional): lo leen los lectores de pantalla y se muestra
// si la foto no carga. Si no escribes uno abajo, se arma con el nombre del archivo
// ("04-barista-latte.jpg" → "Barista latte").
// ────────────────────────────────────────────────────────────────────────

// Vite busca todas las imágenes de la carpeta y entrega la URL de cada una.
const modulos = import.meta.glob('../assets/galeria/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Descripciones opcionales. La clave es el nombre del archivo SIN número inicial y SIN extensión.
const descripciones = {
  'cafe-y-pastel': 'Café y pastel de la casa',
  'cafeteria-verde': 'Rincón verde de la cafetería',
  'cafeteria-pared': 'Interior de la cafetería',
  cafetero: 'Barista preparando café',
  mesas: 'Mesas del local',
}

function nombreLimpio(ruta) {
  const archivo = ruta.split('/').pop()
  return archivo.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '')
}

function textoAlternativo(ruta) {
  const nombre = nombreLimpio(ruta)
  if (descripciones[nombre]) return descripciones[nombre]
  const texto = nombre.replace(/[-_]+/g, ' ').trim()
  return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : 'Foto de Mokafetería'
}

// Arreglo final [{ src, alt }] que recibe el componente <Carrusel />.
export const galeria = Object.entries(modulos)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([ruta, src]) => ({ src, alt: textoAlternativo(ruta) }))
