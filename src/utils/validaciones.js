const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexClave = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&._-]{8,20}$/

export const MENSAJE_CLAVE = 'Entre 8 y 20 caracteres, con al menos una mayúscula y un número.'

export const validarCorreo = (valor) => regexCorreo.test(valor.trim())
export const validarClave = (valor) => regexClave.test(valor)
export const validarNombre = (valor) => valor.trim().length >= 2

export function estadoCampo(valor, validar, intentado) {
  if (!intentado && valor === '') return null
  return validar(valor)
}
