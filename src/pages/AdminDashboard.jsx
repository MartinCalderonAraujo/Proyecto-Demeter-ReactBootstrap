import { useState, useEffect } from "react";
import ProductoAdministrador from "../componentes/ProductoAdministrador";
import VentaAdministrador from "../componentes/VentaAdministrador";
import "../css/adminDashboard.css";

export default function AdminDashboard() {

  //------------ FUNCIÓN PARA CARGAR PRODUCTOS DESDE LOCAL STORAGE ------------
  const loadProductosFromStorage = () => {
    const productosGuardados = JSON.parse(localStorage.getItem("Productos"));
    return productosGuardados ? productosGuardados : []; // Si no hay productos, retornar array vacío
  };

  //------------ ESTADOS PRINCIPALES ------------
  const [productos, setProductos] = useState(loadProductosFromStorage());
  const [ventas, setVentas] = useState([]);

  //------------ FUNCIÓN PARA AGREGAR NUEVO PRODUCTO ------------
  const agregarProducto = (nuevoProducto) => {
  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

  // Crear un nuevo array con el producto añadido
  const nuevoArrayProductos = [...productos, { ...nuevoProducto, id: nuevoId }];
  
  // Actualizar el estado de productos
  setProductos(nuevoArrayProductos);

  // Guardar el nuevo array de productos en el localStorage
  localStorage.setItem("Productos", JSON.stringify(nuevoArrayProductos));
};

  //------------ FUNCIÓN PARA ELIMINAR PRODUCTO ------------
  const eliminarProducto = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    // Filtrar el producto eliminado
    const nuevosProductos = productos.filter((p) => p.id !== id);

    // Actualizar localStorage
    localStorage.setItem("Productos", JSON.stringify(nuevosProductos));

    // Actualizar estado para que React recargue la tabla
    setProductos(nuevosProductos);
  };

  //------------ SINCRONIZAR PRODUCTOS AL MONTAR EL COMPONENTE ------------
  useEffect(() => {
    const data = localStorage.getItem("Productos");
    if (data) {
      setProductos(JSON.parse(data));
    }
  }, []);

  //------------ RENDER PRINCIPAL ------------
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
        {/* ---------- SECCIÓN AGREGAR PRODUCTO ---------- */}
        <section>
          <h2>Agregar Producto</h2>
          <ProductoAdministrador onAgregar={agregarProducto} />
        </section>

        {/* ---------- SECCIÓN LISTA DE PRODUCTOS ---------- */}
        <section>
          <h2>Productos</h2>
          {productos.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* ---------- SECCIÓN DE COMPRAS / VENTAS ---------- */}
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
