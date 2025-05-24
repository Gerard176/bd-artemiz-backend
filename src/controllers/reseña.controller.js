import reseñaModel from "../models/reseñas.model.js";
import mongoose from "mongoose";
import usuarioModel from "../models/usuarios.model.js";

export const getResenas = async (req, res) => {
    const idObra = req.params;
    try {
        let data = await reseñaModel.aggregate([
            { $match: { idObra: new mongoose.Types.ObjectId(idObra) } }, //transformamos el string de idObra en un objeto de id de mongo
            {
                $lookup: {
                    from: "usuarios", // nombre de la colección en MongoDB
                    localField: "idUsuario",
                    foreignField: "_id",
                    as: "usuario"
                }
            },
            {
                $unwind: "$usuario" // desestructuramos el array `usuario` en un solo objeto
            },
            {
                $project: {
                    contenido: 1,
                    valoracion: 1,
                    fecha: 1,
                    likes: 1,
                    usuario: {
                        nombre: 1,
                        email: 1,
                        img: 1
                    }
                }
            }
        ]);
        res.status(200).json({
            msg: "Resenas encontradas",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las obras' });
    }
    
};

export const postResena = async (req,res) =>{
    try {
        const {idUsuario,idObra, contenido, valoracion, likes} = req.body;
        const fecha = new Date();
        const resena = new reseñaModel({
            idUsuario: idUsuario,
            idObra: idObra,
            contenido: contenido,
            valoracion: valoracion,
            fecha: fecha,
            likes: likes
        })
        await resena.save();
        
        res.status(200).json({
            msg: "Resena posteada",
            data: resena
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "error interno del servidor: " + error});
    }
}

export const deleteResena = async (req, res) => {
    const {idUsuario, idResena,} = req.body;
    // try {
        const reseña = await reseñaModel.findOne({_id: idResena });
        const usuario = await usuarioModel.findOne({_id: idUsuario });
        console.log(reseña.idUsuario, usuario._id)
        if (reseña.idUsuario.toString() !== usuario._id.toString()) {
            return res.status(404).json({mensaje:"El usuario que esta intentando eliminar no creó el comentario"});
        }

        await reseñaModel.deleteOne({ _id: reseña._id});
        res.status(200).json({
            message: "Reseña eliminada",
            data: reseña
        });

    // } catch (error) {
    //     res.status(500).json({ message: "Error al eliminar la reseña", error });
    // }
};
export default {
    getResenas,
    postResena,
    deleteResena
}