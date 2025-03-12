import { loadBase, cambiarTema } from "../General/baseUI.js";

onload();

function onload() {
    loadBase(cambiarTemaAdmin);
    cambiarTemaAdmin(false);
    loadData();
}

function cambiarTemaAdmin(checked) {
    let carta = document.getElementById("carta");
    carta.style.backgroundColor = checked ? "rgb(237, 237, 237)" : "rgb(86, 63, 63)";

    let titulo = document.getElementById("titulo");
    titulo.style.backgroundColor = checked ? "rgb(237, 237, 237)" : "rgb(86, 63, 63)";
    titulo.style.color = checked ? "black" : "white";

    let cuerpo = document.getElementById("cuerpo");
    cuerpo.style.backgroundColor = checked ? "rgb(237, 237, 237)" : "rgb(86, 63, 63)";
    cuerpo.style.color = checked ? "black" : "white";

    /*
    let redes = document.getElementsByName("botonRedes");
    redes.forEach((red) => {
        red.style.backgroundColor = checked ? "rgb(170, 169, 169)" : "rgb(56, 50, 50)"rgb(237, 237, 237) rgb(86, 63, 63);
    });
    */

    cambiarTema(checked);
}

function loadData() {
    //const data = getAdminData();

    document.getElementById("clientes").textContent = 0;
    document.getElementById("ventasMes").textContent = 0;
    document.getElementById("ingresosMes").textContent = "0.00€";
    document.getElementById("ventasTotales").textContent = 0;
    document.getElementById("ingresosTotales").textContent = "0.00€";
}