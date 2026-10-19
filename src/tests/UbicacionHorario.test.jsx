import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import UbicacionHorario from "../components/UbicacionHorario";

test('Renderiza correctamente la dirección y el horario', () => {
    // 1) Preconfiguracion
    // No se necesitan datos previos porque solo es algo visual.

    // 2) Renderizado del componente
    render(<UbicacionHorario />);

    // 3) Interaccion del usuario
    // No hay interacción porque el componente solo muestra información.

    // 4) Resultados
    expect(screen.getByText('Dirección')).toBeInTheDocument();
    expect(screen.getByText('Av. Libertad 1254, Viña del Mar, Chile')).toBeInTheDocument();
    expect(screen.getByText('Horario')).toBeInTheDocument();
    expect(screen.getByText(/08:00 - 22:00/)).toBeInTheDocument();
    expect(screen.getByText(/Lunes a Domingo/)).toBeInTheDocument();
});