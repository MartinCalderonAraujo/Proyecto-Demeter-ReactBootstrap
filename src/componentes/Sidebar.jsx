import React from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";

export default function Sidebar({ active, setActive }) {
  const menu = [
    { name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { name: "Órdenes", icon: "🧾", path: "/admin/ordenes" },
    { name: "Productos", icon: "📦", path: "/admin/productos" },
    { name: "Categorías", icon: "🗂️", path: "/admin/categorias" },
    { name: "Usuarios", icon: "👥", path: "/admin/usuarios" },
    { name: "Reportes", icon: "📈", path: "/admin/reportes" },
    { name: "Perfil", icon: "⚙️", path: "/admin/perfil" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Demeter</h2>

      <nav>
        <ul>
          {menu.map((item) => (
            <li
              key={item.name}
              className={active === item.name ? "active" : ""}
              onClick={() => setActive(item.name)}
            >
              <Link to={item.path} className="menu-link">
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="user-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="user"
          className="user-avatar"
        />
        <p>Admin</p>
      </div>
    </aside>
  );
}
