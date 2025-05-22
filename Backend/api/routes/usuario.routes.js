import express from "express";
import {
  registrarUsuario,
  login,
  obtenerPerfil,
  obtenerUsuarios,
} from "../controllers/usuario.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { esAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/perfil", verificarToken, obtenerPerfil);

// Solo un ADMIN puede crear otros usuarios (empleados)
router.post("/", verificarToken, esAdmin, registrarUsuario);
router.get("/", verificarToken, esAdmin, obtenerUsuarios);
export default router;
