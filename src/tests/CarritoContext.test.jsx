import { expect, test, describe, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "../context/CarritoContext";

const productoTest = { id: "p1", nombre: "Café de Especialidad", precio: 3000, stock: 5 };

describe("CarritoContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;

  test("Debe arrojar error si useCarrito se usa fuera del CarritoProvider", () => {
    expect(() => {
      renderHook(() => useCarrito());
    }).toThrow("useCarrito debe usarse dentro de <CarritoProvider>");
  });

  test("Debe inicializar el carrito vacío si no hay datos guardados", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.cantidadTotal).toBe(0);
    expect(result.current.total).toBe(0);
  });

  test("Agrega un producto al carrito y suma el total correctamente", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito(productoTest);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].producto.id).toBe("p1");
    expect(result.current.items[0].cantidad).toBe(1);
    expect(result.current.cantidadTotal).toBe(1);
    expect(result.current.total).toBe(3000);
  });

  test("Incrementa la cantidad si se agrega el mismo producto sin superar el stock", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito(productoTest); // cant: 1
      result.current.agregarAlCarrito(productoTest); // cant: 2
    });

    expect(result.current.items[0].cantidad).toBe(2);
    expect(result.current.total).toBe(6000);
  });

  test("No permite agregar más cantidad que el stock disponible", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });

    act(() => {
      for (let i = 0; i < 6; i++) {
        result.current.agregarAlCarrito(productoTest);
      }
    });

    expect(result.current.items[0].cantidad).toBe(5);
  });

  test("Disminuye la cantidad y elimina el producto si llega a cero", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito(productoTest);
    });
    
    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.disminuirCantidad(productoTest.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  test("Quita el producto del carrito directamente", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito(productoTest);
      result.current.quitarDelCarrito(productoTest.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  test("Vacía el carrito completo", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito(productoTest);
      result.current.vaciarCarrito();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.cantidadTotal).toBe(0);
  });
});