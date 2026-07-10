import { Router } from "express";
import {
    listarDocenteMateria,
    obtenerDocenteMateria,
    crearDocenteMateria,
    actualizarDocenteMateria,
    eliminarDocenteMateria,
} from "../controllers/docenteMateria.controller.js";

const router = Router();

router.get("/docenteMateria", listarDocenteMateria);
router.get("/docenteMateria/:id", obtenerDocenteMateria);

router.post("/docenteMateria", crearDocenteMateria);
router.put("/docenteMateria/:id", actualizarDocenteMateria);
router.delete("/docenteMateria/:id", eliminarDocenteMateria);

export default router;
