import Router from "express";
import routerObras from "./obras.routes.js";
import routerUsuarios from "./usuarios.routes.js";
import routerCarrito from "./carrito.routes.js";

const routerGeneral = Router();

routerGeneral.use('/api', routerObras);
routerGeneral.use('/api', routerUsuarios);
routerGeneral.use('/api', routerCarrito);


export default routerGeneral;