const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar el envío del formulario
    
    const data = {
        user: e.target.querySelector("#username").value,  // Valor del username
        email: e.target.querySelector("#email").value,    // Valor del email
        password: e.target.querySelector("#password").value  // Valor del password
    };
        console.log(data);
    const res = await fetch("http://localhost:4000/api/register",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    });

    if(!res.ok) return mensajeError.classList.toggle("escondido",false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})
