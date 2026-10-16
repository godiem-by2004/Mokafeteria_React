import Container from 'react-bootstrap/Container'

function BarraCategorias({ categorias, activa, onSeleccionar }) {
  return (
    <div className="categories-bar border-bottom py-2 shadow-sm">
      <Container>
        <div className="category-scroll d-flex gap-2">
          {categorias.map(({ id, nombre }) => (
            <button
              key={id}
              type="button"
              className={`btn btn-category ${activa === id ? 'active' : ''}`}
              onClick={() => onSeleccionar(id)}
            >
              {nombre}
            </button>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default BarraCategorias
