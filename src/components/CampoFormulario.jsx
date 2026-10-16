import Form from 'react-bootstrap/Form'

function CampoFormulario({ id, etiqueta, valido = null, mensajeError, ayuda, ...resto }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className="fw-semibold">{etiqueta}</Form.Label>
      <Form.Control isValid={valido === true} isInvalid={valido === false} {...resto} />
      {mensajeError && <Form.Control.Feedback type="invalid">{mensajeError}</Form.Control.Feedback>}
      {ayuda && <Form.Text muted>{ayuda}</Form.Text>}
    </Form.Group>
  )
}

export default CampoFormulario
