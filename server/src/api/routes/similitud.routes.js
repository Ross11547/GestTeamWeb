import { Router } from "express";
import { analizarDocumentoControlador } from "../controladores/similitud.controlador.js";
import { subirArchivoMiddleware } from "../middlewares/subida-archivo.middleware.js";

const router = Router();

router.post("/documentos/analizar", subirArchivoMiddleware, analizarDocumentoControlador);

export default router;
