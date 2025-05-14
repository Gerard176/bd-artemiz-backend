import { json } from "express";
import obraModel from "../models/Obras.model.js";

//Obtener todas las obras 
export const getObras = async (req, res) =>{
    let data = await obraModel.find();
    res.status(200).json({
        data: data
    })
}
// Obtener una sola obra
export const getObra = async (req, res) =>{
    const {id} = req.params;
    try {
        
        let obra = await obraModel.find({ _id: id});
        res.status(200).json({
            obra: obra
        });
    } catch (error) {
        res.status(400).json({
            error: "Error interno del servidor: " + error
        });
    }
}


export default {
    getObras,
    getObra
}