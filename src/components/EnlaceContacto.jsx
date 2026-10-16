function EnlaceContacto({ icono, claseIcono = 'text-caramel', etiqueta, valor, href, externo }) {
  return (
    <a href={href} className="contact-link" {...(externo && { target: '_blank', rel: 'noopener noreferrer' })}>
      <i className={`bi ${icono} fs-3 me-3 ${claseIcono}`}></i>
      <div>
        <strong>{etiqueta}:</strong>
        <p className="mb-0 text-muted">{valor}</p>
      </div>
    </a>
  )
}

export default EnlaceContacto
