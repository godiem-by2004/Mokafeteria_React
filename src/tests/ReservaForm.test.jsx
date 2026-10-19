import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReservaForm from "../components/ReservaForm";

test('Muestra mensaje de éxito cuando se envían datos válidos', async () => {
    // 1) Preconfiguracion
    const fechaFutura = new Date();
    fechaFutura.setFullYear(fechaFutura.getFullYear() + 1);
    const mes = String(fechaFutura.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaFutura.getDate()).padStart(2, '0');
    const fechaTest = `${fechaFutura.getFullYear()}-${mes}-${dia}`;

    // 2) Renderizado del componente
    render(<ReservaForm />);

    // 3) Interaccion del usuario
    await userEvent.type(screen.getByLabelText('Fecha'), fechaTest);
    await userEvent.type(screen.getByLabelText('Hora'), '15:00'); // Hora válida (entre 08 y 22)
    await userEvent.type(screen.getByLabelText('Número de personas'), '4'); // Cantidad válida (entre 1 y 20)

    await userEvent.click(screen.getByRole('button', { name: /confirmar reserva/i }));

    // 4) Resultados
    expect(screen.getByText('¡Reserva confirmada con éxito! Te esperamos.')).toBeInTheDocument();
});