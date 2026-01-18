import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./config/logger.js";

// Rutas
import usuariosRoutes from "./routes/usuarios.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
