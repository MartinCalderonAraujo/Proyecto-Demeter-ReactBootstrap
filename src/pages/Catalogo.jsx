import { useState, useEffect, useMemo, useContext } from "react";
import { CarritoContext } from "../componentes/CarritoControlador";
import { Link } from "react-router-dom";
import "../css/catalogo.css";

export default function Catalogo() {
  const { agregarProducto } = useContext(CarritoContext);
  const [productos, setProductos] = useState([]);

  // Cargar productos desde EL backend
  useEffect(() => {
    fetch("http://localhost:8011/api/producto")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  }, []);

  // LISTA DE CATEGORÍAS EN ORDEN DESEADO
  const orden = ["Sensores", "Drones", "Automatizacion", "Camaras / Imagenes", "Portatiles", "Macetero"];

  // Conteo de categorías
  const { categorias, conteoPorCat } = useMemo(() => {
    const counts = {};
    for (const p of productos) {
      const cat = p.categoriaProducto; 
      counts[cat] = (counts[cat] || 0) + 1;
    }
    const cats = orden.filter(c => counts[c] > 0);
    return { categorias: cats, conteoPorCat: counts };
  }, [productos]);

  const [catSel, setCatSel] = useState("Todos");

  // Lista filtrada
  const lista = useMemo(() => {
    if (catSel === "Todos") return productos;
    return productos.filter(p => p.categoriaProducto === catSel);
  }, [productos, catSel]);

  // Formato CLP
  function formatCLP(n) {
    return n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  }

  return (
    <main className="catalogo">
      <div className="filtros">
        <div className="filtros__chips">
          <button className={`chip ${catSel === "Todos" ? "active" : ""}`} onClick={() => setCatSel("Todos")}>
            Todos <span className="badge">{productos.length}</span>
          </button>
          {categorias.map(cat => (
            <button key={cat} className={`chip ${catSel === cat ? "active" : ""}`} onClick={() => setCatSel(cat)}>
              {cat} <span className="badge">{conteoPorCat[cat]}</span>
            </button>
          ))}
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="muted no-results">No hay productos en esta categoría.</p>
      ) : (
        <section className="contenedor-item">
          {lista.map(p => (
            <div key={p.idProducto} className="producto">
              <figure>
                <Link to={`/producto/${p.idProducto}`}>
                  <img src={p.urlImagen} alt={p.nombreProducto} loading="lazy" />
                </Link>
              </figure>
              <div className="info-producto">
                <h2 className="prod-nombre">{p.nombreProducto}</h2>
                <p className="prod-precio">{formatCLP(p.precioProducto)}</p>
                <button onClick={() => agregarProducto({
                  id: p.idProducto,
                  nombre: p.nombreProducto,
                  precio: p.precioProducto,
                  imagen: p.urlImagen
                })}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}