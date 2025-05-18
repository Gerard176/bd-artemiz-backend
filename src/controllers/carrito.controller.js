import carritoModel from "../models/carrito.model.js";
import obraModel from "../models/Obras.model.js";


//Obtener todas las obras en el carrito
export const getCarrito = async (req, res) =>{
    let data = await carritoModel.find();
    res.status(200).json({
        data: data
    })
}

//agregar una obra al carrito
export const addItemCarrito = async (req, res) => {
    try {
        const { _id, nombre,img, precio, descripcion } = req.body;

        // Crear el item a agregar al carrito 
        const item = new carritoModel({
            _id: _id,
            nombre: nombre,
            img: img,
            precio: precio,
            descripcion: descripcion,
            cantidad: 1 
        });
        console.log(item);


        // Guardar en la base de datos
        await item.save();

        res.status(200).json({
            message: "Obra agregada al carrito",
            data: item
        });

    } catch (error) {
        res.status(500).json({ message: "Error al agregar la obra al carrito", error });
    }
};

export const deleteItemCarrito = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await carritoModel.find({_id: id });
        console.log(item)
        if (item.length == 0) return res.status(404).json({mensaje:"No se encontro el item a eliminar en el carrito"});

        await carritoModel.deleteOne({ _id: id});
        res.status(200).json({
            message: "Obra eliminada del carrito",
            data: item
        });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la obra del carrito", error });
    }
};

export default {
    getCarrito,
    addItemCarrito,
    deleteItemCarrito
}