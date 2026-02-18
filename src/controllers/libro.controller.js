import { LibroService } from "../services/libro.service.js";
import { successResponse, errorResponse } from "../libs/responseHandler.js";

export class LibroController {
  static async getAll(req, res) {
    try {
      const libros = await LibroService.getAll();
      res
        .status(200)
        .json(successResponse(libros, "Libros obtenidos exitosamente"));
    } catch (error) {
      console.error("Error en getAll:", error);
      res.status(500).json(errorResponse("Error al obtener libros", error));
    }
  }
}
