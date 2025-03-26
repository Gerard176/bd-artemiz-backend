import usuarioModel from "../models/usuarios.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";


export const getUsuarios = async (req, res) => {
    let data = await usuarioModel.find();
    res.status(200).json({
        msg: "usuarios encontrados",
        data: data,
    });
};

export const getPerfil = async (req, res) => {
    const {id} = req.usuario;
    let data = await usuarioModel.find({ _id: id });
    console.log("datos de perfil:" + data[0]);
    res.status(200).json({
        data: data[0],
    });
};

export const loginUsuario = async (req,res) =>{
    const {email, password} = req.body
    try {
        const usuario = await usuarioModel.find({
            "email": email,
            "contrasena": password
        })
        if (usuario.length == 0) {
            return res.status(401).json({ message: "Credenciales inválidas" })
        }else{
            const token = jwt.sign(
                { id: usuario[0]._id, email: usuario[0].email },
                config.JWT_SECRET, 
                { expiresIn: "1h" }  // El token expira en 1 hora
            );
            res.status(200).json({ message: "Inicio de sesion exitoso", usuario, token });
        }
        

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


export const registroUsuario = async (req, res) => {
    const imgPerf = "http://localhost:5000/uploads/usuario.png";
    const { idUsuario, nombre, nickName, email, direccion, telefono, contrasena } =
    req.body;
    try {
        const usuario = new usuarioModel({idUsuario, imgPerf, nombre, nickName, email, direccion, telefono, contrasena})
        await usuario.save();
        if (!usuario){
            return res.status(401).json({ error: "Se ingresaron erroneamente los campos" });
        }
        res.status(200).json({ message: "Registro exitoso", usuario });
    } catch (error) {
        console.error("Error al registrarse:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }  
};

export const actualizarUsuario = async (req,res) =>{
    const idUsuario = req.params.id;
    const { nombre, nickName, email, direccion, telefono, contrasena} = req.body;
    try {
        const usuarioActualizado = await usuarioModel.updateOne({ "idUsuario": idUsuario },
            { $set: {
                "nombre": nombre, 
                "nickName": nickName, 
                "email": email,
                "direccion":direccion, 
                "telefono": telefono, 
                "contrasena":contrasena 
            } }
        );
        if (!usuarioActualizado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario" });
    }

}

export const eliminarUsuario = async (req,res) =>{
    const idUsuario = req.params.id;
    try {
        const usuarioEliminado = await usuarioModel.deleteOne({"idUsuario": idUsuario})
        if (!usuarioEliminado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario" });
    }
}

export default {
  getUsuarios,
  getPerfil,
  registroUsuario,
  loginUsuario,
  actualizarUsuario,
  eliminarUsuario
};
