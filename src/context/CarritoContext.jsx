import { createContext, useContext, useEffect, useState } from 'react'
import { productos } from '../data/productos'

const CarritoContext = createContext(null)

const CLAVE_CARRITO = 'carrito'

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

  useEffect(() => {
    try {
      const resumen = items.map(({ producto, cantidad }) => ({ id: producto.id, cantidad }))
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(resumen))
    } catch {
    }
  }, [items])

  function agregarAlCarrito(producto) {
    setItems((actuales) => {
      const existe = actuales.find((item) => item.producto.id === producto.id)
      if (existe) {
        return actuales.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...actuales, { producto, cantidad: 1 }]
    })
  }

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

  const valor = { items, agregarAlCarrito, disminuirCantidad, quitarDelCarrito, vaciarCarrito, cantidadTotal, total }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return contexto
}
