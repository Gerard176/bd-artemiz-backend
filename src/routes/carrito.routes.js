import Router from "express";
import carritoController from "../controllers/carrito.controller.js";

const routerCarrito = Router();

routerCarrito.get("/carrito/:idUsuario", carritoController.getCarrito);
routerCarrito.post("/carrito/add/", carritoController.addItemCarrito);
routerCarrito.delete("/carrito/delete/:id", carritoController.deleteItemCarrito);


export default routerCarrito;