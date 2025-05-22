import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuario.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import servicioRoutes from "./routes/servicio.routes.js";
import corteRoutes from "./routes/corte.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/cortes", corteRoutes);
app.use("/api/dashboard", dashboardRoutes);
