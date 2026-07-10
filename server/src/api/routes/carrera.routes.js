import { Router } from "express";
import {
    listarCarrera,
    obtenerCarrera,
    crearCarrera,
    actualizarCarrera,
    eliminarCarrera,
} from "../controllers/carrera.controller.js";

const router = Router();

router.get("/carrera", listarCarrera);            // ?idFacultad=1&q=sistemas
router.get("/carrera/:id", obtenerCarrera);
router.post("/carrera", crearCarrera);
router.put("/carrera/:id", actualizarCarrera);
router.delete("/carrera/:id", eliminarCarrera);

export default router;
