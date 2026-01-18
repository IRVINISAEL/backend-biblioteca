import { supabase } from "../config/supabase.js";

export const obtenerUsuarios = async () => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*");

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
