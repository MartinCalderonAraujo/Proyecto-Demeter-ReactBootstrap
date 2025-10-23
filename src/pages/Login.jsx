import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/loginRegistro.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
  e.preventDefault();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    alert("Correo o contraseña incorrectos");
    return;
  }

  // Guardar sesión
  localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

  // Redirigir según rol
  if (usuario.rol === "admin") {
    navigate("/admin"); // Dashboard
  } else {
    navigate("/catalogo"); // Usuarios normales
  }
};

  return (
    <main className="login-registro">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/registro">Registrarse</Link>
      </p>
    </main>
  );
}
