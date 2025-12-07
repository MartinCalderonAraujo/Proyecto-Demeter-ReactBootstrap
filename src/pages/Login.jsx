import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/loginRegistro.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8011/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    if (!response.ok) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    const data = await response.json();

    // SE GUARDA EL TOKEN EN LOCALSTORAGE
    localStorage.setItem("token", data.token);


    navigate("/catalogo");
    window.location.reload();

  } catch (error) {
    console.error("Error en login:", error);
    alert("Ocurrió un error al iniciar sesión");
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
