import Router from "express";
import usuariosController from "../controllers/usuarios.controller.js"
import { verificarToken } from "../middlewares/auth.js";

const routerUsuarios = Router();

routerUsuarios.get('/usuarios',usuariosController.getUsuarios);
routerUsuarios.get('/usuarios/perfil', verificarToken, usuariosController.getPerfil);
routerUsuarios.post('/usuarios/registro', usuariosController.registroUsuario);
routerUsuarios.post('/usuarios/login', usuariosController.loginUsuario);
routerUsuarios.delete('/usuarios/:id', usuariosController.eliminarUsuario);
routerUsuarios.put('/usuarios/:id', usuariosController.actualizarUsuario);

export default routerUsuarios;