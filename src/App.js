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
    { nombre: "Admin", email: "admin@demeter.com", password: "admin123", rol: "admin" },
    { nombre: "Juan", email: "juan@demeter.com", password: "juan123", rol: "usuario" }
  ]));
}

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
