import React, { useState, useEffect } from "react";
import Sidebar from "../componentes/Sidebar";
import "../css/adminDashboard.css";
import Productos from "./ProductosDashboard.jsx";
import BoletasDashboard from "../admin/BoletaDashboard.jsx";
import CategoriasAdmin from "../admin/Categorias.jsx";
import ReporteDashboard from "./ReporteDashboard.jsx";



export default function DashboardAdmin() {
  const [active, setActive] = useState("Dashboard");
  const [compras, setCompras] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [boletas, setBoletas] = useState([]);

  useEffect(() => {
    setCompras(JSON.parse(localStorage.getItem("compras") || "[]"));
    setProductos(JSON.parse(localStorage.getItem("Productos") || "[]"));
    setUsuarios(JSON.parse(localStorage.getItem("usuarios") || "[]"));
    setBoletas(JSON.parse(localStorage.getItem("boletas") || "[]"));
  }, []);

  return (
    <div className="dashboard-app">
      <Sidebar active={active} setActive={setActive} />
      <main className="dashboard-content">
        {active === "Dashboard" && (
          <div className="resumen">
            <h1>Resumen general</h1>
            <div className="cards">
              <div className="card"><h2>Compras</h2><p>{compras.length}</p></div>
              <div className="card"><h2>Productos</h2><p>{productos.length}</p></div>
              <div className="card"><h2>Usuarios</h2><p>{usuarios.length}</p></div>
              <div className="card"><h2>Boletas</h2><p>{boletas.length}</p></div>
            </div>
          </div>
        )}
        {active === "Productos" && <Productos />}
        {active === "Boletas" && <BoletasDashboard />}
        {active === "Categorias" && <CategoriasAdmin />}
        {active === "Usuarios" && <UsuariosDashboard />}
        {active === "Reportes" && <ReporteDashboard />}
      </main>
    </div>
  );
}
