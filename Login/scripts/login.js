import {loadBase, cambiarTema} from "../../General/baseUI.js";
import {loginUser, registerUser} from "../../General/user.js"

onLoad();

function onLoad() {
    loadBase(cambiarTemaLogin);
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.querySelector('.username').value;
        const password = document.querySelector('.password').value;
        const email = document.querySelector(".email");

        if(email !== null) 
            registerClick(username, password, email.value);
        else
            clickLogin(username, password);
    });
}

function cambiarTemaLogin(checked) {
    cambiarTema(checked);
}

function clickLogin(user, password) {
    const resp = loginUser(user, password);
    if(resp.success)
        window.location.href = "../../Productos/productos.html";
    else
        console.log(resp.message);
}


function registerClick(user, password, email) {
    const resp = registerUser(user, password, email)
    if(resp.success)
        window.location.href = "../../Productos/productos.html";
    else
        console.log(resp.message);
}