import { useContext } from "react";
import { CarritoContext } from "../componentes/CarritoControlador";
import "../css/carrito.css";

export default function Carrito() {
  const { carrito, eliminarProducto, limpiarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

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
                <span>Cantidad: {p.cantidad}</span>
                <span>Precio: ${p.precio * p.cantidad}</span>
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
