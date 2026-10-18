import { productos } from '../data/productos'

// Simula la latencia de un servidor real (en milisegundos).
const DEMORA = 800

// Simula una petición GET /productos.
// Devuelve una Promesa, igual que fetch().
export function obtenerProductos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productos), DEMORA)
  })
}

// Simula una petición GET /productos/:id
export function obtenerProductoPorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find((p) => p.id === Number(id))
      if (producto) resolve(producto)
      else reject(new Error('Producto no encontrado'))
    }, DEMORA)
  })
}
