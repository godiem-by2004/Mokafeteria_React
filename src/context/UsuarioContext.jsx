import { createContext, useContext, useState } from 'react'

const UsuarioContext = createContext(null)

const CLAVE_USUARIOS = 'usuarios' // lista de cuentas registradas
const CLAVE_SESION = 'sesion' // usuario con sesión iniciada

function leer(clave, porDefecto) {
  try {
    const texto = localStorage.getItem(clave)
    return texto ? JSON.parse(texto) : porDefecto
  } catch {
    return porDefecto
  }
}

export function UsuarioProvider({ children }) {
  // Función inicial: lee la sesión guardada solo la primera vez.
  const [usuario, setUsuario] = useState(() => leer(CLAVE_SESION, null))

  function abrirSesion({ nombre, correo }) {
    const sesion = { nombre, correo }
    setUsuario(sesion)
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
  }

  function registrar({ nombre, correo, password }) {
    const usuarios = leer(CLAVE_USUARIOS, [])
    const existe = usuarios.some((u) => u.correo.toLowerCase() === correo.trim().toLowerCase())
    if (existe) {
      return { ok: false, mensaje: 'Este correo ya está registrado. Prueba iniciando sesión.' }
    }
    const nuevo = { nombre: nombre.trim(), correo: correo.trim(), password }
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify([...usuarios, nuevo]))
    abrirSesion(nuevo)
    return { ok: true }
  }

  function iniciarSesion(correo, password) {
    const usuarios = leer(CLAVE_USUARIOS, [])
    const encontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password,
    )
    if (!encontrado) {
      return { ok: false, mensaje: 'Correo o contraseña incorrectos, o el usuario no existe.' }
    }
    abrirSesion(encontrado)
    return { ok: true }
  }

  function cerrarSesion() {
    setUsuario(null)
    localStorage.removeItem(CLAVE_SESION)
  }

  const valor = { usuario, registrar, iniciarSesion, cerrarSesion }
  return <UsuarioContext.Provider value={valor}>{children}</UsuarioContext.Provider>
}

export function useUsuario() {
  const contexto = useContext(UsuarioContext)
  if (!contexto) throw new Error('useUsuario debe usarse dentro de <UsuarioProvider>')
  return contexto
}
