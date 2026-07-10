import { Router } from "express";
import {
    listarHorario,
    obtenerHorario,
    listarHorarioPorMateria,
    crearHorario,
    actualizarHorario,
    eliminarHorario,
} from "../controllers/horario.controller.js";

const router = Router();

router.get("/horario", listarHorario);
router.get("/horario/porMateria", listarHorarioPorMateria);
router.get("/horario/:id", obtenerHorario);

router.post("/horario", crearHorario);
router.put("/horario/:id", actualizarHorario);
router.delete("/horario/:id", eliminarHorario);

export default router;
