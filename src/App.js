import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./componentes/BarraNavegacion";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Nosotros from "./pages/Nosotros";
import PaginaProducto from "./pages/PaginaProducto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import AdminDashboard from "./pages/AdminDashboard";
import { CarritoControlador } from "./componentes/CarritoControlador";

// Crear usuarios iniciales si no existen
if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify([
    { id: "1", nombre: "Admin", email: "admin@demeter.com", password: "admin123", rol: "admin" },
    { id: "2", nombre: "Juan", email: "juan@demeter.com", password: "juan123", rol: "usuario" }
  ]));
}

localStorage.setItem("Productos", JSON.stringify([
  { id: 1, nombre: 'Humedad', precio: 30000, imagen: '/img/sensorHumedad.jpg' },
    { id: 2, nombre: 'Luz', precio: 30000, imagen: '/img/sensorLuz.jpg' },
    { id: 3, nombre: 'Voltaje', precio: 30000, imagen: '/img/sensorVoltaje.jpg' },
    { id: 4, nombre: 'Ph', precio: 30000, imagen: '/img/sensorPh.jpg' },
    { id: 5, nombre: 'Temperatura', precio: 30000, imagen: '/img/sensorTemperatura.jpg' },
    { id: 6, nombre: 'Co2', precio: 30000, imagen: '/img/sensorCo2.jpg' },
    { id: 7, nombre: 'NPK', precio: 30000, imagen: '/img/sensorNPK.png' },
    { id: 8, nombre: 'Portatil', precio: 30000, imagen: '/img/sensorPortatil.png' },
    { id: 9, nombre: 'Camara de escaneo', precio: 30000, imagen: '/img/camaraEscaneo.png' },
    { id: 10, nombre: 'Dron escaneo', precio: 30000, imagen: '/img/dronEscaneo.png' },
    { id: 11, nombre: 'Robot riego', precio: 30000, imagen: '/img/robotRiego.png' },
    { id: 12, nombre: 'Dron fumigador', precio: 30000, imagen: '/img/dronFumigador.png' },
    { id: 13, nombre: 'Macetero v1', precio: 30000, imagen: '/img/maceteroV1.png' },
    { id: 14, nombre: 'Macetero v2', precio: 30000, imagen: '/img/maceteroV2.png' },
    { id: 15, nombre: 'Macetero v3', precio: 30000, imagen: '/img/maceteroV3.png' }]));

function RutaAdmin({ children }) {
  const USUARIO= JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!USUARIO || USUARIO.rol !== "admin") {
    return <p>No tienes acceso a esta página</p>;
  }
  return children;
}


function App() {
  return (
    <CarritoControlador>
      <Router>
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/producto/:id" element={<PaginaProducto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route 
            path="/admin" 
            element={
              <RutaAdmin>
                <AdminDashboard />
              </RutaAdmin>
            } 
          />
      </Routes>
    </Router>
    </CarritoControlador>
  );
}

export default App;
