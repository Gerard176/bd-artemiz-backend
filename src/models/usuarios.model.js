import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    idUsuario:{type: Number, required: true},
    imgPerf:{type: String, required: true},
    nombre:{type: String, required: true},
    nickName:{type: String, required: true},
    email:{type: String, required: true},
    contrasena:{type: String, required: true},
    direccion:{type: String, required: true},
    telefono:{type: Number, required: true},
});

export const usuarioModel = mongoose.model('usuario', usuarioSchema);

export default usuarioModel;