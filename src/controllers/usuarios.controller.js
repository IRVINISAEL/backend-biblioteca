import * as UsuariosService from "../services/usuarios.service.js";
import { logger } from "../config/logger.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuariosService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { email, ...rest } = req.body;
    if (!email) {
      return res.status(400).json({ error: "El campo 'email' es obligatorio" });
    }
    const usuario = await UsuariosService.crearUsuario({ email, ...rest });
    res.json(usuario);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
