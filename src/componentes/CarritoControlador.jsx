import { createContext, useState, useEffect, useMemo } from "react";

// Contexto
export const CarritoContext = createContext(null);

// Provider
export const CarritoControlador = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = localStorage.getItem("carrito");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch {
      // silenciar errores de storage
    }
  }, [carrito]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarProducto = (id) => setCarrito((prev) => prev.filter((p) => p.id !== id));
  const limpiarCarrito = () => setCarrito([]);

  const modificarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((p) => (p.id === id ? { ...p, cantidad } : p))
        .filter((p) => p.cantidad > 0)
    );
  };

  const value = useMemo(
    () => ({ carrito, agregarProducto, eliminarProducto, limpiarCarrito, modificarCantidad }),
    [carrito]
  );

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
