import express from "express";
import {
  crearServicio,
  listarServicios,
  actualizarServicio,
  eliminarServicio,
} from "../controllers/servicio.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { esAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/", listarServicios);
router.post("/", esAdmin, crearServicio);
router.put("/:id", esAdmin, actualizarServicio);
router.delete("/:id", esAdmin, eliminarServicio);

export default router;
