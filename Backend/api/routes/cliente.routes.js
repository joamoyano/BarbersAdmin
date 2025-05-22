import express from "express";
import {
  crearCliente,
  listarClientes,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/cliente.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verificarToken); // protege todas las rutas

router.post("/", crearCliente);
router.get("/", listarClientes);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);

export default router;
