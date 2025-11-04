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

  //Estados principales
  const [productos, setProductos] = useState(loadProductosFromStorage());
  const [ventas, setVentas] = useState([]);

  //------------ VALIDACIONES AL CREAR NUEVO PRODUCTO ------------
  const agregarProducto = (nuevoProducto) => {
  const nombre = nuevoProducto.nombre?.trim();
  const precio = nuevoProducto.precio;
  const categoria = nuevoProducto.categoria?.trim();

  // Validacion de nombre
  if (!nombre) throw new Error("El nombre del producto no puede estar vacío.");
  if (nombre.length > 40)
    throw new Error("El nombre del producto no puede tener más de 40 caracteres.");
  const existe = productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
  if (existe) throw new Error("Ya existe un producto con ese nombre.");

  //Validacion de precio
  if (precio === "" || precio === null || precio === undefined)
      throw new Error("El precio del producto es obligatorio.");
  if (!Number.isInteger(Number(precio)))
      throw new Error("El precio debe ser un número entero.");
  if (Number(precio) <= 0)
      throw new Error("El precio debe ser mayor que 0.");

  //--------- SI TESTS APROBADOS, SE CREA EL PRODUCTO ------------
     const nuevoId =
      productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;

    const nuevoArrayProductos = [
      ...productos,
      { ...nuevoProducto, id: nuevoId, nombre, categoria, precio: Number(precio) },
    ];

    setProductos(nuevoArrayProductos);
    localStorage.setItem("Productos", JSON.stringify(nuevoArrayProductos));
    return { ok: true }; // ✅ indica éxito (usado por el formulario)
  };



  //------------ FUNCIÓN PARA ELIMINAR PRODUCTO ------------
  const eliminarProducto = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    // Filtrar el producto eliminado
    const nuevosProductos = productos.filter((p) => p.id !== id);
    // Actualizar localStorage
    localStorage.setItem("Productos", JSON.stringify(nuevosProductos));
    setProductos(nuevosProductos);
  };
//-----------------------------------------------------------
  //Se carga una vez al iniciar el componente
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