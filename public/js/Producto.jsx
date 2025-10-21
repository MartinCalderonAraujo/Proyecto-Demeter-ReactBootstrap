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
]

function renderCatalogo() {
    const contenedores = $all('.catalogo');
    if (!contenedores.length) return;
    contenedores.forEach(container => {
        container.innerHTML = '';
        PRODUCTOS.forEach(p => {
            const div = document.createElement('div');
            div.className = 'contenedor-item';
            div.innerHTML = `
                <div className="contenedor-item">
                    <div className="producto">
      
                        <a href="#">
                        <img src=${p.imagen} alt=${p.nombre} />
                        </a>
                    <div className="info-producto">
                        <h2 className="prod-nombre">${p.nombre}</h2>
                        <p className="prod-precio">${formatCLP(p.precio)}</p>
                        <button className="btn-agregar" onClick=${(p.id)}>Agregar al carrito</button>
                        
                        
                    </div>
                </div></div>`;
            container.appendChild(div);
        });
    });
}

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
function guardarLS(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function leerLS(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function formatCLP(n) { return n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }); }

