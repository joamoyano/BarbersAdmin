import express from "express";
import {
  ingresosPorSemana,
  resumenDiario,
  clientesUnicosDelMes,
  topEmpleado,
  serviciosMasVendidos,
  actividadReciente,
} from "../controllers/dashboard.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verificarToken);

router.get("/ingresos-semana", ingresosPorSemana);
router.get("/cortes-hoy", resumenDiario);
router.get("/clientes-mes", clientesUnicosDelMes);
router.get("/top-empleado", topEmpleado);
router.get("/top-servicios", serviciosMasVendidos);
router.get("/actividad-reciente", actividadReciente);

export default router;
