import { Router } from "express";
import {
    listarInscripcionMateria,
    obtenerInscripcionMateria,
    crearInscripcionMateria,
    actualizarInscripcionMateria,
    eliminarInscripcionMateria,
} from "../controllers/inscripcionMateria.controller.js";

const router = Router();

router.get("/inscripcionMateria", listarInscripcionMateria);
router.get("/inscripcionMateria/:id", obtenerInscripcionMateria);

router.post("/inscripcionMateria", crearInscripcionMateria);
router.put("/inscripcionMateria/:id", actualizarInscripcionMateria);
router.delete("/inscripcionMateria/:id", eliminarInscripcionMateria);

export default router;
