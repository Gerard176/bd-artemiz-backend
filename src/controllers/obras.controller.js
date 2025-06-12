import obraModel from "../models/Obras.model.js";

//Obtener todas las obras
export const getObras = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const skip = parseInt(req.query.skip) || 0;

        // Parámetros opcionales para filtrar y ordenar
        const categoria = req.query.categoria;
        const autor = req.query.autor;
        const tamaño = req.query.tamaño;
        const sortField = req.query.sortField || "precio"; // campo a ordenar
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // orden

        const match = {};
        if (categoria) match.categoria = categoria;
        if (autor) match.autor = autor;
        if (tamaño) match.tamaño = tamaño;


        const data = await obraModel.aggregate([
            { $match: match },
            { $sort: { [sortField]: sortOrder } },
            { $skip: skip },
            { $limit: limit }
        ]);

        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las obras' });
    }
};



// Obtener una sola obra
export const getObra = async (req, res) => {
    const { id } = req.params;
    try {
        const obra = await obraModel.findById(id);

        if (!obra) {
            return res.status(404).json({ error: 'Obra no encontrada' });
        }

        res.status(200).json(obra);
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor: " + error.message
        });
    }
}
export default {
    getObras,
    getObra,
}