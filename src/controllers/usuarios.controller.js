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
    const usuario = await UsuariosService.crearUsuario(req.body);
    res.json(usuario);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
