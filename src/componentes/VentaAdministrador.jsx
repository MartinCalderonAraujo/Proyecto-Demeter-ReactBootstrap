import "../css/VentaAdministrador.css";

export default function VentaAdministrador({ venta }) {
  return (
    <div className="venta-admin-car">
      <p><strong>Cliente:</strong> {venta.cliente}</p>
      <p><strong>Producto:</strong> {venta.producto}</p>
      <p><strong>Cantidad:</strong> {venta.cantidad}</p>
      <p><strong>Total:</strong> ${venta.total}</p>
    </div>
  );
}
