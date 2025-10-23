import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/loginRegistro.css";

export default function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleRegistro = (e) => {
  e.preventDefault();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Nuevo usuario
  const nuevoUsuario = {
    nombre,
    email,
    password,
    rol: "usuario" // <-- aquí le asignamos rol por defecto
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Usuario registrado correctamente");
  navigate("/login");
};


  return (
    <main className="login-registro">
      <h1>Registro</h1>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </main>
  );
}
