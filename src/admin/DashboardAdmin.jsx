import React, { useState, useEffect } from "react";
import Sidebar from "../componentes/Sidebar";
import "../css/adminDashboard.css";
import Productos from "./ProductosDashboard.jsx";
import BoletasDashboard from "../admin/BoletaDashboard.jsx";
import CategoriasAdmin from "../admin/Categorias.jsx";
import ReporteDashboard from "./ReporteDashboard.jsx";

export default function DashboardAdmin() {

  // Estado que controla la sección activa del dashboard
  const [active, setActive] = useState("Dashboard");
  
  // Listado de compras cargadas desde localStorage
  const [compras, setCompras] = useState([]);

  // Listado de productos existentes
  const [productos, setProductos] = useState([]);

  // Listado de usuarios registrados
  const [usuarios, setUsuarios] = useState([]);

  // Listado de boletas emitidas
  const [boletas, setBoletas] = useState([]);

  //CAMBIAR POR BACKEND 
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
              {/* CAMBIAR POR BACKEND */}
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
