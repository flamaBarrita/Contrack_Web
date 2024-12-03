import jsonwebtoken from 'jsonwebtoken';
import dotenv from  "dotenv";
import db from '../models/db.js';
dotenv.config();

async function soloAdmin(req,res,next){
    const [loggeado, tipo] = await revisarcookie(req);
    console.log(tipo);
    if(loggeado && tipo === 1) return next();
    return res.redirect("/");
}

async function soloVista(req,res,next) {
    const [loggeado, tipo] = await revisarcookie(req);
    if(loggeado && tipo != 3 && tipo != -1 ) return next();
    return res.redirect("/");
}

async function soloPublico(req,res,next){
    const [loggeado, tipo] = await revisarcookie(req);
    console.log(loggeado)
    if(!loggeado) return next();
    return res.redirect("/admin");
}

async function revisarcookie(req){

    try{ 
    const cookieJWT = req.headers.cookie
    ?.split("; ")
    .find(cookie => cookie.startsWith("jwt="))
    ?.slice(4);
    
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        console.log("Token decodificado:", decodificada);

        const [rows] = await db.execute('SELECT * FROM usuarios WHERE user = ?', [decodificada.user]);  
        const usuario = rows[0];
        if (rows.length > 0 && usuario.role === 'admin') {
            return [true, 1];
        } else if(rows.length > 0 && usuario.role === 'vista' ) {
            return [true, 2];
        }else if(rows.length > 0 && usuario.role === 'user' ) {
            return [true, 3];
        }else{
            return [false,-1];
        }
    }
    catch{
        return [false,-1];
    }
}

export const method ={
    soloPublico,
    soloAdmin, 
    soloVista
}