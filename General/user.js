const users = [{username: "user", password: "user", email: "user@gmail.com"}, {username: "admin", password: "admin", email: "admin@arboledaastral.com"}];
localStorage.setItem("usersDB", JSON.stringify(users));

export function registerUser(username, password, email) {
    if (users.find(user => user.username === username || user.email === email)) {
        return { success: false, message: 'El usuario ya existe' };
    }
    const user = {username, password, email};
    users.push(user);
    localStorage.setItem("usersDB", JSON.stringify(users));
    setLoggedUser(user, true, false);
    return { success: true, message: 'Usuario registrado exitosamente' };
}

export function loginUser(username, password) {
    const usersDB = getUserDB();
    const user = usersDB.find(user => (user.username === username || user.email === username) && user.password === password);
    if (user) {
        if (user.username == "admin" && user.password == "admin" || user.email == "admin@arboledaastral.com")
            setLoggedUser(user, true, true);
        else setLoggedUser(user, true, false);
        return {success: true, message: 'Login exitoso'};
    }
    return { success: false, message: 'Usuario o contraseña incorrectos' };
}

export function getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
}

function getUserDB() {
    return JSON.parse(localStorage.getItem("usersDB"));
}

export function setLoggedUser(user, isLogged, isAdmin) {
    console.log('Se ha establecido el usuario:', user, isLogged, isAdmin);
    const memoria = getUserInfo();
    if (memoria === null) {
        const userInfo = { user: user, isLogged: isLogged, isAdmin: isAdmin};
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    else {
        memoria.username = user;
        memoria.isLogged = isLogged;
        memoria.isAdmin = isAdmin;
        localStorage.setItem("userInfo", JSON.stringify(memoria));
    }
}

export function logoutUser() {
    localStorage.removeItem("userInfo");
}
