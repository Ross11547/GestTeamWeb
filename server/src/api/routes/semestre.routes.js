import { Router } from "express";
import {
    listarSemestre,
    listarSemestrePorCarrera,
    obtenerSemestre,
    crearSemestre,
    actualizarSemestre,
    eliminarSemestre,
} from "../controllers/semestre.controller.js";

const router = Router();

router.get("/semestre", listarSemestre);
router.get("/semestre/by-carrera", listarSemestrePorCarrera);
router.get("/semestre/:id", obtenerSemestre);
router.post("/semestre", crearSemestre);
router.put("/semestre/:id", actualizarSemestre);
router.delete("/semestre/:id", eliminarSemestre);

export default router;
