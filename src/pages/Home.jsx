import React from "react";
import Carrusel from "../componentes/Carrusel";
import "../css/Home.css";
import '../css/footer.css';

export default function Home() {
  return (
    <>

      {/* HERO */}
      <section className="hero">
        <h1>Demeter APP</h1>
        <p>La agricultura inteligente comienza aquí</p>
        <button>Ver la app</button>
      </section>

      <Carrusel />

      {/* BENEFICIOS */}
      <section className="beneficios">
        <div>
          <h3>Monitoreo Inteligente</h3>
          <p>Obtén datos en tiempo real de tus cultivos.</p>
        </div>
        <div>
          <h3>Alertas Automáticas</h3>
          <p>Recibe notificaciones cuando algo no va bien.</p>
        </div>
        <div>
          <h3>Gestión Centralizada</h3>
          <p>Administra sensores desde una sola plataforma.</p>
        </div>
      </section>

      {/* MINI APP */}
      <section className="mini-app">
        <h2>Una app diseñada para agricultores modernos</h2>
        <p>
          Controla, analiza y optimiza tu producción desde cualquier lugar.
        </p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Empieza hoy</h2>
        <button>Contáctanos</button>
      </section>

      <footer>
        <div class="footer-content">
            <div class="left">
                <h3>Mis Datos</h3>
                <p>Email: Demeter@gmail.com</p>
                <p>Teléfono: +569 45677986</p>

                <a href="Quienes_somos.html"> Quienes Somos</a>
            </div>
            <div class="right">
                <h3>Contáctanos</h3>
                <form action="/submit_form" method="POST" />
                <input type="text" name="nombre" placeholder="Nombre" required />
                <input type="email" name="correo" placeholder="Correo" required />
                <input type="tel" name="telefono" placeholder="Número de teléfono" required />
                <button type="submit">Enviar</button>

            </div>
        </div>
      </footer>

    </>
  );

}