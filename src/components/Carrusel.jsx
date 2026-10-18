import Carousel from 'react-bootstrap/Carousel'

// Carrusel automático de fotos: recibe un arreglo [{ src, alt }].
function Carrusel({ imagenes }) {
  if (imagenes.length === 0) return null

  return (
    <Carousel className="shadow-sm rounded" interval={3000} pause="hover" prevLabel="Anterior" nextLabel="Siguiente">
      {imagenes.map(({ src, alt }) => (
        <Carousel.Item key={src}>
          <img className="d-block w-100 carrusel-img" src={src} alt={alt} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Carrusel
