import { useState, useEffect } from "react";
import ProductoAdministrador from "../componentes/ProductoAdministrador";
import Sidebar from "../componentes/Sidebar";
import "../css/productoDashboard.css";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:8011/api/producto";

// Obtener token del localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Crear producto en la API
async function crearProductoApi(producto) {
  const token = getToken();

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Error al crear producto: ${res.status} ${errText}`);
  }

  return res.json();
}

export default function Productos() {
  const [productos, setProductos] = useState([]);

  // -------------------------------
  //   AGREGAR PRODUCTO
  // -------------------------------

  const agregarProducto = async (nuevoProducto) => {
    const nombre = nuevoProducto.nombreProducto?.trim();
    const precio = nuevoProducto.precioProducto;
    const categoria = nuevoProducto.categoriaProducto?.trim();

    // Validaciones
    if (!nombre)
      throw new Error("El nombre del producto no puede estar vacío.");

    if (nombre.length > 40)
      throw new Error(
        "El nombre del producto no puede tener más de 40 caracteres."
      );

    const existe = productos.some(
      (p) => p.nombreProducto.toLowerCase() === nombre.toLowerCase()
    );
    if (existe) throw new Error("Ya existe un producto con ese nombre.");

    if (precio === "" || precio === null || precio === undefined)
      throw new Error("El precio del producto es obligatorio.");

    if (!Number.isInteger(Number(precio)))
      throw new Error("El precio debe ser un número entero.");

    if (Number(precio) <= 0)
      throw new Error("El precio debe ser mayor que 0.");

    // Crear paquete para el backend
    const paqueteProducto = {
      nombreProducto: nombre,
      precioProducto: Number(precio),
      categoriaProducto: categoria,
      urlImagen: nuevoProducto.urlImagen || "",
    };

    try {
      const creado = await crearProductoApi(paqueteProducto);
      setProductos([...productos, creado]);
    } catch (e) {
      console.error("Error agregando producto:", e);
    }
  };

  // -------------------------------
  //   ELIMINAR PRODUCTO
  // -------------------------------

  async function eliminarProductoApi(id) {
    const token = getToken();

    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Error al eliminar producto: ${res.status} ${errText}`);
    }
  }

  const eliminarProducto = async (id) => {
      const confirmar = window.confirm(
    "¿Estás seguro de que deseas eliminar este producto?"
  );

  if (!confirmar) return; // Si cancela, no hace nada

    try {
      await eliminarProductoApi(id);
      setProductos(productos.filter((p) => p.idProducto !== id));
    } catch (e) {
      console.error("Error eliminando producto:", e);
    }
  };

  //   OBTENER PRODUCTOS
  // -------------------------------

  async function obtenerProductosApi() {
    const token = getToken();

      const headers = token
    ? { "Authorization": `Bearer ${token}` }
    : {}; // ← SIN TOKEN
    
    const res = await fetch(API_BASE, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      throw new Error(`Error al obtener productos: ${res.status}`);
    }

    return res.json();
  }

  // -------------------------------
  //   CARGAR PRODUCTOS AL MONTAR
  // -------------------------------

  useEffect(() => {
    let mounted = true;

    obtenerProductosApi()
      .then((data) => {
        if (mounted) {
          setProductos(Array.isArray(data) ? data : []);
        }
      })
      .catch((e) => console.error("Error cargando productos:", e));

    return () => {
      mounted = false;
    };
  }, []);

  // -------------------------------
  //   RENDER
  // -------------------------------

  return (
    <div className="producto-dashboard">
      <Sidebar />

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
                  <tr key={producto.idProducto}>
                    <td>{producto.idProducto}</td>
                    <td>{producto.nombreProducto}</td>
                    <td>${producto.precioProducto}</td>
                    <td>{producto.categoriaProducto}</td>
                    <td>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarProducto(producto.idProducto)}
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
      </main>
    </div>
  );
}
