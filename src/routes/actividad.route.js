import { Router } from 'express';
import { ActividadController } from '../controllers/actividad.controller.js';

const router = Router();

router.get('/', ActividadController.getRecent);

export default router;