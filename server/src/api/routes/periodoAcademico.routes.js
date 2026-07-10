import { Router } from "express";
import {
    crearPeriodoAcademico,
    listarPeriodoAcademico,
    obtenerPeriodoAcademico,
    actualizarPeriodoAcademico,
    eliminarPeriodoAcademico,
    activarPeriodoAcademico,
} from "../controllers/periodoAcademico.controller.js";

const router = Router();

router.get("/periodoAcademico", listarPeriodoAcademico);
router.get("/periodoAcademico/:id", obtenerPeriodoAcademico);
router.post("/periodoAcademico", crearPeriodoAcademico);
router.put("/periodoAcademico/:id", actualizarPeriodoAcademico);
router.delete("/periodoAcademico/:id", eliminarPeriodoAcademico);

router.post("/periodoAcademico/:id/activar", activarPeriodoAcademico);

export default router;
