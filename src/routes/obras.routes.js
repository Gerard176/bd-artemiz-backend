import Router from "express";
import obrasController from "../controllers/obras.controller.js";

const routerObras = Router();

routerObras.get("/obras", obrasController.getObras);

export default routerObras;