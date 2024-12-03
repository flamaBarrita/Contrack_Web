import db from '../models/db.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const method = {
    register: async (req, res) => {
        try {
            const { user, password, email } = req.body;

            // Validación de entrada
            if (!user || !password || !email) {
                return res.status(400).json({ status: "Error", message: "Todos los campos son obligatorios." });
            }

            if (user.trim() === '' || password.trim() === '' || email.trim() === '') {
                return res.status(400).json({ status: "Error", message: "Los campos no pueden estar vacíos." });
            }

            // Validar formato del email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ status: "Error", message: "El formato del email no es válido." });
            }

            // Buscar si ya existe el usuario
            const [rows] = await db.execute('SELECT * FROM usuarios WHERE user = ?', [user]);
            if (rows.length > 0) {
                return res.status(400).json({ status: "Error", message: "El usuario ya está registrado." });
            }

            // Encriptar la contraseña
            const salt = await bcrypt.genSalt(5);
            const hashPassword = await bcrypt.hash(password, salt);

            // Insertar el nuevo usuario en la base de datos
            await db.execute('INSERT INTO usuarios (user, email, password) VALUES (?, ?, ?)', [user.trim(), email.trim(), hashPassword]);

            res.status(201).json({ status: "ok", message: "Usuario registrado con éxito.", redirect: "/" });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },

    login: async (req, res) => {
        try {
            const { user, password } = req.body;

            // Validación de entrada
            if (!user || !password) {
                return res.status(400).json({ status: "Error", message: "Todos los campos son obligatorios." });
            }

            if (user.trim() === '' || password.trim() === '') {
                return res.status(400).json({ status: "Error", message: "Los campos no pueden estar vacíos." });
            }

            // Buscar si el usuario existe
            const [rows] = await db.execute('SELECT * FROM usuarios WHERE user = ?', [user.trim()]);
            if (rows.length === 0) {
                return res.status(400).json({ status: "Error", message: "Usuario o contraseña incorrectos." });
            }

            const newuser = rows[0];

            // Verificar contraseña
            const logincorrecto = await bcrypt.compare(password, newuser.password);
            if (!logincorrecto) {
                return res.status(400).json({ status: "Error", message: "Usuario o contraseña incorrectos." });
            }

            // Crear token JWT
            const token = jsonwebtoken.sign(
                { user: newuser.user },
                process.env.JWT_SECRET,
                { expiresIn: `${process.env.JWT_COOKIE_EXPIRIES}d` }
            );

            // Configurar cookie
            const cookieOption = {
                expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRIES) * 24 * 60 * 60 * 1000),
                httpOnly: true, // Asegura que la cookie solo esté accesible a través de HTTP(S).
                path: "/"
            };

            res.cookie("jwt", token, cookieOption);
            res.status(200).json({ status: "ok", message: "Usuario logueado", redirect: "/admin" });
        } catch (error) {
            console.error('Error en el proceso de login:', error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },
    
    logout: async (req, res) => {
        try {
            res.clearCookie("jwt", { path: "/" });
            return res.status(200).json({
                status: "success",
                message: "Sesión cerrada exitosamente",
                redirect: "/login"
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            return res.status(500).json({
                status: "error",
                message: "Error al cerrar sesión. Intente nuevamente."
            });
        }
    }
};
