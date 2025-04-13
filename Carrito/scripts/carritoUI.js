import { loadBase, cambiarTema } from "../../General/baseUI.js";
import { getCarrito, removeCarrito, setCarrito, clearCarrito } from "./carrito.js";

onload();

function onload() {
    loadBase(cambiarTemaCarrito);
    loadCarrito();
    cambiarTemaCarrito(false);
}

function loadCarrito() {
    var carrito = getCarrito();
    
    if(!carrito) {
        document.getElementById("listaProductos").innerHTML = "";
    }
    else {
        document.getElementById("listaProductos").innerHTML = loadLinea(carrito);

        const botones = document.querySelectorAll(".delete-button");
        botones.forEach(boton => {
            boton.addEventListener("click", function () {
                eliminarProducto(boton);
                loadCarrito();
            });
        });
    }
    cargarTotal(carrito);

    document.getElementById("botonComprar").innerHTML = crearBotonComprar();

    document.getElementById("comprar").addEventListener("click", function() {
        const carrito = getCarrito();
        const user = document.getElementById("clienteMenu");
        
        if(!carrito.length)
            alert("Carrito Vacio");
        if (carrito.length > 0 && !user)
            alert("Para enviar un pedido debes estar registrado o logeado");
        if(carrito.length > 0 && user) {
            alert("Pedido enviado");
            vaciarCarrito();
            loadCarrito();
        }
    });
}

function cargarTotal(carrito) {
    let total = 0;
    if(carrito)
        carrito.forEach(producto => { total += parseFloat(producto.precio); });
    document.getElementById("totalPrecio").innerText = total.toFixed(2) + "€";
}



function loadLinea(carrito) {
    const productosAgrupados = {};
    carrito.forEach(producto => {
        if (productosAgrupados[producto.nombre, producto.precio]) {
            productosAgrupados[producto.nombre, producto.precio].cantidad += 1;
        } else {
            productosAgrupados[producto.nombre, producto.precio] = {
                nombre: producto.nombre,
                cantidad: 1,
                precio: producto.precio
            };
        }
    });

    return Object.values(productosAgrupados)
        .map(producto =>
            `<tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        ${crearBoton()}
                    </div>
                </td>
            </tr>`
        )
        .join("");
}

function eliminarProducto(boton) {
    let fila = boton.closest("tr");

    let datosProducto = {
        nombre: fila.cells[0].innerText,
        precio: parseFloat(fila.cells[2].innerText)
    }

    removeCarrito(datosProducto);
}

function vaciarCarrito() {
    clearCarrito();
}


function crearBoton() {
    return ` 
        <button class="delete-button">
            <svg class="delete-svgIcon" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
        </button>
    `;
}


function crearBotonComprar() {
    return `
        <button class="pay-btn" id="comprar">
        <span class="btn-text">Pay Now</span>
        <div class="icon-container">
            <svg viewBox="0 0 24 24" class="icon card-icon">
            <path
                d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                fill="currentColor"
            ></path>
            </svg>
            <svg viewBox="0 0 24 24" class="icon payment-icon">
            <path
                d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                fill="currentColor"
            ></path>
            </svg>
            <svg viewBox="0 0 24 24" class="icon dollar-icon">
            <path
                d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                fill="currentColor"
            ></path>
            </svg>

            <svg viewBox="0 0 24 24" class="icon wallet-icon default-icon">
            <path
                d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                fill="currentColor"
            ></path>
            </svg>

            <svg viewBox="0 0 24 24" class="icon check-icon">
            <path
                d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                fill="currentColor"
            ></path>
            </svg>
        </div>
        </button>
    `;
}

function cambiarTemaCarrito(checked) {
    cambiarTema(checked);
}