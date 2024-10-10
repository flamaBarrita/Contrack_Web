import express from "express";

import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Servidor

const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto", app.get("port"));

//rutas

app.get("/", (req,resp)=>resp.sendFile(__dirname + "/pages/login.html"));