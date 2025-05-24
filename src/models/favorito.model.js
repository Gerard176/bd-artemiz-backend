import mongoose from "mongoose";

const ItemFavoritoSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId},
    idUsuario:{ type: mongoose.Schema.Types.ObjectId},
    categoria:{ type: String, required: true},
    tamaño:{type: String, required: true},
    nombre:{type: String, required: true},
    autor:{type: String, required: true},
    img:{type: String, required: true},
    precio:{type: Number, required: true},
    descripcion:{type: String, required: true},
});

export const favoritoModel = mongoose.model('FavoritoItem', ItemFavoritoSchema);

export default favoritoModel;