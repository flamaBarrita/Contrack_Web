//importar la instancia de la bd
import db from '../models/db.js'; 

export const busquedaContrato = async (req, res) => {
    //contractNumber contiene el numero de contrato a buscar
    const contractNumber = req.params.contractNumber;

    try {
        //busca una coincidencia en la bd que se relacione con el numero de contrato
        const [rows] = await db.execute(
            'SELECT * FROM contratos WHERE contrato = ?', [contractNumber]
        );

        if (rows.length > 0) {
            res.render('contratos', rows[0]);  // Renderiza la plantilla 'contrato.ejs' con los datos del contrato
        } else {
            res.status(404).send('Contrato no encontrado');
        }
    } catch (error) {
        console.error('Error al buscar el contrato:', error);
        res.status(500).send('Error al obtener detalles del contrato');
    }
};


