document.getElementsByTagName("button")[0].addEventListener("click", async (e) => {
    e.preventDefault();

    // Hacer una solicitud al servidor para cerrar sesión
    const response = await fetch("https://contrackweb-production.up.railway.app/api/logout", { method: "GET" });

    if (response.ok) {
        // Redirigir al inicio de sesión o página principal
        const data = await response.json();
        window.location.assign(data.redirect);
    } else {
        console.error("Error al cerrar sesión");
    }
});
