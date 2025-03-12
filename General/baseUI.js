const productosUI = "../Productos/productos.html";
const loginUI = "../Login/logIn.html";
const signinUI = "../Login/signIn.html";
const carritoUI = "../Carrito/carrito.html";
const inicioUI = "../Inicio/inicio.html";
const adminUI = "../Temporal/admin.html";
const profileUI = "../Temporal/profile.html";
var fun;

function getHeader() {
  return `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="Cabecera">
        <div class="container-fluid">
            <a class="navbar-brand" href="${inicioUI}" style="margin-left: 10px;">
                <img src="${"../General/img/logo2.png"}" id="logo">
                Tienda
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">

            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-left" id="cabecera-izq">
                    <li class="nav-item"><a class="nav-link" href="${productosUI}">Productos</a></li>
                </ul>
                <ul class="navbar-nav ms-left" id="cabecera-izq">
                    <li class="nav-item"><a class="nav-link" href="${carritoUI}">Carrito</a></li>
                </ul>
                <ul class="navbar-nav ms-auto" id="cabecera-der">
                    <li class="nav-item" id="theme-toggle-button">
                        <div class="toggle-switch">
                            <label class="switch-label">
                            <input type="checkbox" class="checkbox" id="switchTema">
                            <span class="slider"></span>
                            </label>
                        </div>
                    </li>
                    ${cabeceraUser()}
                </ul>
            </div>
        </div>
    </nav>`;
}


function getFooter() {
    return `<footer class="bg-dark text-light text-center py-3">
        <p>&copy; ${Date().split(" ")[3]} La Arboleda Astral</p>
        </footer>`;
}


var tema = isDarkTheme();

export function loadBase(funcionTema) {
    const head = document.head.getElementsByTagName("title")[0];

    head.insertAdjacentHTML("afterend", `<link rel="stylesheet" href="../General/theme-toggle-button.css">`);
    head.insertAdjacentHTML("afterend", `<link rel="stylesheet" href="../General/baseStyle.css">`);
    head.insertAdjacentHTML("afterend", `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">`);
    
    document.head.insertAdjacentHTML("beforeend", `<link rel="icon" href="../General/img/logo2.png">`);
    
    document.body.insertAdjacentHTML("afterbegin", getHeader());
    document.body.insertAdjacentHTML("afterend", getFooter());

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(script);


    const switchTema = document.getElementById("switchTema");
    if (switchTema && typeof funcionTema === "function") {
        switchTema.addEventListener("change", function () {
            tema = !tema;
            localStorage.setItem("tema", tema);
            funcionTema(this.checked);
        });
        
    }
    switchTema.checked = tema;
    funcionTema(tema);
    fun = funcionTema;

    const signOut = document.getElementById("signOut");
    if(signOut) {
        signOut.addEventListener("click", function () {
            funcionsignOut(fun);
        });
    }
}


import { getUserInfo, logoutUser } from "./user.js";
function cabeceraUser() {
    return getUserInfo() ? userTab() : loginTab();
}



export function cambiarTema(checked) {
    document.body.style.backgroundColor = checked ? "white" : "rgb(56, 50, 50)";
    document.body.style.color = checked ? "black" : "white";
}

function userTab() {
    const userInfo = getUserInfo();

    return `<li class="nav-item dropdown" id="clienteMenu">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${userInfo.user.username}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="${profileUI}">Mi Perfil</a></li>
            ${isAdmin()}
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="signOut">Cerrar Sesion</a></li>
          </ul>
        </li>`;
}

function loginTab() {
    return `<li class="nav-item"><a class="nav-link" href="${signinUI}" style="margin-right: 20px; margin-left: 50px">Sign in</a></li>
                <li class="nav-item"><a class="nav-link" href="${loginUI}" style="margin-right: 20px;">Log in</a></li>`;
}

function funcionsignOut(fun) {
    logoutUser();
    document.querySelector("nav").outerHTML = "";
    document.querySelector("footer").outerHTML = "";

    loadBase(fun);
}

function isDarkTheme() {
    return localStorage.getItem("tema") === "true";
}

function isAdmin() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo && userInfo.isAdmin? `<li><a class="dropdown-item" href="${adminUI}">Panel Administrativo</a></li>` : "";
}
