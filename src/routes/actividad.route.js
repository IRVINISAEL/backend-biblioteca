import { Router } from 'express';
import { ActividadController } from '../controllers/actividad.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Proteger todas las rutas
router.use(authenticate);

router.get('/', ActividadController.getRecent);

export default router;