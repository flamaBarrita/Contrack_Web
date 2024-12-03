document.getElementsByTagName("button")[0].addEventListener("click", (e) => {
    e.preventDefault();
    // Elimina la cookie `jwt` configurando sus propiedades correctamente
    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly;";
    
    // Redirige al usuario
    window.location.assign("/");
});
