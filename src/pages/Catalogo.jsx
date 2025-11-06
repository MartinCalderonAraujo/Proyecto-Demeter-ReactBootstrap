import "../css/catalogo.css";
import { Link } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { CarritoContext } from "../componentes/CarritoControlador";

/* === misma lógica de categoría que usas en CategoriasAdmin === */
function categoriaPorNombre(nombre) {
  const n = (nombre || "").toLowerCase();
  if (n.includes("dron")) return "Drones";
  if (n.includes("robot")) return "Automatización";
  if (n.includes("camara") || n.includes("cámara") || n.includes("escaneo"))
    return "Cámaras / Imágenes";
  if (n.includes("macetero")) return "Maceteros";
  if (n.includes("portatil") || n.includes("portátil")) return "Portátiles";
  if (["humedad","luz","voltaje","ph","temperatura","co2","npk"].some(k => n.includes(k)))
    return "Sensores";
  return "Otros";
}

function formatCLP(n) {
  return n.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

export default function Catalogo() {
  const { agregarProducto } = useContext(CarritoContext);

  // Productos del storage (robusto contra JSON inválido)
  const productos = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("Productos")) || []; }
    catch { return []; }
  }, []);

  // Armamos categorías disponibles y conteos
  const orden = ["Sensores","Drones","Automatización","Cámaras / Imágenes","Portátiles","Maceteros","Otros"];
  const { categorias, conteoPorCat } = useMemo(() => {
    const counts = {};
    for (const p of productos) {
      const cat = categoriaPorNombre(p.nombre);
      counts[cat] = (counts[cat] || 0) + 1;
    }
    const cats = orden.filter(c => counts[c] > 0);
    return { categorias: cats, conteoPorCat: counts };
  }, [productos]);

  // Filtro de UI
  const [catSel, setCatSel] = useState("Todos");

  // Lista filtrada
  const lista = useMemo(() => {
    if (catSel === "Todos") return productos;
    return productos.filter(p => categoriaPorNombre(p.nombre) === catSel);
  }, [productos, catSel]);

  return (
    <main className="catalogo">
      {/* Filtros */}
      <div className="filtros">
        <div className="filtros__chips">
          <button
            className={`chip ${catSel === "Todos" ? "active" : ""}`}
            onClick={() => setCatSel("Todos")}
          >
            Todos <span className="badge">{productos.length}</span>
          </button>

          {categorias.map(cat => (
            <button
              key={cat}
              className={`chip ${catSel === cat ? "active" : ""}`}
              onClick={() => setCatSel(cat)}
            >
              {cat} <span className="badge">{conteoPorCat[cat]}</span>
            </button>
          ))}
        </div>

        
      </div>

      {/* Grid de productos */}
      {lista.length === 0 ? (
        <p className="muted no-results">No hay productos en esta categoría.</p>
      ) : (
        <section className="contenedor-item">
          {lista.map((p) => (
            <div key={p.id} className="producto">
              <figure>
                <Link to={`/producto/${p.id}`}>
                  <img src={p.imagen} alt={p.nombre} loading="lazy" />
                </Link>
              </figure>
              <div className="info-producto">
                <h2 className="prod-nombre">{`Sensor de ${p.nombre.toLowerCase()}`}</h2>
                <p className="prod-precio">{formatCLP(p.precio)}</p>
                <button onClick={() => agregarProducto(p)}>
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
