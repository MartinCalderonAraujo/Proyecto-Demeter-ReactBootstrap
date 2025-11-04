import { useState } from "react";
import "../css/productoAdministrador.css";

export default function ProductoAdministrador({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  // Estado para errores de validación
  const [errores, setErrores] = useState({
    nombre: "",
    precio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
try {
      // Si no se proporciona una imagen, establecer una imagen por defecto
      const imagenFinal = imagen || "/img/default.webp"; // Cambia la ruta a tu imagen por defecto

      // Intentamos agregar el producto con las validaciones del AdminDashboard
      onAgregar({ nombre, precio: Number(precio), imagen });

      // En caso positivo, se limpia formulario y errores
      setNombre("");
      setPrecio("");
      setImagen("");
      setErrores({});
      
      //en caso negativo, se captura el error
    } catch (error) {
      const mensaje = error.message.toLowerCase();
      const nuevosErrores = {};

      if (mensaje.includes("nombre")) {
        nuevosErrores.nombre = error.message;
      } else if (mensaje.includes("precio")) {
        nuevosErrores.precio = error.message;
      }

      setErrores(nuevosErrores);
    }
  };


  return (
    <form className="producto-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className={errores.nombre ? "input-error" : ""}
      />
      {errores.nombre && <p className="error-text">{errores.nombre}</p>}

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className={errores.precio ? "input-error" : ""}
      />
      {errores.precio && <p className="error-text">{errores.precio}</p>}

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