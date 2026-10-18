import { createContext, useContext, useEffect, useState } from 'react'
import { productos } from '../data/productos'

const CarritoContext = createContext(null)

const CLAVE_CARRITO = 'carrito'

// Lee el carrito guardado. Solo se guardan id y cantidad: los datos del producto
// se vuelven a tomar de productos.js para mantener la coherencia.
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO))
    if (!Array.isArray(guardado)) return []
    return guardado.flatMap(({ id, cantidad }) => {
      const producto = productos.find((p) => p.id === id)
      return producto && Number.isInteger(cantidad) && cantidad > 0 ? [{ producto, cantidad }] : []
    })
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerCarritoGuardado)

  // Guarda en localStorage cada vez que items cambia
  useEffect(() => {
    try {
      const resumen = items.map(({ producto, cantidad }) => ({ id: producto.id, cantidad }))
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(resumen))
    } catch {
      // Si el navegador bloquea el almacenamiento, continúa en memoria
    }
  }, [items])

  function agregarAlCarrito(producto) {
    const stockDisponible = producto.stock ?? Infinity
    // Si no hay stock de origen, no hace nada
    if (stockDisponible <= 0) return

    setItems((actuales) => {
      const existe = actuales.find((item) => item.producto.id === producto.id)
      const cantidadActual = existe ? existe.cantidad : 0

      // Si ya alcanzó el límite disponible, no permite sumar más
      if (cantidadActual >= stockDisponible) {
        return actuales
      }

      if (existe) {
        return actuales.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...actuales, { producto, cantidad: 1 }]
    })
  }

  // Resta una unidad; si queda en 0, el producto sale del carrito
  function disminuirCantidad(id) {
    setItems((actuales) =>
      actuales
        .map((item) => (item.producto.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0),
    )
  }

  function quitarDelCarrito(id) {
    setItems((actuales) => actuales.filter((item) => item.producto.id !== id))
  }

  function vaciarCarrito() {
    setItems([])
  }

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)
  const total = items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0)

  const valor = {
    items,
    agregarAlCarrito,
    disminuirCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    cantidadTotal,
    total,
  }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return contexto
}