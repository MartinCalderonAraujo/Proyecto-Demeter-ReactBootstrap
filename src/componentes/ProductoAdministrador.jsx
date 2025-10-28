import { useState } from "react";
import "../css/productoAdministrador.css";

export default function ProductoAdministrador({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Si no hay nombre, precio o imagen, no hacer nada
    if (!nombre || !precio) return;

    // Si no se proporciona una imagen, establecer una imagen por defecto
    const imagenFinal = imagen || "/img/default.webp"; // Cambia la ruta a tu imagen por defecto

    // Llamar a onAgregar con los datos del nuevo producto
    onAgregar({ nombre, precio: Number(precio), imagen: imagenFinal });

    // Limpiar el formulario
    setNombre("");
    setPrecio("");
    setImagen("");
  };

  return (
    <form className="producto-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />
      
      <button type="submit">Agregar Producto</button>
    </form>
  );
}
