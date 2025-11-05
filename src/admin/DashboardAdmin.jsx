import React, { useState, useEffect } from "react";
import Sidebar from "../componentes/sidebar";
import "../css/adminDashboard.css";
import Productos from "../admin/Productos.jsx";
import BoletasDashboard from "../admin/BoletaDashboard.jsx";

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
        {active === "Órdenes" && <h1>Gestión de Órdenes</h1>}
        {active === "Usuarios" && <h1>Administrar Usuarios</h1>}
        {active === "Reportes" && <h1>Reportes del Sistema</h1>}
        {active === "Perfil" && <h1>Configuración de Perfil</h1>}
      </main>
    </div>
  );
}
