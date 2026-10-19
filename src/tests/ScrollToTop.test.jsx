import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import ScrollToTop from "../components/ScrollToTop";

vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/ruta-prueba" })
}));

test('Ejecuta el scroll hacia arriba (0, 0) al renderizarse', () => {
    // 1) Preconfiguracion
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    // 2) Renderizado del componente
    render(<ScrollToTop />);

    // 3) Interaccion del usuario
    // No hay interacción con usuario porque el componente actúa automáticamente gracias al useEffect al detectar la ruta

    // 4) Resultados
    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
});