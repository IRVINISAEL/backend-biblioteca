import { supabase } from "../config/supabase.js";

export const obtenerUsuarios = async (email) => {
  // Si se proporciona un email en la consulta, aplicamos un filtro
  let query = supabase.from("usuarios").select("*");
  if (email) {
    query = query.eq("email", email);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

export const crearUsuario = async (usuario) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert(usuario)
    .select();

  if (error) throw error;
  return data[0];
};
