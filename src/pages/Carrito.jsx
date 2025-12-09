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

  

  const handleComprar = async () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  // se construyeel PedidoDTO
  const pedidoDTO = {
    fecha: new Date().toISOString(),
    total: total,
    productos: carrito.map(p => ({
      idProducto: p.id,
      cantidad: p.cantidad,
      precio: p.precio
    }))

  };

  try {
    const res = await fetch("http://localhost:8011/api/pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedidoDTO)
    });

    if (!res.ok) throw new Error("Error al registrar el pedido");

    limpiarCarrito();
    alert("Compra realizada y guardada en la base de datos correctamente.");
  } catch (err) {
    console.error(err);
    alert("Hubo un error al procesar la compra");
  }
};

  

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
            <button onClick={limpiarCarrito} id="btn_vaciar">Vaciar Carrito</button>
            <button className="btn_compra" id="btn_compra" onClick={handleComprar}>
              🛒 Comprar
            </button>
          </div>
        </>
      )}
    </div>
  );
};   