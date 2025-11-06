import React from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
import "/img/logo.png";

export default function Sidebar({ active, setActive }) {
  const menu = [
    { name: "Dashboard", icon: "", path: "/admin/dashboard" },
    { name: "Órdenes", icon: "", path: "/admin/ordenes" },
    { name: "Productos", icon: "", path: "/admin/productos" },
    { name: "Categorías", icon: "", path: "/admin/categorias" },
    { name: "Usuarios", icon: "", path: "/admin/usuarios" },
    { name: "Reportes", icon: "", path: "/admin/reportes" },
  ];

  return (
    <aside className="sidebar">
      <img src="/img/logo.png" alt="Logo" className="logo" />

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
    </aside>
  );
}
