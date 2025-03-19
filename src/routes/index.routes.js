import Router from "express";
import routerObras from "./obras.routes.js";

const routerGeneral = Router();

routerGeneral.use('/api', routerObras);

export default routerGeneral;