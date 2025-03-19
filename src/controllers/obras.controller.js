import obraModel from "../models/Obras.model.js";

export const getObras = async (req, res) =>{
    let data = await obraModel.find();
    res.status(200).json({
        msg: "Obras obtenidas desde el controlador",
        data: data
    })
}

export default {
    getObras
}