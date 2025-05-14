import mongoose from "mongoose";

const obraSchema = new mongoose.Schema({
    nombre:{type: String, required: true},
    img:{type: String, required: true},
    precio:{type: Number, required: true},
    descripcion:{type: String, required: true}
});

export const obraModel = mongoose.model('obra', obraSchema);

export default obraModel;