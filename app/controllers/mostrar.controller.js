import db from '../models/db.js'; 

export const mostrarContrato = async (req, res) => {
    const contractNumber = req.params.contractNumber; // Obtenemos el número de contrato desde la URL

    try {
        const [rows] = await db.execute('SELECT * FROM contratos WHERE contrato = ?', [contractNumber]);

        if (rows.length > 0) {
            // Asegúrate de que estás pasando el primer resultado (rows[0])
            res.render('contratos', { contrato: rows[0] });
        } else {
            res.status(404).send('Contrato no encontrado');
        }
    } catch (error) {
        console.error('Error fetching contract:', error);
        res.status(500).send('Error en el servidor');
    }
};