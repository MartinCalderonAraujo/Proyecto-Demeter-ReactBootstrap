import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/barraNavegacion.css";


function BarraNavegacion() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Revisar si hay usuario logueado al cargar la barra
  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    setUsuario(usuarioLogueado);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    setUsuario(null);
    navigate("/");
  };

  return (
    <header className="barra-navegacion-header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src="/img/logo.png" alt="Logo del sitio" />
        </Link>
      </div>

      {/* Enlaces de navegación */}
      {usuario?.rol === "admin" && (
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Demeter</Link></li>
          <li><Link to="/admin">Dashboard Productos</Link></li>
          <li><Link to ="/Nosotros">Nosotros</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          
        </ul>
      </nav>
    )}

      {usuario?.rol === "usuario" && (
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Demeter</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to ="/Nosotros">Nosotros</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          
        </ul>
      </nav>    
    )}    
    {!usuario && (
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Demeter</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to ="/Nosotros">Nosotros</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          
        </ul>
      </nav>    
    )}  
      {/* Botones Login / Registro o Logout */}
      <div id="botones-login" className="btn-container">
        {!usuario && (
          <>
            <div className="btn">
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
            <div className="btn">
              <Link to="/registro">
                <button>Registrar</button>
              </Link>
            </div>
          </>
        )}
        {usuario && (
          <>
            <div className="btn">
              <Link to="/perfil">
                <button>Mi Perfil</button>
              </Link>
            </div>
            <div className="btn">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default BarraNavegacion;
