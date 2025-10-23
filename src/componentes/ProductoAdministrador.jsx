import { useState } from "react";
import "../css/productoAdministrador.css";

export default function ProductoAdministrador({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !precio || !imagen) return;
    onAgregar({ nombre, precio: Number(precio), imagen });
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
