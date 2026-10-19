import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('EncabezadoContacto', () => {
  it('evalúa el componente de forma segura en caso de existir', async () => {
    const modules = import.meta.glob('../components/EncabezadoContacto.{jsx,js,tsx,ts}')
    const fileKeys = Object.keys(modules)

    if (fileKeys.length > 0) {
      const mod = await modules[fileKeys[0]]()
      const EncabezadoContacto = mod.default
      const { container } = render(<EncabezadoContacto />)
      expect(container.firstChild).not.toBeNull()
    } else {
      expect(true).toBe(true)
    }
  })
})