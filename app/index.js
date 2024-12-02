import express from "express";
import cookieParser from "cookie-parser";
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


import { method as authentication } from "./controllers/authentication.controller.js";
import { method as authorization} from "./middlewares/authorization.js";
import { saveContract } from "./controllers/formulario.controller.js";
//import { busquedaContrato } from "./controllers/busqueda.controller.js";
import { mostrarContrato } from "./controllers/mostrar.controller.js";
import { mostrarUsers } from "./controllers/users.controller.js";
import { modificarRol } from "./controllers/users.controller.js";
//Servidor

const app = express();
app.set("port",3306);
app.listen(app.get("port"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log("Servidor corriendo en el puerto", app.get("port"));
  
//configuracion

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
//rutas

app.get("/",(req,resp)=>resp.sendFile(__dirname + "/pages/login.html"));
app.get("/register", authorization.soloPublico, (req,resp)=>resp.sendFile(__dirname + "/pages/register.html"));
app.get("/admin", authorization.soloVista,(req,resp)=>resp.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/register", authentication.register);
app.post("/api/login", authentication.login);
app.get("/nuevodoc",  authorization.soloVista,(req, resp) => {resp.sendFile(__dirname + "/pages/admin/nuevodoc.html");});
app.post("/submit-contract",  authorization.soloVista, saveContract);
app.get("/busqueda",  authorization.soloVista, (req, resp) => {resp.sendFile(__dirname + "/pages/admin/busqueda.html");});
app.get("/permisos",  authorization.soloVista,(req, resp) => {resp.sendFile(__dirname + "/pages/admin/roles.html");});
app.get("/contracts/:contractNumber",  authorization.soloVista,mostrarContrato);
app.get("/api/usuarios", authorization.soloAdmin, mostrarUsers);
app.put("/api/usuarios/:id/role",  authorization.soloAdmin,modificarRol);
