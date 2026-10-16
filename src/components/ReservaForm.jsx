import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import CampoFormulario from './CampoFormulario'

function fechaHoy() {
  const ahora = new Date()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')
  return `${ahora.getFullYear()}-${mes}-${dia}`
}

function ReservaForm() {
  const [formulario, setFormulario] = useState({ fecha: '', hora: '', personas: '' })
  const [mensaje, setMensaje] = useState(null) // { tipo: 'success' | 'danger', texto }

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario({ ...formulario, [name]: value })
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const { fecha, hora, personas } = formulario

    if (!fecha || !hora || !personas) {
      setMensaje({ tipo: 'danger', texto: 'Completa la fecha, la hora y el número de personas.' })
      return
    }
    if (fecha < fechaHoy()) {
      setMensaje({ tipo: 'danger', texto: 'Por favor, elige una fecha a partir de hoy.' })
      return
    }
    const horaEntera = parseInt(hora.split(':')[0], 10)
    if (horaEntera < 8 || horaEntera >= 22) {
      setMensaje({ tipo: 'danger', texto: 'Nuestro horario de atención es de 08:00 a 22:00 hrs.' })
      return
    }
    const cantidad = Number(personas)
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 20) {
      setMensaje({ tipo: 'danger', texto: 'Las reservas deben ser para entre 1 y 20 personas.' })
      return
    }

    setMensaje({ tipo: 'success', texto: '¡Reserva confirmada con éxito! Te esperamos.' })
    setFormulario({ fecha: '', hora: '', personas: '' })
  }

  return (
    <Form onSubmit={manejarEnvio}>
      {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

      <CampoFormulario
        id="reservaFecha"
        etiqueta="Fecha"
        name="fecha"
        type="date"
        size="lg"
        min={fechaHoy()}
        value={formulario.fecha}
        onChange={manejarCambio}
        required
      />
      <CampoFormulario
        id="reservaHora"
        etiqueta="Hora"
        name="hora"
        type="time"
        size="lg"
        value={formulario.hora}
        onChange={manejarCambio}
        required
      />
      <CampoFormulario
        id="reservaPersonas"
        etiqueta="Número de personas"
        name="personas"
        type="number"
        size="lg"
        min={1}
        max={20}
        placeholder="Ej: 2"
        value={formulario.personas}
        onChange={manejarCambio}
        required
      />

      <button type="submit" className="btn btn-moka btn-lg w-100 mt-3">
        Confirmar reserva
      </button>
    </Form>
  )
}

export default ReservaForm
