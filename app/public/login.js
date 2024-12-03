const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user =  e.target.querySelector("#username").value;  // Valor del username
    const password = e.target.querySelector("#password").value;  // Valor del password

    const res = await fetch("https://contrackweb-production.up.railway.app/login",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user,password
        })
    });
    if(!res.ok) return mensajeError.classList.toggle("escondido",false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})