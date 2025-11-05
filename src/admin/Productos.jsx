import { useState, useEffect } from "react";
import ProductoAdministrador from "../componentes/ProductoAdministrador";
import Sidebar from "../componentes/Sidebar";

 // 👈 Importa el Sidebar
import "../css/productoDashboard.css";

export default function Productos() {
  // Cargar productos desde localStorage
  const loadProductosFromStorage = () => {
    const productosGuardados = JSON.parse(localStorage.getItem("Productos"));
    return productosGuardados ? productosGuardados : [];
  };

  const [productos, setProductos] = useState(loadProductosFromStorage());
  const [ventas] = useState([]);

  // Agregar producto
  const agregarProducto = (nuevoProducto) => {
    const nombre = nuevoProducto.nombre?.trim();
    const precio = nuevoProducto.precio;
    const categoria = nuevoProducto.categoria?.trim();

    if (!nombre) throw new Error("El nombre del producto no puede estar vacío.");
    if (nombre.length > 40)
      throw new Error("El nombre del producto no puede tener más de 40 caracteres.");
    const existe = productos.some(
      (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (existe) throw new Error("Ya existe un producto con ese nombre.");

    if (precio === "" || precio === null || precio === undefined)
      throw new Error("El precio del producto es obligatorio.");
    if (!Number.isInteger(Number(precio)))
      throw new Error("El precio debe ser un número entero.");
    if (Number(precio) <= 0)
      throw new Error("El precio debe ser mayor que 0.");

    const nuevoId =
      productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;

    const nuevoArrayProductos = [
      ...productos,
      { ...nuevoProducto, id: nuevoId, nombre, categoria, precio: Number(precio) },
    ];

    setProductos(nuevoArrayProductos);
    localStorage.setItem("Productos", JSON.stringify(nuevoArrayProductos));
    return { ok: true };
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    const nuevosProductos = productos.filter((p) => p.id !== id);
    localStorage.setItem("Productos", JSON.stringify(nuevosProductos));
    setProductos(nuevosProductos);
  };

  // Cargar al montar
  useEffect(() => {
    const data = localStorage.getItem("Productos");
    if (data) setProductos(JSON.parse(data));
  }, []);

  return (
    <div className="producto-dashboard">
      <Sidebar /> {/* 👈 Sidebar ahora es su propio componente */}
      <main>
        <section>
          <h2>Agregar Producto</h2>
          <ProductoAdministrador onAgregar={agregarProducto} />
        </section>

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
