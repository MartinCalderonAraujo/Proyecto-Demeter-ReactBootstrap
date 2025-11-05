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

  const generarPDF = (compra) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🧾 Boleta de Compra", 10, 15);
    doc.setFontSize(11);
    doc.text(`N° Boleta: ${compra.id}`, 10, 25);
    doc.text(`Fecha: ${compra.fecha}`, 10, 32);

    const filas = compra.productos.map((p) => [
      p.nombre,
      p.cantidad,
      `$${p.precio}`,
      `$${p.precio * p.cantidad}`
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Producto", "Cantidad", "Precio unitario", "Subtotal"]],
      body: filas,
      theme: "grid",
      styles: { fontSize: 10 }
    });

    doc.text(`Total: $${compra.total}`, 150, doc.lastAutoTable.finalY + 10);
    doc.save(`Boleta_${compra.id}.pdf`);
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

    // Generar PDF
    generarPDF(compra);

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
