import '../css/quienes_somos.css';
import '../css/barraNavegacion.css';
import '../css/footer.css';
import Mapa from "../componentes/Mapa";
function Nosotros() {
    return (
        <>
            <div id="navbar"></div>

            <section>
                <div className="quienesSomos">
                    <h1>Quienes Somos</h1>

                    <div className="parrafos-qnsSomos">
                        <p>
                            Somos una empresa dedicada a la venta de sensores y dispositivos para la agricultura de precisión.
                        </p>
                        <p>
                            Nuestro objetivo es proporcionar soluciones tecnológicas que ayuden a los agricultores a optimizar sus
                            cultivos y mejorar su productividad.
                        </p>
                        <p>
                            Nuestra misión es ofrecer productos de alta calidad a precios competitivos, junto con un excelente
                            servicio al cliente.
                        </p>
                        <p>
                            Nos esforzamos por mantenernos a la vanguardia de la tecnología agrícola y
                            adaptarnos a las necesidades cambiantes del mercado.
                        </p>
                        <p>
                            Contamos con un equipo de profesionales comprometidos en brindar asesoramiento y soporte técnico a nuestros clientes.
                        </p>
                        <p>
                            Gracias por confiar en nosotros para sus necesidades agrícolas. Estamos aquí para ayudarle a alcanzar el
                            éxito en su negocio.
                        </p>
                    </div>
                </div>
            </section>


            <section id="app">
                <div>
                    <img src="img/App notificacion.png" alt="" />
                    <img src="img/App inicio sesion.png" alt="" />
                    <img src="img/App pagina principal.png" alt="" />
                    <img src="img/App plantas.png" alt="" />
                </div>
            </section>
            <div id="descripcion-app">
                <p>
                    La aplicacion ofrece una interfaz intuitiva y fácil de usar, permitiendo a los agricultores gestionar sus cultivos de manera eficiente.
                </p>
                <p>
                    Con la aplicación, los usuarios pueden monitorear en tiempo real las condiciones de sus cultivos, recibir notificaciones sobre eventos importantes y acceder a datos históricos para tomar decisiones informadas.
                </p>
                <p>
                    Además, la aplicación permite la integración con otros dispositivos y sensores, facilitando una gestión centralizada de la información agrícola.
                </p>
                <p>
                    La aplicación está diseñada para ser accesible desde cualquier lugar y en cualquier momento, brindando a los agricultores la flexibilidad que necesitan para administrar sus operaciones agrícolas de manera efectiva.
                </p>
            </div>


            <div>
                <p id="ubicacion-empresa">Ubicación de nuestra empresa</p>

                <section id="mapa">
                    <Mapa />
                </section>
            </div>


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

export default Nosotros;