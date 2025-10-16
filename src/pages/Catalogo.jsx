<<<<<<< HEAD
import "../css/catalogo.css";
import { useState } from "react";
=======
import '../css/catalogo.css';
function Catalogo() {
    return (
        <div>
            {/* Barra de navegacion */}
            <div id="navbar"></div>
            {/* <!-- Contenedor de los items de la tienda --> */}
            <div class="contenedor-item">
                {/* 1 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_humedad.html"><img src="img/sensor de humedad.jpg" alt="sensor_humedad" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor de humedad</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(1)">Añadir al carrito</button>
                    </div>
                </div>
                {/* <!-- 2 --> */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_luz.html"><img src="img/sensor de luz.jpg" alt="sensor_luz" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor de luz</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(2)">Añadir al carrito</button>
                    </div>
                </div>
                {/* <!-- 3 --> */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_voltaje.html"><img src="img/sensor de voltaje.jpg" alt="sensor_voltaje" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor de voltaje</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(3)">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div class="contenedor-item">
                {/* 4 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_ph.html"><img src="img/sensor de ph.jpg" alt="sensor_ph" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor de ph</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(4)">Añadir al carrito</button>
                    </div>
                </div>
                {/* 5 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_temperatura.html"><img src="img/sensor de temperatura.jpg" alt="sensor_temperatura" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor de temperatura</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(5)">Añadir al carrito</button>
                    </div>
                </div>
                {/* 6 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_co2.html"><img src="img/sensor de co2.jpg" alt="sensor_co2" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor de co2</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(6)">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div class="contenedor-item">
                {/* 7 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_NPK.html"><img src="img/sensor NPK.png" alt="sensor_NPK" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor NPK</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(7)">Añadir al carrito</button>
                    </div>
                </div>
                {/* 8 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="sensor_portatil.html"><img src="img/sensor portatil.png" alt="sensor_portatil" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>Sensor de portatil</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(8)">Añadir al carrito</button>
                    </div>
                </div>
                {/* 9 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="camara_escaneo.html"><img src="img/camara escaneo.png" alt="camara_escaneo" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>camara de escaneo</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(9)">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div class="contenedor-item">
                {/* 10 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="dron_escaneo.html"><img src="img/dron escaneo.png" alt="dron_escaneo" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>drone de escaneo</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(10)">Añadir al carrito</button>
                    </div>
                </div>
                {/* 11 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="robot_riego.html"><img src="img/robot riego.png" alt="robot_riego" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>robot de riego</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(11)">Añadir al carrito</button>
                    </div>
                </div>
                {/* 12 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="dron_fumigador.html"><img src="img/dron fumigador.png" alt="dron_fumigador" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>dron fumigador</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(12)">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div class="contenedor-item">
                {/* 13 */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="macetero_v1.html"><img src="img/macetero v1.png" alt="macetero_v1" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>macetero v1</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(13)">Añadir al carrito</button>
                    </div>
                </div>
                {/* <!-- 14 --> */}
                <div class="producto" id="productos">
                    <figure>
                        <a href="macetero_v2.html"><img src="img/macetero v2.png" alt="macetero_v2" /></a>
                    </figure>
                    <div class="info-producto">
                        <h2>macetero v2</h2>
                        <p class="precio">$30.000</p>
                        <button onclick="agregarProducto(14)">Añadir al carrito</button>
                    </div>
                </div>
>>>>>>> a62f7f0 (Se corrigieron errores en el catalogo)

const PRODUCTOS = [
    { id: 1, nombre: 'Humedad', precio: 30000, imagen: '/img/sensorHumedad.jpg' },
    { id: 2, nombre: 'Luz', precio: 30000, imagen: '/img/sensorLuz.jpg' },
    { id: 3, nombre: 'Voltaje', precio: 30000, imagen: '/img/sensorVoltaje.jpg' },
    { id: 4, nombre: 'Ph', precio: 30000, imagen: '/img/sensorPh.jpg' },
    { id: 5, nombre: 'Temperatura', precio: 30000, imagen: '/img/sensorTemperatura.jpg' },
    { id: 6, nombre: 'Co2', precio: 30000, imagen: '/img/sensorCo2.jpg' },
    { id: 7, nombre: 'NPK', precio: 30000, imagen: '/img/sensorNPK.png' },
    { id: 8, nombre: 'Portatil', precio: 30000, imagen: '/img/sensorPortatil.png' },
    { id: 9, nombre: 'Camara de escaneo', precio: 30000, imagen: '/img/camaraEscaneo.png' },
    { id: 10, nombre: 'Dron escaneo', precio: 30000, imagen: '/img/dronEscaneo.png' },
    { id: 11, nombre: 'Robot riego', precio: 30000, imagen: '/img/robotRiego.png' },
    { id: 12, nombre: 'Dron fumigador', precio: 30000, imagen: '/img/dronFumigador.png' },
    { id: 13, nombre: 'Macetero v1', precio: 30000, imagen: '/img/maceteroV1.png' },
    { id: 14, nombre: 'Macetero v2', precio: 30000, imagen: '/img/maceteroV2.png' },
    { id: 15, nombre: 'Macetero v3', precio: 30000, imagen: '/img/maceteroV3.png' }
];

function formatCLP(n) {
    return n.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    });
}

export default function Catalogo() {
    const [carrito, setCarrito] = useState([]);

    const agregarProducto = (id) => {
        setCarrito((prev) => [...prev, id]);
        console.log("Producto agregado:", id);
    };

    return (
        <main>

            <section className="contenedor-item">
                {PRODUCTOS.map((p) => (
                    <div key={p.id} className="producto">
                        <figure>
                            <a href="#">
                                <img src={p.imagen} alt={p.nombre} loading="lazy" />
                            </a>
                        </figure>
                        <div className="info-producto">
                            <h2 className="prod-nombre">{`Sensor de ${p.nombre.toLowerCase()}`}</h2>
                            <p className="prod-precio">{formatCLP(p.precio)}</p>
                            <button onClick={() => agregarProducto(p.id)}>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}
