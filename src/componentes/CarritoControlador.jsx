import { createContext, useState, useEffect } from "react";

// Contexto
export const CarritoContext = createContext();

// Provider
export const CarritoControlador = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(guardado);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto) => {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (id) => setCarrito(carrito.filter(p => p.id !== id));
  const limpiarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
