import carritoModel from "../models/carrito.model.js";
import obraModel from "../models/Obras.model.js";
import mongoose from "mongoose";


//Obtener todas las obras en el carrito
export const getCarrito = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;

    const data = await carritoModel.aggregate([
      { $match: { idUsuario: new mongoose.Types.ObjectId(idUsuario) } }, //transformamos el string de idUsuario en un objeto de id de mongo
      {//procerdemos a decirle que variables queremos que se muestren y agregamos la variable subtotal
        $project: {
          nombre: 1,
          precio: 1,
          cantidad: 1,
          subtotal: { $multiply: ["$precio", "$cantidad"] }
        }
      },
      {//Ordenamos todo para mostrarlo segun el usuario logueado y agregamos un subtotal
        $group: {
          _id: idUsuario,
          totalGastado: { $sum: "$subtotal" },
          items: {
            $push: {
              nombre: "$nombre",
              precio: "$precio",
              cantidad: "$cantidad",
              subtotal: "$subtotal"
            }
          }
        }
      }
    ]);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito del usuario", error });
  }
};

//agregar una obra al carrito
export const addItemCarrito = async (req, res) => {
    try {
        const idUsuario = req.body.idUsuario;
        const idItem = req.body.idItem;

        const item = await obraModel.findOne({_id: idItem});
        console.log(item.categoria);

        const nuevoItem = new carritoModel({
            _id:item._id,
            idUsuario: idUsuario, 
            categoria: item.categoria,
            tamaño: item.tamaño,
            nombre: item.nombre,
            autor: item.autor,
            img: item.img,
            precio: item.precio,
            descripcion: item.descripcion,
            cantidad: 1
        });
        console.log(nuevoItem);
        await nuevoItem.save();// Guardar en la base de datos

        res.status(200).json({
            message: "Obra agregada al carrito",
            data: nuevoItem
        });

    } catch (error) {
        res.status(500).json({ message: "Error al agregar la obra al carrito", error });
    }
};

//eliminar una obra del carrito
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