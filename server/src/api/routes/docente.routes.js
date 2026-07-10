import { Router } from "express";
import {
    listarDocentes,
    obtenerDocenteID,
    crearDocente,
    actualizarDocente,
    eliminarDocente,
} from "../controllers/docente.controller.js";

const router = Router();

router.get("/docente", listarDocentes);
router.get("/docente/:id", obtenerDocenteID);
router.post("/docente", crearDocente);
router.put("/docente/:id", actualizarDocente);
router.delete("/docente/:id", eliminarDocente);

export default router;
