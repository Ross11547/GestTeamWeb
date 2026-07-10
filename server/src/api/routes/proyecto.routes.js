import { Router } from "express";
import {
    listarProyectos,
    obtenerProyecto,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto,
} from "../controllers/proyecto.controller.js";

const router = Router();

router.get("/proyecto", listarProyectos);
router.get("/proyecto/:id", obtenerProyecto);

router.post("/proyecto", crearProyecto);
router.put("/proyecto/:id", actualizarProyecto);
router.delete("/proyecto/:id", eliminarProyecto);

export default router;
