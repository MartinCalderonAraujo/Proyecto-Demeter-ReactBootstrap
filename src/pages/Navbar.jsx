import '../css/barra_navegacion.css';
function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/catalogo">Catalogo</a></li>
        <li><a href="/Nosotros">Nosotros</a></li>
        <li><a href="/Blog">Blog</a></li>
        <li><a href="/Productos">Productos</a></li>
        <li><a href="/Formulario">Formulario</a></li>
      </ul>
    </nav>
  );
}
export default Navbar;