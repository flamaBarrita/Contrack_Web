document.getElementsByTagName("button")[0].addEventListener("click", (e) => {
    e.preventDefault();

    // Hacer una solicitud al servidor para cerrar sesión
    const response =  fetch("https://contrackweb-production.up.railway.app/api/logout", { method: "GET" });

    if (response.ok) {
        // Redirigir al inicio de sesión o página principal
        const data = response.json();
        window.location.assign(data.redirect);
    } else {
        console.error("Error al cerrar sesión");
    }
});
