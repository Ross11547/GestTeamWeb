import { Router } from "express";
import {
    listarEstudiantes,
    obtenerEstudianteID,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
} from "../controllers/estudiante.controller.js";

const router = Router();

router.get("/estudiante", listarEstudiantes);
router.get("/estudiante/:id", obtenerEstudianteID);
router.post("/estudiante", crearEstudiante);
router.put("/estudiante/:id", actualizarEstudiante);
router.delete("/estudiante/:id", eliminarEstudiante);

export default router;
