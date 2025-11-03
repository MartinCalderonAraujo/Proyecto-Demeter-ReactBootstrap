import { useContext } from "react";
import { CarritoContext } from "../componentes/CarritoControlador";
import "../css/carrito.css";

export default function Carrito() {
  const { carrito, eliminarProducto, limpiarCarrito, modificarCantidad} = useContext(CarritoContext);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const handleRestar = (producto) => {
    if (producto.cantidad === 1) {
      // Si llega a 0, mostramos alerta
      const confirmar = window.confirm(`¿Deseas eliminar "Sensor de ${producto.nombre}" del carrito?`);
      if (confirmar) eliminarProducto(producto.id);
    } else {
      modificarCantidad(producto.id, producto.cantidad - 1);
    }
  };

  const handleSumar = (producto) => {
    modificarCantidad(producto.id, producto.cantidad + 1);
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
                <span>Precio * Cantidad: ${p.precio * p.cantidad}</span>
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
          <button onClick={limpiarCarrito}>Vaciar Carrito</button>
        </>
      )}
    </div>
  );
}
