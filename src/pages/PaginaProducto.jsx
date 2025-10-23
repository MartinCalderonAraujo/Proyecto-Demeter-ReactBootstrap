import { useParams, Link } from "react-router-dom";
import PRODUCTOS from "../componentes/Productos";
import "../css/EstiloPaginaProducto.css";

function formatCLP(n) {
  return n.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

export default function PaginaProducto() {
  const { id } = useParams();
  const producto = PRODUCTOS.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <main className="pagina-producto no-encontrado">
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main className="pagina-producto">
      <div className="producto-detalle">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-imagen"
        />

        <div className="producto-info">
          <h1>Sensor de {producto.nombre}</h1>
          <p className="producto-descripcion">{producto.descripcion}</p>
          <p className="producto-precio">{formatCLP(producto.precio)}</p>

          <button className="btn-comprar">Añadir al carrito</button>

          <div className="volver-catalogo">
            <Link to="/">⬅ Volver al catálogo</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
