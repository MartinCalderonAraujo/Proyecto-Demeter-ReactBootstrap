import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./componentes/BarraNavegacion";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Nosotros from "./pages/Nosotros";
import PaginaProducto from "./pages/PaginaProducto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Productos from "./admin/ProductosDashboard.jsx";
import { CarritoControlador } from "./componentes/CarritoControlador";
import Perfil from "./pages/Perfil";
import DashboardAdmin from "./admin/DashboardAdmin.jsx";
import BoletasDashboard from "./admin/BoletaDashboard.jsx";
import CatalogoPorCategorias from "./admin/Categorias.jsx";
import UsuariosDashboard from "./admin/UsuariosDashboard.jsx";
import ReporteDashboard from "./admin/ReporteDashboard.jsx";

// Crear usuarios iniciales si no existen
//if (!localStorage.getItem("usuarios")) {
 // localStorage.setItem("usuarios", JSON.stringify([
  //  { id: "1", nombre: "Admin", email: "admin@demeter.com", password: "admin123", rol: "admin" },
 //   { id: "2", nombre: "Juan", email: "juan@demeter.com", password: "juan123", rol: "usuario" }
  //]));
//}

//if (!localStorage.getItem("Productos")) {
  //localStorage.setItem("Productos", JSON.stringify([
    //{ id: 1, nombre: 'Humedad', precio: 30000, imagen: '/img/sensorHumedad.jpg' },
    //{ id: 2, nombre: 'Luz', precio: 30000, imagen: '/img/sensorLuz.jpg' },
    //{ id: 3, nombre: 'Voltaje', precio: 30000, imagen: '/img/sensorVoltaje.jpg' },
    //{ id: 4, nombre: 'Ph', precio: 30000, imagen: '/img/sensorPh.jpg' },
    //{ id: 5, nombre: 'Temperatura', precio: 30000, imagen: '/img/sensorTemperatura.jpg' },
    //{ id: 6, nombre: 'Co2', precio: 30000, imagen: '/img/sensorCo2.jpg' },
    //{ id: 7, nombre: 'NPK', precio: 30000, imagen: '/img/sensorNPK.png' },
    //{ id: 8, nombre: 'Portatil', precio: 30000, imagen: '/img/sensorPortatil.png' },
    //{ id: 9, nombre: 'Camara de escaneo', precio: 30000, imagen: '/img/camaraEscaneo.png' },
    //{ id: 10, nombre: 'Dron escaneo', precio: 30000, imagen: '/img/dronEscaneo.png' },
    //{ id: 11, nombre: 'Robot riego', precio: 30000, imagen: '/img/robotRiego.png' },
    //{ id: 12, nombre: 'Dron fumigador', precio: 30000, imagen: '/img/dronFumigador.png' },
    //{ id: 13, nombre: 'Macetero v1', precio: 30000, imagen: '/img/maceteroV1.png' },
    //{ id: 14, nombre: 'Macetero v2', precio: 30000, imagen: '/img/maceteroV2.png' },
    //{ id: 15, nombre: 'Macetero v3', precio: 30000, imagen: '/img/maceteroV3.png' }
  //]));
//}



import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RutaAdmin({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

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
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUsuario(data))
      .catch(() => setUsuario(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;

  //No logueado
  if (!usuario) return <p>No tienes acceso a esta página</p>;

  // Tiene usuario pero NO es admin
  if (usuario.rol !== "ADMIN") return <p>No tienes acceso a esta página</p>;

  // Es admin
  return children;  

}

function App() {
  return (
    <CarritoControlador>
      <Router>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/reportes" element={<RutaAdmin><ReporteDashboard /></RutaAdmin>} />
          <Route path="/admin/usuarios" element={<RutaAdmin><UsuariosDashboard /></RutaAdmin>} />
          <Route path="/admin/categorias" element={<RutaAdmin><CatalogoPorCategorias /></RutaAdmin>} />
          <Route path="/admin/dashboard" element={<RutaAdmin><DashboardAdmin /></RutaAdmin>} />
          <Route path="/admin/ordenes" element={<RutaAdmin><BoletasDashboard /></RutaAdmin>} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<PaginaProducto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route
            path="/admin/productos"
            element={
              <RutaAdmin>
                <Productos />
              </RutaAdmin>
            }
          />
        </Routes>
      </Router>
    </CarritoControlador>
  );
}


export default App
