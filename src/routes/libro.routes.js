import { Router } from 'express';
import { LibroController } from '../controllers/libro.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Proteger todas las rutas
router.use(authenticate);

router.get('/', LibroController.getAll);

export default router;