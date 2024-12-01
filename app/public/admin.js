document.getElementsByTagName("button")[0].addEventListener("click", (e)=>{
    e.preventDefault();
    console.log("pruebaaaa")
    document.cookie = 'jwt=; Path=/; Expires =Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.assign("/");
})
