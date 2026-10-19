import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegistroForm from "../components/RegistroForm"; // Ajusta la ruta

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("../context/UsuarioContext", () => ({
  useUsuario: vi.fn(),
}));

test('Envía el formulario correctamente y redirige al inicio', async () => {
    // 1) Preconfiguracion
    const mockNavigate = vi.fn();
    const mockRegistrar = vi.fn().mockReturnValue({ ok: true });
    
    const { useNavigate } = await import("react-router-dom");
    const { useUsuario } = await import("../context/UsuarioContext");
    useNavigate.mockReturnValue(mockNavigate);
    useUsuario.mockReturnValue({ registrar: mockRegistrar });

    // 2) Renderizado del componente
    render(<RegistroForm />);

    // 3) Interaccion del usuario
    await userEvent.type(screen.getByPlaceholderText('Tu nombre'), 'Juan Pérez');
    await userEvent.type(screen.getByPlaceholderText('nombre@correo.cl'), 'juan@correo.cl');
    await userEvent.type(screen.getByPlaceholderText('Crea tu contraseña'), 'ClaveSegura123');
    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    // 4) Resultados
    expect(mockRegistrar).toHaveBeenCalledTimes(1);
    expect(mockRegistrar).toHaveBeenCalledWith({
        nombre: 'Juan Pérez',
        correo: 'juan@correo.cl',
        password: 'ClaveSegura123'
    });

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
});