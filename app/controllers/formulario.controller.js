// formulario.controller.js
import db from '../models/db.js'; // Asegúrate de que la conexión esté bien configurada

export const saveContract = async (req, res) => {
    const {
        contrato,
        zona,
        estrategia,
        firma,
        obra,
        contratista,
        residente,
        importe,
        fecha_inicio,
        fecha_termino,
        plazo,
        estatus
    } = req.body;

    try {
        const query = `
            INSERT INTO contratos (contrato, zona, estrategia, firma, obra, contratista, residente, importe, fecha_inicio, fecha_termino, plazo, estatus)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.execute(query, [
            contrato, zona, estrategia, firma, obra, contratista, residente, 
            importe, fecha_inicio, fecha_termino, plazo, estatus
        ]);

        res.status(200).json({
            message: 'Contrato guardado exitosamente',
            redirectTo: '/admin'  // Redirige a la página del contrato recién creado
        });
    } catch (error) {
        console.error('Error al guardar el contrato:', error);
        res.status(500).json({
            message: 'Hubo un error al guardar el contrato',
            error: error.message

        })

    }
};
