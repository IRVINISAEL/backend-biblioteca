import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./config/logger.js";

// Importar rutas
import usuariosRoutes from "./routes/usuarios.routes.js";
import librosRoutes from "./routes/libro.routes.js";
import actividadRoute from "./routes/actividad.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/libros", librosRoutes);
app.use("/api/actividades", actividadRoute);

app.get('/', (req, res) => {
  res.json({ message: 'API Inventario UTT' });
});

app.listen(PORT, () => {
  logger.info(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
