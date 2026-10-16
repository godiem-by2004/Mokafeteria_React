import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import CampoFormulario from './CampoFormulario'
import { useUsuario } from '../context/UsuarioContext'
import {
  MENSAJE_CLAVE,
  estadoCampo,
  validarClave,
  validarCorreo,
  validarNombre,
} from '../utils/validaciones'

function RegistroForm() {
  const navigate = useNavigate()
  const { registrar } = useUsuario()

  const [formulario, setFormulario] = useState({ nombre: '', correo: '', password: '' })
  const [intentado, setIntentado] = useState(false)
  const [error, setError] = useState('')

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario({ ...formulario, [name]: value })
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    setIntentado(true)
    setError('')

    const todoValido =
      validarNombre(formulario.nombre) && validarCorreo(formulario.correo) && validarClave(formulario.password)
    if (!todoValido) return

    const resultado = registrar(formulario)
    if (!resultado.ok) {
      setError(resultado.mensaje)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      {error && <Alert variant="danger">{error}</Alert>}

      <CampoFormulario
        id="regNombre"
        etiqueta="Nombre completo"
        name="nombre"
        placeholder="Tu nombre"
        value={formulario.nombre}
        onChange={manejarCambio}
        valido={estadoCampo(formulario.nombre, validarNombre, intentado)}
        mensajeError="Ingresa tu nombre (mínimo 2 caracteres)."
      />
      <CampoFormulario
        id="regCorreo"
        etiqueta="Correo electrónico"
        name="correo"
        type="email"
        placeholder="nombre@correo.cl"
        value={formulario.correo}
        onChange={manejarCambio}
        valido={estadoCampo(formulario.correo, validarCorreo, intentado)}
        mensajeError="Ingresa un correo válido (por ejemplo, nombre@correo.cl)."
      />
      <CampoFormulario
        id="regPassword"
        etiqueta="Contraseña"
        name="password"
        type="password"
        placeholder="Crea tu contraseña"
        value={formulario.password}
        onChange={manejarCambio}
        valido={estadoCampo(formulario.password, validarClave, intentado)}
        mensajeError={MENSAJE_CLAVE}
        ayuda={MENSAJE_CLAVE}
      />

      <button type="submit" className="btn btn-moka w-100 py-2 mt-2">
        Crear cuenta
      </button>
    </Form>
  )
}

export default RegistroForm
