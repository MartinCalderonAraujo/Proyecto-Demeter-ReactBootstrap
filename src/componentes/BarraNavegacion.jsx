import React from "react";
import { Link } from "react-router-dom";
import "../css/barra_navegacion.css";

function BarraNavegacion() {
  return (
    <header className="barra-navegacion-header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img
            src="img/logo.png"
            alt="Logo del sitio"
          />
        </Link>
      </div>

      {/* Enlaces de navegación */}
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/app">Demeter</Link>
          </li>
          <li>
            <Link to="/catalogo">Catalogo</Link>
          </li>
          <li>
            <Link to="/Nosotros">Quienes Somos</Link>
          </li>
          <li>
            <Link to="/nosotros">Carrito</Link>
          </li>
        </ul>
      </nav>

      {/* Botones opcionales (por si los activas luego) */}
      <div id="botones-login" className="btn-container">
        <div className="btn">
          <button>Login</button>
        </div>
        <div className="btn">
          <button>Registrar</button>
        </div>
      </div>
    </header>
  );
}

export default BarraNavegacion;

