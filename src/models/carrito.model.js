import mongoose from "mongoose";

const ItemCarritoSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId},
    nombre:{type: String, required: true},
    img:{type: String, required: true},
    precio:{type: Number, required: true},
    descripcion:{type: String, required: true},
    cantidad:{type: Number, required: true}
});

export const carritoModel = mongoose.model('CarritoItem', ItemCarritoSchema);

export default carritoModel;