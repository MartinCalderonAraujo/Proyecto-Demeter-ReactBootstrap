import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/loginRegistro.css";

export default function Registro() {
  const navigate = useNavigate();
  //USE STATE PARA FORMULARIO
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // --------Funciones varias -------
    
  function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|duocuc|demeter)\.(com|cl)$/;
    return regex.test(email);
  }

  function validarPassword(pw) {
    return pw.length >= 6;
  }
//---------------------------------

 const handleRegistro = async (e) => {
  e.preventDefault();
// -------- VALIDACIONES --------
    if (!nombre) {
      setError("El nombre es obligatorio");
      return;}

    if (!validarEmail(email)) {
      setError("Correo inválido. Debe ser gmail, duocuc o demeter y terminar en .com o .cl");
      return;}

    if (!validarPassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;}

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;}
// -------- GUARDAR USUARIO EN BACKEND --------
  try {
    const response = await fetch("http://localhost:8011/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        password: password
      }),
    });

    if (!response.ok) {
      setError("No se pudo registrar el usuario");
      return;
    }

    alert("Usuario registrado correctamente");
    navigate("/login");

  } catch (error) {
    console.error("Error en registro:", error);
    setError("Ocurrió un error al registrarse");
  };
};

// -------- RENDER de HTML --------
  return (
    <main className="login-registro">
      <h1>Registro</h1>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value.trim())}
          className={error && !nombre ? 'error' : ''}
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={error && !validarEmail(email) ? 'error' : ''}
        />
        <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        className={error && !validarPassword(password) ? 'error' : ''}
        />

        <input
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirmar contraseña"
        className={error && password !== confirmPassword ? 'error' : ''}
        />

      {error && <span className="error">{error}</span>}
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </main>
  );
}
