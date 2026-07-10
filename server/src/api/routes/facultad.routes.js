import { Router } from "express";
import {
    listarFacultad,
    obtenerFacultad,
    crearFacultad,
    actualizarFacultad,
    eliminarFacultad,
} from "../controllers/facultad.controller.js";

const router = Router();

router.get("/facultad", listarFacultad);                 // ?institucionId=1&q=salud
router.get("/facultad/:id", obtenerFacultad);
router.post("/facultad", crearFacultad);
router.put("/facultad/:id", actualizarFacultad);
router.delete("/facultad/:id", eliminarFacultad);

export default router;
