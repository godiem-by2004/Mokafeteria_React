import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "../components/ProductList";

test('Muestra mensaje cuando la lista de productos está vacía', async () => {
    // 1) Preconfiguracion
    const productosVacios = []
    const onAgregarMock = vi.fn()

    // 2) Renderizado del componente (debe aparecer el componente en el ambiente de prueba)
    render(<ProductList productos={productosVacios} onAgregar={onAgregarMock} />)

    // 3) Interaccion del usuario
    // En este caso no hay porque al estar la lista vacía no hay interacción con usuario.

    // 4) Resultados (Que al renderizar bajo estas condiciones, haya una respuesta esperada)
    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument()
    expect(screen.getByText('Prueba buscando con otro término o categoría.')).toBeInTheDocument()
})