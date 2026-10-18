import { productos } from '../data/productos'

const DEMORA = 800

export function obtenerProductos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productos), DEMORA)
  })
}

export function obtenerProductoPorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find((p) => p.id === Number(id))
      if (producto) resolve(producto)
      else reject(new Error('Producto no encontrado'))
    }, DEMORA)
  })
}
