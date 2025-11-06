import React, { useMemo, useState } from "react";
import "../css/usuariosDashboard.css";
import Sidebar from "../componentes/Sidebar";
export default function UsuariosDashboard() {
  // Cargar usuarios desde localStorage
  const usuarios = useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem("usuarios")) || [];
      // Normaliza campos mínimos
      return data.map(u => ({
        id: u.id ?? "",
        nombre: u.nombre ?? "",
        email: u.email ?? "",
        rol: u.rol ?? "usuario",
      }));
    } catch {
      return [];
    }
  }, []);

  const [q, setQ] = useState(""); // búsqueda por ID

  // Filtra por ID (acepta parcial)
  const filtrados = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return usuarios;
    return usuarios.filter(u => String(u.id).toLowerCase().includes(query));
  }, [q, usuarios]);

  return (
    <section className="users-admin">
      <header className="users-head">
        <div>
          <h1>Usuarios</h1>
          <p className="muted">Consulta y busca por <strong>ID</strong>.</p>
        </div>
        <Sidebar />
        <div className="users-kpis">
          <div className="kpi">
            <span className="kpi-label">Total</span>
            <span className="kpi-value">{usuarios.length}</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Mostrados</span>
            <span className="kpi-value">{filtrados.length}</span>
          </div>
        </div>
      </header>

      <div className="users-toolbar">
        <input
          className="input"
          type="search"
          inputMode="numeric"
          placeholder="Buscar por ID…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="table-wrap card">
        {filtrados.length === 0 ? (
          <p className="muted">No hay usuarios para esta búsqueda.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{width: 140}}>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th style={{width: 140}}>Rol</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => (
                <tr key={u.id}>
                  <td><code>{u.id}</code></td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role role--${(u.rol || "usuario").toLowerCase()}`}>
                      {u.rol}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
