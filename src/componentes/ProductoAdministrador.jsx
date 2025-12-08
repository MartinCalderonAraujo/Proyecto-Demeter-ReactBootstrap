import { useState } from "react";
import "../css/productoAdministrador.css";

export default function ProductoAdministrador({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState(""); 
  const [imagen, setImagen] = useState("");

  const [errores, setErrores] = useState({
    nombre: "",
    precio: "",
    categoria: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!categoria.trim()) {
        throw new Error("La categoría no puede estar vacía.");
      }

      const paquete = {
        nombreProducto: nombre,
        precioProducto: Number(precio),
        categoriaProducto: categoria,
        urlImagen: imagen || "/img/default.webp",
      };

      onAgregar(paquete);

      // Reset
      setNombre("");
      setPrecio("");
      setCategoria("");
      setImagen("");
      setErrores({});
    } catch (error) {
      const msg = error.message.toLowerCase();
      const nuevosErrores = {};

      if (msg.includes("nombre")) nuevosErrores.nombre = error.message;
      if (msg.includes("precio")) nuevosErrores.precio = error.message;
      if (msg.includes("categor")) nuevosErrores.categoria = error.message;

      setErrores(nuevosErrores);
    }
  };

  return (
    <form className="producto-form" onSubmit={handleSubmit}>

      {/* Nombre */}
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className={errores.nombre ? "input-error" : ""}
      />
      {errores.nombre && <p className="error-text">{errores.nombre}</p>}

      {/* Precio */}
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className={errores.precio ? "input-error" : ""}
      />
      {errores.precio && <p className="error-text">{errores.precio}</p>}

      {/* Categoría */}
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className={errores.categoria ? "input-error" : ""}
      >
        <option value="">Seleccionar categoría</option>
        <option value="Sensores">Sensores</option>
        <option value="Drones">Drones</option>
        <option value="Automatizacion">Automatización</option>
        <option value="Camaras / Imagenes">Cámaras / Imágenes</option>
        <option value="Portatiles">Portátiles</option>
        <option value="Maceteros">Maceteros</option>
      </select>
      {errores.categoria && <p className="error-text">{errores.categoria}</p>}

      {/* Imagen */}
      <input
        type="text"
        placeholder="URL de imagen (opcional)"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />

      <button type="submit">Agregar Producto</button>
    </form>
  );
}
