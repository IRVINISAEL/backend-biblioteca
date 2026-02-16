import { LibroService } from "../services/libro.service.js";
import { successResponse, errorResponse } from "../libs/responseHandler.js";

export class LibroController {
  static async getAll(req, res) {
    try {
      const libros = await LibroService.getAll();
      successResponse(res, libros, 200, "Libros obtenidos exitosamente");
    } catch (error) {
      console.error("Error en getAll:", error);
      errorResponse(res, "Error al obtener libros", 500);
    }
  }
}
