import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    imgPerf:{type: String, required: true},
    nombre:{type: String, required: true},
    apellido:{type: String, required: true},
    cedula: {type: Number, required: true},
    nickName:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    direccion:{type: String, required: true},
    telefono:{type: Number, required: true},
});

export const usuarioModel = mongoose.model('usuario', usuarioSchema);

export default usuarioModel;