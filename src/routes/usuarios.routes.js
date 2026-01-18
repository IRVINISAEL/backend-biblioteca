import { Router } from "express";
import { getUsuarios, crearUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.post("/", crearUsuario);

export default router;
