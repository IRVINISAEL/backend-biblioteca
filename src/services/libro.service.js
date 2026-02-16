import { supabase } from '../config/supabase.js';

export class LibroService {
  
  static async getAll() {
    const { data, error } = await supabase
      .from('libros')
      .select(`
        codigo_biblioteca,
        isbn,
        titulo,
        editorial,
        anio_publicacion,
        estado,
        notas,
        categorias:categoria_id (nombre),
        libro_autores (
          autores (nombre_completo)
        )
      `)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Formatear datos
    return data.map(libro => ({
      codigo_biblioteca: libro.codigo_biblioteca,
      titulo: libro.titulo,
      autores: libro.libro_autores.map(la => la.autores.nombre_completo).join(', '),
      total_copias: 1,
      isbn: libro.isbn,
      // estado: libro.estado,
      // categoria: libro.categorias?.nombre || null,
      // editorial: libro.editorial,
      // anio_publicacion: libro.anio_publicacion,
      // notas: libro.notas
    }));
  }
}