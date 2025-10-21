import "../css/catalogo.css";
import { useState } from "react";

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
                ))}
            </section>
        </main>
    );
}

}
