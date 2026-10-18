import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import CampoFormulario from './CampoFormulario'
import { useUsuario } from '../context/UsuarioContext'
import { estadoCampo, validarClave, validarCorreo } from '../utils/validaciones'

function LoginForm() {
  const navigate = useNavigate()
  const { iniciarSesion } = useUsuario()
  const [formulario, setFormulario] = useState({ correo: '', password: '' })
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

    if (!validarCorreo(formulario.correo) || !validarClave(formulario.password)) return

    const resultado = iniciarSesion(formulario.correo, formulario.password)
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
        id="loginCorreo"
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
        id="loginPassword"
        etiqueta="Contraseña"
        name="password"
        type="password"
        placeholder="••••••••"
        value={formulario.password}
        onChange={manejarCambio}
        valido={estadoCampo(formulario.password, validarClave, intentado)}
        mensajeError="La contraseña no cumple el formato (8 a 20 caracteres, una mayúscula y un número)."
      />

      <button type="submit" className="btn btn-moka w-100 py-2 mt-2">
        Ingresar
      </button>
    </Form>
  )
}

export default LoginForm
