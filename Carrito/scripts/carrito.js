var carrito = [];

export function addCarrito(nombre, precio) {
    const producto = {nombre, precio};
    carrito = getCarrito();
    if(!carrito)
        carrito = [];
    carrito.push(producto);
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function removeCarrito(item) {
    let carritoJSON = getCarrito();

    carritoJSON = carritoJSON.filter(p => p.nombre !== item.nombre);

    setCarrito(carritoJSON);
}



function showCarrito() {
    if(carrito.length == 0)
        console.log("Carrito vacio");
    carrito.forEach(producto => {
        console.log(producto.nombre + " - " + producto.precio);
    });
    console.log(`Total: ${totalCarrito()} €`);
}

function totalCarrito() {
    let total = 0;
    carrito.forEach(producto => {
        total += parseInt(producto.precio.replace("€", ""));
    });

    return total;
}

export function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito"));
}

export function setCarrito(carrito) {
    return localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function clearCarrito() {
    localStorage.removeItem("carrito");
}
