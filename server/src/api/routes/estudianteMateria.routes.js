import { Router } from "express";
import {
    listarEstudianteMateria,
    obtenerEstudianteMateria,
    crearEstudianteMateria,
    actualizarEstudianteMateria,
    eliminarEstudianteMateria,
} from "../controllers/estudianteMateria.controller.js";

const router = Router();

router.get("/estudianteMateria", listarEstudianteMateria);
router.get("/estudianteMateria/:id", obtenerEstudianteMateria);

router.post("/estudianteMateria", crearEstudianteMateria);
router.put("/estudianteMateria/:id", actualizarEstudianteMateria);
router.delete("/estudianteMateria/:id", eliminarEstudianteMateria);

export default router;
