import { supabase } from '../config/supabase.js';

export class ActividadService {
  
  static async getRecent(limit = 50) {
      
      try {
        
        const { data, error } = await supabase
          .from('actividad')
          .select(`
            id,
            accion,
            entidad,
            detalles,
            created_at,
            usuarios:usuario_id (nombre_completo)
          `)
          .order('created_at', { ascending: false })
          .limit(limit);
  
        if (error) {
          console.error('❌ Error en query:', error);
          throw error;
        }
  
        // Formatear datos
        const resultado = data.map(act => {
          let registro = '';
          
          if (act.accion === 'crear_libro') {
            registro = `${act.usuarios.nombre_completo} creó el libro "${act.detalles?.titulo}"`;
          } else if (act.accion === 'cambiar_estado_libro') {
            registro = `${act.usuarios.nombre_completo} cambió estado de "${act.detalles?.titulo}" de ${act.detalles?.estado_anterior} a ${act.detalles?.estado_nuevo}`;
          } else if (act.accion === 'editar_libro') {
            registro = `${act.usuarios.nombre_completo} editó el libro "${act.detalles?.titulo}"`;
          } else if (act.accion === 'eliminar_libro') {
            registro = `${act.usuarios.nombre_completo} eliminó el libro "${act.detalles?.titulo}"`;
          } else {
            registro = `${act.usuarios.nombre_completo} - ${act.accion}`;
          }
  
          return {
            id: act.id,
            registro: registro,
            fecha: new Date(act.created_at).toLocaleString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })
          };
        });
        
        return resultado;
      } catch (error) {
        console.error('❌ [ActividadService.getRecent] Error:', error);
        throw error;
      }
    }
}