const modulos = import.meta.glob('../assets/galeria/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
})

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

export const galeria = Object.entries(modulos)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([ruta, src]) => ({ src, alt: textoAlternativo(ruta) }))
