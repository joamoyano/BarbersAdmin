import express from "express";
import {
  registrarCorte,
  listarCortes,
} from "../controllers/corte.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verificarToken);

router.post("/", registrarCorte);
router.get("/", listarCortes);

export default router;
