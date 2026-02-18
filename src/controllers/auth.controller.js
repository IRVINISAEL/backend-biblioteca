import { AuthService } from '../services/auth.service.js';
import { LoginSchema, CreateUserSchema } from '../config/models/auth.model.js';
import { errorResponse, successResponse } from '../libs/responseHandler.js';

export class AuthController {
  
  /**
   * POST /api/auth/login
   */
  static async login(req, res) {
    try {
      // Validar datos con Zod
      const validatedData = LoginSchema.parse(req.body);

      const { session, user } = await AuthService.login(
        validatedData.email,
        validatedData.password
      );

      // Configurar cookies httpOnly
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true en producción
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
      };

      res.cookie('access_token', session.access_token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000 // 1 hora
      });

      res.cookie('refresh_token', session.refresh_token, cookieOptions);

      res.json(successResponse(
        {
          nombre_completo: user.nombre_completo,
          rol: user.rol,
          email: user.email
        },
        'Inicio de sesión exitoso'
      ));
    } catch (error) {
      console.error('Error en login:', error);
      
      // Errores de validación de Zod
      if (error.name === 'ZodError') {
        return res.status(400).json(errorResponse(
          'Datos inválidos',
          error.errors
        ));
      }

      res.status(401).json(errorResponse(
        error.message || 'Credenciales inválidas'
      ));
    }
  }

  /**
   * POST /api/auth/logout
   */
  static async logout(req, res) {
    try {
      const accessToken = req.cookies.access_token;

      if (accessToken) {
        await AuthService.logout(accessToken);
      }

      // Limpiar cookies
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');

      res.json(successResponse(null, 'Sesión cerrada exitosamente'));
    } catch (error) {
      console.error('Error en logout:', error);
      
      // Aunque falle, limpiamos las cookies
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      
      res.json(successResponse(null, 'Sesión cerrada'));
    }
  }

  /**
   * GET /api/auth/me
   */
  static async getCurrentUser(req, res) {
    try {
      const user = req.user; // Ya viene del middleware

      res.json(successResponse(user, 'Usuario obtenido exitosamente'));
    } catch (error) {
      console.error('Error en getCurrentUser:', error);
      res.status(500).json(errorResponse('Error al obtener usuario'));
    }
  }

  /**
   * POST /api/auth/users (solo admin)
   */
  static async createUser(req, res) {
    try {
      // Validar datos con Zod
      const validatedData = CreateUserSchema.parse(req.body);

      const newUser = await AuthService.createUser(
        validatedData,
        req.user.id
      );

      res.status(201).json(successResponse(
        newUser,
        'Usuario creado exitosamente'
      ));
    } catch (error) {
      console.error('Error en createUser:', error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json(errorResponse(
          'Datos inválidos',
          error.errors
        ));
      }

      res.status(500).json(errorResponse(
        error.message || 'Error al crear usuario'
      ));
    }
  }
}