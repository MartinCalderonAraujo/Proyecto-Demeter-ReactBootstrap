import React, { useMemo } from "react";
import "../css/reporteDashboard.css";
import Sidebar from "../componentes/Sidebar";

export default function ReporteDashboard() {

  const hoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const boletas = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("boletas")) || []; }
    catch { return []; }
  }, []);

  const boletasHoy = boletas.filter(b => (b.fecha || "").startsWith(hoy));

  const totalDia = boletasHoy.reduce((sum, b) => sum + (b.total || 0), 0);
  const cantidadVentas = boletasHoy.length;
  const ticketPromedio = cantidadVentas > 0 ? totalDia / cantidadVentas : 0;

  return (
    <section className="resumen-dia">
        <Sidebar />
      <h1>Resumen de ventas del día</h1>
    
      <div className="cards-dia">

        <div className="card-dia">
          <h2>Ventas realizadas</h2>
          <p>{cantidadVentas}</p>
        </div>

        <div className="card-dia">
          <h2>Total Vendido</h2>
          <p>${totalDia.toLocaleString("es-CL")}</p>
        </div>

        <div className="card-dia">
          <h2>Ticket Promedio</h2>
          <p>${ticketPromedio.toLocaleString("es-CL")}</p>
        </div>

      </div>

      {boletasHoy.length === 0 && <p className="muted">No hay ventas registradas hoy.</p>}
    </section>
  );
}
