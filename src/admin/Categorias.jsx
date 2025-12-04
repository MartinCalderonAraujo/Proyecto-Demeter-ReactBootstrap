import React, { useMemo, useState } from "react";
import "../css/categorias.css";
import Sidebar from "../componentes/Sidebar";

// Determina la categoría de un producto según su nombre
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

// 
export default function CategoriasAdmin() {

  // Cargar productos desde localStorage
  const productos = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("Productos")) || []; }
    catch { return []; }
  }, []);

  // Agrupar productos por categoría
  const grupos = useMemo(() => {
    const g = {};
    for (const p of productos) {
      const cat = categoriaPorNombre(p.nombre);
      if (!g[cat]) g[cat] = [];
      g[cat].push(p);
    }
    return g;
  }, [productos]);

  // Orden de categorías a mostrar
  const orden = ["Sensores","Drones","Automatización","Cámaras / Imágenes","Portátiles","Maceteros","Otros"];
  const categorias = orden.filter(c => grupos[c]?.length);

  // para ver productos de una categoría en un panel inferior
  const [catSel, setCatSel] = useState(null);

  return (
    <section className="cat-admin">
      <header className="cat-admin__head">
        <h1>Categorías</h1>
        <p className="muted">Agrupación automática según el nombre del producto.</p>
      </header>

      <Sidebar />
      {/* GRID de categorías */}
      <div className="cat-grid">
        {categorias.map((cat) => {
          const count = grupos[cat].length;
          const img = grupos[cat][0]?.imagen;
          return (
            // Boton de categoría, al hacer click muestra el listado de productos
            // parametros cat (nombre de la categoría), count (cantidad de productos), img (imagen del primer producto)
            // count (numero de productos en la categoría), catSel (categoría seleccionada), setCatSel (función para cambiar la categoría seleccionada)
            <button
              key={cat}
              className={`cat-card ${catSel === cat ? "active" : ""}`}
              onClick={() => setCatSel(cat === catSel ? null : cat)}
              title={`Ver ${count} producto(s) en ${cat}`}
            >
              <div className="cat-card__thumb">
                {img ? <img src={img} alt={cat} loading="lazy" /> : <span className="noimg">🗂️</span>}
              </div>
              <div className="cat-card__info">
                <h3>{cat}</h3>
                <span className="badge">{count}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Listado de la categoría seleccionada */}
      {catSel && (
        <div className="cat-list card">
          <div className="cat-list__head">
            <h2>{catSel}</h2>
            <span className="muted">{grupos[catSel].length} producto(s)</span>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{width:60}}></th>
                  <th>Nombre</th>
                  <th style={{width:150}}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {grupos[catSel].map(p => (
                  <tr key={p.id}>
                    <td>
                      <img className="thumb" src={p.imagen} alt={p.nombre} loading="lazy" />
                    </td>
                    <td>{p.nombre}</td>
                    <td>${p.precio?.toLocaleString("es-CL")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
