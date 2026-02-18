import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { logger } from "./config/logger.js";

// Importar rutas
import usuariosRoutes from "./routes/usuarios.routes.js";
import librosRoutes from "./routes/libro.routes.js";
import actividadRoute from "./routes/actividad.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/libros", librosRoutes);
app.use("/api/actividades", actividadRoute);
app.use("/api/auth", authRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Inventario UTT' });
});

app.listen(PORT, () => {
  logger.info(`✅ Servidor corriendo en http://localhost:${PORT}`)
  logger.info(`🔗 CORS habilitado para: ${process.env.FRONTEND_URL}`);
});
