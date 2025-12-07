import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/perfil.css";

export default function Perfil() {
  //------------ USE STATES Y USE EFFECTS --------------
  const navigate = useNavigate();
  
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

    // --------Funciones de validación -------
  function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|duocuc|demeter)\.(com|cl)$/;
    return regex.test(email);
  }

  function validarPassword(pw) {
    return pw.length >= 6;
  }

  // ---------------------Cargar usuario desde backend---------------
   useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8011/api/auth/perfil", {
      method: "GET", headers: {"Authorization": `Bearer ${token}`}
    })
      .then(res => { if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(data => {
        setUsuario(data);
        setNombre(data.nombre || "");
        setEmail(data.email || "");
        setPassword(data.password || "");
      })
      .catch(() => navigate("/login")) // si el token es invalido, redirige login
      .finally(() => setLoading(false)); //actualizar estado de carga
  }, [navigate]);



// Función para alternar entre modo edición y vista
const toggleEditMode = async () => {
  if (editMode) {
    // ------ Validaciones ------
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

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No estás autenticado");
        navigate("/login");
        return;
      }

      // Llamada al backend para actualizar usuario
      const body = { nombre, email };
      if (password.trim() !== "") {
        body.password = password;
      }

      const response = await fetch("http://localhost:8011/api/usuario/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar el usuario");
      }

      const usuarioActualizado = await response.json();

      // Actualizar estado local
      setUsuario(usuarioActualizado);

    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      setError("Ocurrió un error al guardar los cambios");
    }
  }

  // Cambiar modo edición
  setEditMode(!editMode);
};


 if (loading) return <p>Cargando datos del usuario...</p>;
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
                  "******"
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