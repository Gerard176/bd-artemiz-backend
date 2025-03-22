import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verificarToken = (req, res, next) => {
    const token = req.header("token");
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado" });
    }

    try {
        const verificado = jwt.verify(token, config.JWT_SECRET);
        req.usuario = verificado; // Guarda el usuario en la request
        next(); // Continúa con la siguiente función
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};