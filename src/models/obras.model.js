import mongoose from "mongoose";

const obraSchema = new mongoose.Schema({
    idUsuario:{type: String, required: true},
    nombre:{type: String, required: true},
    autor:{type: String, required: true},
    tamaño: {type: String, required: true},
    categoria:{type: String, required: true},
    img:{type: String, required: true},
    precio:{type: Number, required: true},
    descripcion:{type: String, required: true},
    disponibilidad:{type: Number, required: true}
});

export const obraModel = mongoose.model('obra', obraSchema);

export default obraModel;