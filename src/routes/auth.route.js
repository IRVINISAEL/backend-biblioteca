import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

// Rutas protegidas
router.get('/me', authenticate, AuthController.getCurrentUser);

// Rutas solo para admin
router.post('/users', authenticate, requireAdmin, AuthController.createUser);

export default router;