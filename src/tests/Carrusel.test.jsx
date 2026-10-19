import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Carrusel from '../components/Carrusel'

describe('Carrusel', () => {
  const mockImagenes = [
    { id: 1, src: '/img/slide1.jpg', alt: 'Banner 1' },
    { id: 2, src: '/img/slide2.jpg', alt: 'Banner 2' }
  ]

  it('renderiza el contenedor del carrusel si recibe imágenes', () => {
    const { container } = render(<Carrusel imagenes={mockImagenes} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('retorna null si el arreglo de imágenes está vacío', () => {
    const { container } = render(<Carrusel imagenes={[]} />)
    expect(container.firstChild).toBeNull()
  })
})