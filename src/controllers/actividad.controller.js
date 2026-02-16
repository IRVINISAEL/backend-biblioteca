import { ActividadService } from "../services/actividad.service.js";
import { successResponse, errorResponse } from "../libs/responseHandler.js";

export class ActividadController {
  static async getRecent(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 50;
      const actividad = await ActividadService.getRecent(limit);
      successResponse(res, actividad, 200, "Actividad obtenida exitosamente");
    } catch (error) {
      console.error("Error en getRecent:", error);
      errorResponse(res, "Error al obtener actividad", 500);
    }
  }
}
