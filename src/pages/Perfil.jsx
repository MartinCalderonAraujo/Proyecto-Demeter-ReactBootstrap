import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Perfil() {
  //------------ USE STATES Y USE EFFECTS --------------
  const navigate = useNavigate();
  
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [error, setError] = useState("");

    // --------Funciones de validación -------
  function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|duocuc|demeter)\.(com|cl)$/;
    return regex.test(email);
  }

  function validarPassword(pw) {
    return pw.length >= 6;
  }

  // Cargar usuario logueado desde localStorage
  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado) {
      setUsuario(usuarioLogueado);
      setNombre(usuarioLogueado.nombre || "");
      setEmail(usuarioLogueado.email || "");
      setPassword(usuarioLogueado.password || "");
    } else {
      // Si no hay usuario logueado, redirige al login
      navigate("/login");
    }
  }, [navigate]);



// Función para alternar entre modo edición y vista
  const toggleEditMode = () => {
    if (editMode) {
// ------ Validaciones-----
      if (!nombre.trim()) {
        setError("El nombre es obligatorio");
        return;
      }

      if (!validarEmail(email)) {
        setError("Correo inválido. Debe ser gmail, duocuc o demeter y terminar en .com o .cl");
        return;
      }

      if (!validarPassword(password)) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      
      // Guardar cambios
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Actualizar el usuario en la lista de usuarios solo alterando los campos editables
      const usuariosActualizados = usuarios.map((u) =>
        u.email === usuario.email
          ? { ...u, nombre, email, password}
          : u
      );

      // Guardar lista actualizada
      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

      // Actualizar usuario logueado
      const usuarioActualizado = {      // conserva id, rol
        ...usuario, nombre, email, password};
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));
      setUsuario(usuarioActualizado);

      console.log("Cambios guardados correctamente.");
    }

    // Cambiar modo
    setEditMode(!editMode);
  };

  if (!usuario) return <p>Cargando datos del usuario...</p>;

  return (
    <main className="perfil-usuario">
      <div className="perfil-container">
        <h2>Perfil del Usuario</h2>

        <table className="perfil-table">
          <tbody>
            <tr>
              <td><strong>Nombre</strong></td>
              <td>
                {editMode ? (
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="perfil-input"
                  />
                ) : (
                  usuario.nombre
                )}
              </td>
            </tr>

            <tr>
              <td><strong>Correo</strong></td>
              <td>
                {editMode ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="perfil-input"
                  />
                ) : (
                  usuario.email
                )}
              </td>
            </tr>

            <tr>
              <td><strong>Contraseña</strong></td>
              <td>
                {editMode ? (
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="perfil-input"
                  />
                ) : (
                  usuario.password
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <button onClick={toggleEditMode} className="perfil-boton">
          {editMode ? "Guardar cambios" : "Editar perfil"}
        </button>

        <div className="perfil-link">
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    </main>
  );
}