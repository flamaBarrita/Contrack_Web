import db from '../models/db.js'; 

export const mostrarUsers = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT id, user, email, role FROM usuarios WHERE user <> 'test'");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).send("Error al obtener usuarios");
    }
};

export const modificarRol = async (req,res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user","vista"].includes(role)) {
        return res.status(400).send("Rol no válido");
    }

    try {
        const [result] = await db.execute("UPDATE usuarios SET role = ? WHERE id = ?", [role, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.send("Rol actualizado exitosamente");
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).send("Error al actualizar rol");
    }
};
