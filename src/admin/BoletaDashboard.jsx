import React, { useEffect, useState } from "react";
import Sidebar from "../componentes/Sidebar";
import "../css/boletaDashboard.css";
import "../css/sidebar.css";

export default function BoletasDashboard() {

  // Estado que almacena las boletas
  const [boletas, setBoletas] = useState([]);

  // Estado para el menú activo en el sidebar
  const [activeMenu, setActiveMenu] = useState("Boletas");

  // Estado para la boleta seleccionada
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  // Cargar boletas desde localStorage al montar el componente
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("boletas") || "[]");
    setBoletas(data.reverse());
  }, []);

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar active={activeMenu} setActive={setActiveMenu} />

      <div className="main-content">
        <h2>Boletas Generadas</h2>

        {/* Lista de boletas */}
        {/* Evalua si existen boletas en la lista, si existen muestra la lista, si no muestra un mensaje */}
        {boletas.length === 0 ? (
          <p>No hay boletas registradas.</p>
        ) : (
          <div className="boletas-list">
            <ul>
              {boletas.map((boleta) => (
                <li key={boleta.id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => setBoletaSeleccionada(boleta)}
                    className="ver-boleta-btn"
                  >
                    Ver Boleta #{boleta.id} - {boleta.fecha}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detalles de la boleta seleccionada */}
        {/* Muestra los detalles de la boleta seleccionada, incluyendo productos, cantidades, precios y total */}
        {boletaSeleccionada && (
          <div className="boleta-ticket">
            <h3>🛒 Boleta #{boletaSeleccionada.id}</h3>
            <p><strong>Fecha:</strong> {boletaSeleccionada.fecha}</p>

            <table className="tabla-boleta-ticket">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {boletaSeleccionada.productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.cantidad}</td>
                    <td>${p.precio}</td>
                    <td>${p.precio * p.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-ticket">
              <strong>Total: ${boletaSeleccionada.total}</strong>
            </div>

            <button
              onClick={() => setBoletaSeleccionada(null)}
              className="cerrar-boleta-btn"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
