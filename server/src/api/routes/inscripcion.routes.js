import { Router } from "express";
import {
    listarInscripciones,
    obtenerInscripcion,
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
} from "../controllers/inscripcion.controller.js";

const router = Router();

router.get("/inscripcion", listarInscripciones);
router.get("/inscripcion/:id", obtenerInscripcion);

router.post("/inscripcion", crearInscripcion);
router.put("/inscripcion/:id", actualizarInscripcion);
router.delete("/inscripcion/:id", eliminarInscripcion);

export default router;
