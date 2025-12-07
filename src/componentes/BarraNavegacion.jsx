import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/barraNavegacion.css";

function BarraNavegacion() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Revisar si hay usuario logueado al cargar la barra mediante el token almacenado
  useEffect(() => {
  const token = localStorage.getItem("token");

  
  if (!token) {
    setUsuario(null);
    setLoading(false);
    return;
  }

  fetch("http://localhost:8011/api/auth/perfil", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`}})
    .then(response => {
      if (!response.ok) {
        throw new Error("No autorizado");
      }
      return response.json();
    })
    .then(data => setUsuario(data))
    .catch(() => setUsuario(null))
    .finally(() => setLoading(false));
}, []);



const handleLogout = () => {
  localStorage.removeItem("token");   // eliminar el JWT
  setUsuario(null);                   // limpiar estado local
  navigate("/");                      // redirigir al home
};


//PLACEHOLDER mientras se carga el estado del usuario
if (loading) {
  return (
    <header className="barra-navegacion-header">
      <div className="logo">
        <img src="/img/logo_simple.png" alt="Logo" />
      </div>
    </header>
  );
}



return (   
    <header className="barra-navegacion-header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src="/img/logo_simple.png" alt="Logo del sitio" />
        </Link>
      </div>

      {/* Enlaces de navegación */}
      {usuario?.rol === "ADMIN" && (
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          
        </ul>
      </nav>
    )}

      {usuario?.rol === "USER" && (
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to ="/Nosotros">Nosotros</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          
        </ul>
      </nav>    
    )}    
    {!usuario && (
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
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
