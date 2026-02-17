import { supabase, getSupabaseClient } from '../config/supabase.js';

export class AuthService {
  
  /**
   * Login - Autenticar usuario
   */
  static async login(email, password) {
    // 1. Autenticar con Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Error al autenticar');
    
    console.log('✅ Usuario autenticado:', authData.user.id); // LOG

    // 2. Obtener información adicional del usuario desde nuestra tabla
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', authData.user.id)
      .single();
    
    console.log('🔍 Buscando usuario con ID:', authData.user.id); // LOG
    console.log('📊 Resultado de consulta:', userData); // LOG
    console.log('❌ Error (si hay):', userError); // LOG

    if (userError || !userData) {
      throw new Error('Usuario no encontrado en el sistema');
    }

    return {
      session: authData.session,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        nombre_completo: userData.nombre_completo,
        rol: userData.rol
      }
    };
  }

  /**
   * Logout - Cerrar sesión
   */
  static async logout(accessToken) {
    const supabaseClient = getSupabaseClient(accessToken);
    const { error } = await supabaseClient.auth.signOut();
    
    if (error) throw new Error(error.message);
    
    return true;
  }

  /**
   * Obtener usuario actual
   */
  static async getCurrentUser(accessToken) {
    const supabaseClient = getSupabaseClient(accessToken);
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      throw new Error('Token inválido');
    }

    // Obtener info adicional
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      throw new Error('Usuario no encontrado en el sistema');
    }

    return {
      id: user.id,
      email: user.email,
      nombre_completo: userData.nombre_completo,
      rol: userData.rol
    };
  }

  /**
   * Refrescar token
   */
  static async refreshToken(refreshToken) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken
    });

    if (error) throw new Error(error.message);
    if (!data.session) throw new Error('No se pudo refrescar la sesión');

    return data.session;
  }

  /**
   * Crear nuevo usuario (solo admin)
   */
  static async createUser(userData, adminId) {
    // 1. Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true // Auto-confirmar email
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Error al crear usuario');

    // 2. Crear registro en nuestra tabla usuarios
    const { data: newUser, error: userError } = await supabase
      .from('usuarios')
      .insert({
        id: authData.user.id,
        nombre_completo: userData.nombre_completo,
        rol: userData.rol,
        created_by: adminId
      })
      .select()
      .single();

    if (userError) {
      // Si falla, intentar eliminar el usuario de Auth
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error(userError.message);
    }

    // 3. Registrar en actividad
    await supabase
      .from('actividad')
      .insert({
        usuario_id: adminId,
        accion: 'crear_usuario',
        entidad: 'usuario',
        entidad_id: newUser.id,
        detalles: {
          nombre: userData.nombre_completo,
          rol: userData.rol
        }
      });

    return {
      id: newUser.id,
      email: authData.user.email,
      nombre_completo: newUser.nombre_completo,
      rol: newUser.rol
    };
  }
}