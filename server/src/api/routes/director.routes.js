import { Router } from "express";
import {
    listarDirectores,
    obtenerDirectorID,
    crearDirector,
    actualizarDirector,
    eliminarDirector,
} from "../controllers/director.controller.js";

const router = Router();

router.get("/director", listarDirectores);
router.get("/director/:id", obtenerDirectorID);
router.post("/director", crearDirector);
router.put("/director/:id", actualizarDirector);
router.delete("/director/:id", eliminarDirector);

export default router;
