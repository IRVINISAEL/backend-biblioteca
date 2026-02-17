import { ActividadService } from "../services/actividad.service.js";
import { successResponse, errorResponse } from "../libs/responseHandler.js";

export class ActividadController {
  static async getRecent(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 50;
      const actividad = await ActividadService.getRecent(limit);
      res
        .status(200)
        .json(successResponse(actividad, "Actividad obtenida exitosamente"));
    } catch (error) {
      console.error("Error en getRecent:", error);
      res.status(500).json(errorResponse("Error al obtener actividad", error));
    }
  }
}
