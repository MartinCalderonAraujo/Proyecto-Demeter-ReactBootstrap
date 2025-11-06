import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarritoContext } from "../componentes/CarritoControlador";
import Carrito from "../pages/Carrito";
import PRODUCTOS from "../componentes/Productos";
import { describe, test, expect } from "vitest";
import { cleanup } from "@testing-library/react";


// NO TOCAR, ME SIMULA LOS VALORES EXTERNOS
function renderCarrito(contextValue) {
  render(
    <CarritoContext.Provider value={contextValue}>
      <Carrito />
    </CarritoContext.Provider>
  );
}

describe("Testing Carrito", () => {

    test("Muestra mensaje cuando el carrito está vacío", () => {
        renderCarrito({
        carrito: [],
        eliminarProducto: () => {},
        limpiarCarrito: () => {},
        modificarCantidad: () => {},
        });

        expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    });

    test("Carga todos los productos", () => {
        const carrito = PRODUCTOS.map((p) => ({
        ...p,
        cantidad: 1,
        }));

        renderCarrito({
        carrito,
        eliminarProducto: () => {},
        limpiarCarrito: () => {},
        modificarCantidad: () => {},
        });

        carrito.forEach((p) => {
        expect(screen.getByText(p.nombre)).toBeInTheDocument();
        });

        const totalEsperado = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        expect(screen.getByText(`Total: $${totalEsperado}`)).toBeInTheDocument();
    });

    test("Existen los botones de control y de eliminación", () => {
        const carrito = [
        { id: 1, nombre: "Sensor Luz", precio: 30000, cantidad: 1, imagen: "" },
        ];

        renderCarrito({
        carrito,
        eliminarProducto: () => {},
        limpiarCarrito: () => {},
        modificarCantidad: () => {},
        });

        expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Eliminar/i })).toBeInTheDocument();
    });

    test("Vaciar y comprar carrito", async () => {
        // No hace error en si el Vitest, pero si dice q algo lo corta
        // y no se q, asi q saqué los dos jeje
        window.alert = () => {};
        window.confirm = () => true;

        const user = userEvent.setup();

        // CREA EL PRODUCTO EN UN ARRAY (no supe llamarlo del Productos.jsx)
        let carrito = [
            { id: 1, nombre: "Sensor Luz", precio: 30000, cantidad: 1, imagen: "" },
        ];

        // Simulacion de las funciones del carrito
        const limpiarCarrito = () => { carrito = []; };
        const eliminarProducto = (id) => { carrito = carrito.filter(p => p.id !== id); };
        const modificarCantidad = (id, cant) => {
            carrito = carrito.map(p => p.id === id ? { ...p, cantidad: cant } : p);
        };

        renderCarrito({
            carrito,
            eliminarProducto,
            limpiarCarrito,
            modificarCantidad,
        });

        const btnVaciar = screen.getByRole("button", { name: /Vaciar Carrito/i });
        const btnComprar = screen.getByRole("button", { name: /Comprar/i });

        expect(btnVaciar).toBeInTheDocument();
        expect(btnComprar).toBeInTheDocument();

        // Vaciado de carrito (Verifica si funciona el btnVaciar)
        await user.click(btnVaciar);
        expect(carrito.length).toBe(0);

        // Volvemos a llenarlo para probar la compra
        carrito = [
            { id: 1, nombre: "Sensor Luz", precio: 30000, cantidad: 1, imagen: "" },
        ];

        cleanup(); // Vacia el anterior pq si no no funca
        renderCarrito({
            carrito,
            eliminarProducto,
            limpiarCarrito,
            modificarCantidad,
        });

        const btnComprarNuevo = screen.getByRole("button", { name: /Comprar/i });
        await user.click(btnComprarNuevo);

        expect(btnComprarNuevo).toBeInTheDocument();

    });

    // test("Permite clics en los botones de sumar y restar sin errores", async () => {
    //     const user = userEvent.setup();
  
    //     // CREA EL PRODUCTO EN UN ARRAY (no supe llamarlo del Productos.jsx)
    //     let carrito = [
    //         { id: 1, nombre: "Sensor Luz", precio: 30000, cantidad: 1, imagen: "" },
    //     ];

    //     const modificarCantidad = (id, nuevaCantidad) => {
    //         carrito = carrito.map(p => p.id === id ? { ...p, cantidad: nuevaCantidad } : p);
    //     };

    //     renderCarrito({
    //     carrito,
    //     eliminarProducto: () => {},
    //     limpiarCarrito: () => {},
    //     modificarCantidad: () => {},
    //     });

    //     const btnMas = screen.getByRole("button", { name: "+" });
    //     const btnMenos = screen.getByRole("button", { name: "-" });

    //     expect(
    //         screen.getByText((content, element) =>
    //             element.textContent.includes("Subtotal: $60000")
    //         )
    //     ).toBeInTheDocument();


    //     await user.click(btnMas);
    //     expect(btnMas).toBeInTheDocument();
    //     expect(screen.getByText(/Subtotal: \$60000/i)).toBeInTheDocument();

    //     await user.click(btnMenos);
    //     expect(btnMenos).toBeInTheDocument();
    //     expect(screen.getByText(/Subtotal: \$30000/i)).toBeInTheDocument();

    // });
});
