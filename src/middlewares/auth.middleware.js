import { AuthService } from '../services/auth.service.js';
import { errorResponse } from '../libs/responseHandler.js';

export const authenticate = async (req, res, next) => {

  try {
    let accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    // Si no hay access token, intentar con refresh
    if (!accessToken && refreshToken) {
      try {
        const newSession = await AuthService.refreshToken(refreshToken);
        
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000
        };

        res.cookie('access_token', newSession.access_token, {
          ...cookieOptions,
          maxAge: 60 * 60 * 1000
        });

        res.cookie('refresh_token', newSession.refresh_token, cookieOptions);

        accessToken = newSession.access_token;
      } catch (refreshError) {
        console.error('❌ Error al refrescar token:', refreshError);
        return res.status(401).json({
          ...errorResponse('Sesión expirada'),
          redirectToLogin: true
        });
      }
    }

    if (!accessToken) {
      console.log('❌ No hay token');
      return res.status(401).json({
        ...errorResponse('Token no proporcionado'),
        redirectToLogin: true
      });
    }

    // Verificar access token y obtener usuario
    try {
      
      const user = await AuthService.getCurrentUser(accessToken);
      
      req.user = user;
      next();
    } catch (error) {
      console.error('❌ Error al verificar token:', error.message);
      
      // Si el access token es inválido, intentar refresh
      if (refreshToken) {
        try {
          const newSession = await AuthService.refreshToken(refreshToken);
          
          const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
          };

          res.cookie('access_token', newSession.access_token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 1000
          });

          res.cookie('refresh_token', newSession.refresh_token, cookieOptions);

          const user = await AuthService.getCurrentUser(newSession.access_token);
          
          req.user = user;
          next();
        } catch (refreshError) {
          console.error('❌ Error al refrescar después de fallo:', refreshError);
          return res.status(401).json({
            ...errorResponse('Sesión expirada'),
            redirectToLogin: true
          });
        }
      } else {
        console.log('❌ No hay refresh token disponible');
        return res.status(401).json({
          ...errorResponse('Token inválido'),
          redirectToLogin: true
        });
      }
    }
  } catch (error) {
    console.error('❌ [Auth Middleware] Error general:', error);
    res.status(500).json(errorResponse('Error en el servidor'));
  }
};

export const requireAdmin = (req, res, next) => {
  
  if (req.user.rol !== 'admin') {
    console.log('❌ Acceso denegado - no es admin');
    return res.status(403).json(
      errorResponse('Acceso denegado. Se requiere rol de administrador')
    );
  }
  next();
};