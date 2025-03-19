import Router from "express";
import routerObras from "./obras.routes.js";
import routerUsuarios from "./usuarios.routes.js";

const routerGeneral = Router();

routerGeneral.use('/api', routerObras);
routerGeneral.use('/api', routerUsuarios);

export default routerGeneral;