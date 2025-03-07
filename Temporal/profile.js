import { loadBase, cambiarTema } from "../../General/baseUI.js";
import { getUserInfo } from "../General/user.js";


onload();

function onload() {
    loadBase(cambiarTemaPerfil);
    loadData();
    cambiarTemaPerfil(false);
}

function cambiarTemaPerfil(checked) {
    let carta = document.getElementById("carta");
    carta.style.backgroundColor = checked ? "rgb(237, 237, 237)" : "rgb(86, 63, 63)";

    let titulo = document.getElementById("titulo");
    titulo.style.backgroundColor = checked ? "rgb(237, 237, 237)" : "rgb(86, 63, 63)";
    titulo.style.color = checked ? "black" : "white";

    let cuerpo = document.getElementById("cuerpo");
    cuerpo.style.backgroundColor = checked ? "rgb(237, 237, 237)" : "rgb(86, 63, 63)";
    cuerpo.style.color = checked ? "black" : "white";

    cambiarTema(checked);
}

function loadData() {
    const user = getUserInfo();
    console.log(user.user);
    


    document.getElementById("nombre").textContent = user.user.username;
    document.getElementById("correo").textContent = user.user.email;
    document.getElementById("contrasena").textContent = "*".repeat(user.user.password.length);
}