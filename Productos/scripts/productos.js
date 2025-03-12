import { loadBase, cambiarTema } from "../../General/baseUI.js";
import { addCarrito } from "../../Carrito/scripts/carrito.js";

const baseImg = 'https://imgs.search.brave.com/9_XgGs7O2GqUwkkisybbxc5j4hyuzkYLqTUPzuQwxOU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZHVwbGljaGVja2Vy/LmNvbS9uZXdhc3Nl/dHMxL3Jpcy9pbWcv/cHJvLXJldmVyc2Ut/aW1hZ2Uuc3Zn';
const columnas = 4, filas = 4, filtros = 2;
var numCarta = 0;

onLoad();

function onLoad() {
  cargarDatos();
  cargarFiltros();
  loadBase(cambiarTemaProductos);
}

function cargarDatos() {
  let documento = document.getElementById("Productos");
  for (let i = 0; i < filas; i++) {
    documento.innerHTML += crearFila(i);
  }

  var botones = document.querySelectorAll(".button");

  botones.forEach((boton) => {
    boton.addEventListener("click", function () {
      const nombre = boton.parentElement.children[0].innerText;
      const precio = boton.parentElement.children[1].innerText;
      alert("añadido al carrito");
      addCarrito(nombre, precio);
    });
  });
}

function cargarFiltros() {
  let documento = document.getElementById("Filtros");

  for (let i = 0; i < filtros; i++) {
    documento.innerHTML += crearFiltro(i + 1);
  }

  document.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", function () {
      if (this.open) {
        this.style.height = this.scrollHeight + "px";
      } else {
        this.style.height = "40px";
      }
    });
  });
}


function crearFila(num) {
  return `<div class="row" id="row${num}">
            ${cargarCartas()}
          </div>`;
}

function cargarCartas() {
  let cartas = "";
  for (let i = 0; i < columnas; i++) {
    cartas += crearCarta(numCarta++);
  }
  return cartas;
}

function crearCarta() {
  return `
    <div class="col-md-3">
        <div class="card" id="carta">
            <img class="card-img-top" alt="carta-imagen" id="carta-imagen" src="${baseImg}" loading="lazy">
            <div class="card-body" id="carta-cuerpo">
                <h5 class="card-title">Nombre ${numCarta}</h5>
                <p class="card-text">${numCarta.toFixed(2)}€</p>
                ${compBoton()}
            </div>
        </div>
    </div>
    `;
}


function crearFiltro(num) {
  return `
    <details class="border-top border-bottom p-3">
        <summary class="d-flex justify-content-between">
            <span>Filtro ${num}</span>
        </summary>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="filtro${num}" id="filtro${num}.1">
            <label class="form-check-label" for="filtro${num}.1">Filtro 1</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="filtro${num}" id="filtro${num}.2">
            <label class="form-check-label" for="filtro${num}.2">Filtro 2</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="filtro${num}" id="filtro${num}.3">
            <label class="form-check-label" for="filtro${num}.3">Filtro 3</label>
        </div>
    </details>
    `;
}



function compBoton() {
  return `
  <div class="button">
    <div class="button-wrapper">
      <div class="text">Comprar Ahora</div>
        <span class="icon">
          <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
          </svg>
        </span>
      </div>
    </div>`;
}

function cambiarTemaProductos(checked) {
  let documentos = document.getElementsByClassName("card");
  let botones = document.getElementsByClassName("button");

  //background-color: rgb(79, 59, 59); border-color: rgb(255, 255, 255)
  for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
    documentos[i].style.backgroundColor = checked ? "rgb(237, 237, 237)" : "rgb(86, 63, 63)";
    documentos[i].style.color = checked ? "black" : "white";
    botones[i].style.backgroundColor = checked ? "rgb(170, 169, 169)" : "rgb(56, 50, 50)";
    botones[i].style.borderColor = checked ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)";
  }

  cambiarTema(checked);
}

