import { Router } from "express";
import {
    crearInstitucion,
    listarInstitucion,
    obtenerInstitucion,
    actualizarInstitucion,
    eliminarInstitucion,
} from "../controllers/institucion.controller.js";

const router = Router();

router.get("/institucion", listarInstitucion);
router.get("/institucion/:id", obtenerInstitucion);
router.post("/institucion", crearInstitucion);
router.put("/institucion/:id", actualizarInstitucion);
router.delete("/institucion/:id", eliminarInstitucion);

export default router;
