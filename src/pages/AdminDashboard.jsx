import { useState } from "react";
import ProductoAdministrador from "../componentes/ProductoAdministrador";
import VentaAdministrador from "../componentes/VentaAdministrador";
import PRODUCTOS from "../componentes/Productos";
import "../css/adminDashboard.css";

export default function AdminDashboard() {
  const [productos, setProductos] = useState(PRODUCTOS);
  const [ventas, setVentas] = useState([]); // Ventas simuladas o reales

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, { ...nuevoProducto, id: productos.length + 1 }]);
  };

  return (
    <div className="admin-dashboard">
      <aside>
        <h2>Panel Admin</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Agregar Productos</li>
            <li>Ver Ventas</li>
          </ul>
        </nav>
      </aside>

      <main>
        <section>
          <h2>Agregar Producto</h2>
          <ProductoAdministrador onAgregar={agregarProducto} />
        </section>

        <section>
          <h2>Compras / Ventas</h2>
          {ventas.length === 0 ? (
            <p>No hay ventas aún</p>
          ) : (
            ventas.map((v) => <VentaAdministrador key={v.id} venta={v} />)
          )}
        </section>
      </main>
    </div>
  );
}
