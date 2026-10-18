// Mismas reglas que tenía login.js
const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// 8 a 20 caracteres, al menos una mayúscula y un número
const regexClave = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&._-]{8,20}$/

export const MENSAJE_CLAVE = 'Entre 8 y 20 caracteres, con al menos una mayúscula y un número.'

export const validarCorreo = (valor) => regexCorreo.test(valor.trim())
export const validarClave = (valor) => regexClave.test(valor)
export const validarNombre = (valor) => valor.trim().length >= 2

// Devuelve null (sin marcar), true (válido) o false (inválido).
// Un campo se marca cuando el usuario ya escribió algo o intentó enviar el formulario.
export function estadoCampo(valor, validar, intentado) {
  if (!intentado && valor === '') return null
  return validar(valor)
}
