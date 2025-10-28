import { useState, useEffect } from "react";
import ProductoAdministrador from "../componentes/ProductoAdministrador";
import VentaAdministrador from "../componentes/VentaAdministrador";
import "../css/adminDashboard.css";

export default function AdminDashboard() {
  // Función para cargar los productos desde localStorage
  const loadProductosFromStorage = () => {
    const productosGuardados = JSON.parse(localStorage.getItem("Productos"));
    return productosGuardados ? productosGuardados : []; // Si no hay productos, retornar un array vacío
  };

  // Estado para productos (inicializado con los productos en localStorage)
  const [productos, setProductos] = useState(loadProductosFromStorage());
  const [ventas, setVentas] = useState([]);

  // Función para agregar un nuevo producto
  const agregarProducto = (nuevoProducto) => {
    // Crear un nuevo array con el producto añadido
    const nuevoArrayProductos = [...productos, { ...nuevoProducto, id: productos.length + 1 }];
    
    // Actualizar el estado de productos
    setProductos(nuevoArrayProductos);

    // Guardar el nuevo array de productos en el localStorage
    localStorage.setItem("Productos", JSON.stringify(nuevoArrayProductos));
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
          <h2>Productos</h2>
          <ul>
            {productos.map((producto) => (
              <li key={producto.id}>
                {producto.nombre} - ${producto.precio}
              </li>
            ))}
          </ul>
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
