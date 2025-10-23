import React, { useState, useEffect } from "react";
import "../css/carrusel.css";

const Carrusel = () => {
  const imagenes = [
    "/img/vivero1.jpg",
    "/img/vivero2.jpg",
    "/img/vivero3.jpg",
    "/img/vivero4.jpg",
    "/img/vivero5.jpg",
  ];

  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div id="contenedor-item-carrusel">
      {imagenes.map((src, i) => (
        <div key={i} className={`item-carrusel ${i === indiceActual ? "active" : ""}`}>
          <div className="tarjeta-carrusel">
            <img src={src} alt={`Imagen ${i + 1}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrusel;
