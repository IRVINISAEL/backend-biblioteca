import { Router } from 'express';
import { LibroController } from '../controllers/libro.controller.js';

const router = Router();

router.get('/', LibroController.getAll);

export default router;