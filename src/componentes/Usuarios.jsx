// src/data/usuarios.js
const USUARIOS = [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@demeter.com",
    password: "admin123",
    rol: "admin"
  },
  {
    id: 2,
    nombre: "Usuario",
    email: "usuario@demeter.com",
    password: "usuario123",
    rol: "usuario"
  }
];

if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify(USUARIOS));
}

export default USUARIOS;
