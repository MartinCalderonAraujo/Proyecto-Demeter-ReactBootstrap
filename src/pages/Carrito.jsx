import React, { useContext } from "react";
import { CarritoContext } from "../componentes/CarritoControlador";
import "../css/carrito.css";

export default function Carrito() {
  const { carrito, eliminarProducto, limpiarCarrito, modificarCantidad } =
    useContext(CarritoContext);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const handleRestar = (producto) => {
    if (producto.cantidad === 1) {
      const confirmar = window.confirm(
        `¿Deseas eliminar "${producto.nombre}" del carrito?`
      );
      if (confirmar) eliminarProducto(producto.id);
    } else {
      modificarCantidad(producto.id, producto.cantidad - 1);
    }
  };

  const handleSumar = (producto) => {
    modificarCantidad(producto.id, producto.cantidad + 1);
  };

  

  const handleComprar = () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const compra = {
    id: Date.now(), // ID único de la compra
    fecha: new Date().toLocaleString(),
    productos: carrito.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      cantidad: p.cantidad,
      precio: p.precio
    })),
    total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
  };

    // Guardar compra
    const comprasPrevias = JSON.parse(localStorage.getItem("compras") || "[]");
    comprasPrevias.push(compra);
    localStorage.setItem("compras", JSON.stringify(comprasPrevias));

    // Guardar boleta
    const boletasPrevias = JSON.parse(localStorage.getItem("boletas") || "[]");
    boletasPrevias.push(compra);
    localStorage.setItem("boletas", JSON.stringify(boletasPrevias));


    limpiarCarrito();
    alert("✅ Compra realizada. Boleta generada correctamente.");
  };

  console.log(JSON.parse(localStorage.getItem("boletas")));

  return (
    <div className="carrito-page">
      <h2>Mi Carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((p) => (
              <li key={p.id}>
                <img src={p.imagen} alt={p.nombre} />
                <span>{p.nombre}</span>
                <span>Precio Unitario: ${p.precio}</span>
                <span>Subtotal: ${p.precio * p.cantidad}</span>
                <div className="cantidad-control">
                  <button onClick={() => handleRestar(p)}>-</button>
                  <span>{p.cantidad}</span>
                  <button onClick={() => handleSumar(p)}>+</button>
                </div>
                <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <div className="acciones-carrito">
            <button onClick={limpiarCarrito}>Vaciar Carrito</button>
            <button className="comprar-btn" onClick={handleComprar}>
              🛒 Comprar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
