import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Componente Footer', () => {
  it('renderiza el texto de derechos reservados y el eslogan', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 Mokafetería/i)).toBeInTheDocument()
    expect(screen.getByText(/Disfruta de nuestros productos recién hechos/i)).toBeInTheDocument()
  })

  it('no muestra la dirección física en la lista de enlaces', () => {
    render(<Footer />)
    expect(screen.queryByText(/Dirección/i)).not.toBeInTheDocument()
  })
})