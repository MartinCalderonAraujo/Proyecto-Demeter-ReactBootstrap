import "../css/catalogo.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../componentes/CarritoControlador";

function formatCLP(n) {
  return n.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

export default function Catalogo() {
  const { agregarProducto } = useContext(CarritoContext); // ✅ función del context

  // Cargar los productos desde localStorage
  const productos = JSON.parse(localStorage.getItem("Productos")) || []; // Si no hay productos, se inicializa con un array vacío

  return (
    <main>
      <section className="contenedor-item">
        {productos.map((p) => (
          <div key={p.id} className="producto">
            <figure>
              <Link to={`/producto/${p.id}`}>
                <img src={p.imagen} alt={p.nombre} loading="lazy" />
              </Link>
            </figure>
            <div className="info-producto">
              <h2 className="prod-nombre">{`Sensor de ${p.nombre.toLowerCase()}`}</h2>
              <p className="prod-precio">{formatCLP(p.precio)}</p>
              <button onClick={() => agregarProducto(p)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
