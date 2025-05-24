import usuarioModel from "../models/usuarios.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { error } from "console";

export const getUsuarios = async (req, res) => {
    let data = await usuarioModel.find();
    res.status(200).json({
        msg: "usuarios encontrados",
        data: data,
    });
};

export const getPerfil = async (req, res) => {
    const { id } = req.usuario;

    try {
        let data = await usuarioModel.find({ _id: id });
        console.log("datos de perfil:" + data[0]);
        if(data[0].length == 0){
            console.log("hola?")
            res.status(401).json({error: "Se ha eliminado este usuario", error});
        }
        res.status(200).json({
            data: data[0],
        });
    } catch (error) {
        console.error("Error al intentar obtener el perfil del usuario");
        res.status(500).json({error: "error interno del servidor", error});
    }

};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body
    try {
        const usuario = await usuarioModel.find({
            "email": email,
            "password": password
        })
        if (usuario.length == 0) {
            return res.status(401).json({ message: "Credenciales inválidas" })
        } else {
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
    const { nombre, apellido, cedula, nickName, email, direccion, telefono, password } =
        req.body;
    try {
        const usuarioRepetido = await usuarioModel.find({
            "email": email,
            "password": password
        });
        console.log(usuarioRepetido);
        if (usuarioRepetido.length != 0) {
            return res.status(403).json({ error: "Este email ya se encuentra registrado" });
        }
        // if (usuarioRepetido.cedula == cedula) {
        //     return res.status(405).json({error: "Esta cedula ya se encuentra registrada"});
        // }
        console.log(req.body);
        const usuario = new usuarioModel({ imgPerf, nombre, apellido, cedula, nickName, email, direccion, telefono, password })
        await usuario.save();
        console.log(usuario.email);

        if (!usuario) {
            return res.status(401).json({ error: "Se ingresaron erroneamente los campos" });
        }
        res.status(200).json({ message: "Registro exitoso", usuario });
    } catch (error) {
        console.error("Error al registrarse:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const actualizarUsuario = async (req, res) => {
    const { nombre, id, nickName, apellido, direccion, telefono } = req.body;
    console.log(req.body);
    try {
        const usuarioActualizado = await usuarioModel.updateOne({ "_id": id },
            {
                $set: {
                    "nombre": nombre,
                    "apellido": apellido,
                    "nickName": nickName,
                    "direccion": direccion,
                    "telefono": telefono,
                }
            }
        );
        console.log(usuarioActualizado);
        if (!usuarioActualizado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario" });
    }

}


export const actualizarImagenDeUsuario = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    try {

        const userId = req.headers.id; // ID del usuario autenticado
        console.log(userId);
        const imagePath = `http://localhost:5000/uploads/${req.body}`; // Ruta de la imagen

        const usuarioActualizado = await usuarioModel.updateOne({ "_id": userId },
            { $set: { "imgPerf": imagePath } });

        console.log(usuarioActualizado);
        res.json({ message: "Imagen actualizada con éxito", imgPerf: imagePath });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la imagen", error });
    }
}

export const eliminarUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const usuarioEliminado = await usuarioModel.deleteOne({ "_id": idUsuario })
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
    eliminarUsuario,
    actualizarImagenDeUsuario
};
