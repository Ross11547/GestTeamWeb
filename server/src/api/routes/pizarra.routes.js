import { Router } from "express";
import {
    listarPizarra,
    obtenerPizarra,
    crearPizarra,
    actualizarPizarra,
    guardarContenidoPizarra,
    eliminarPizarra,
    reemplazarColaboradores,
} from "../controllers/pizarra.controller.js";

const router = Router();

router.get("/pizarra", listarPizarra );
router.get("/pizarra/:id", obtenerPizarra);
router.post("/pizarra", crearPizarra);
router.put("/pizarra/:id", actualizarPizarra);
router.put("/pizarra/:id/data", guardarContenidoPizarra);
router.put("/pizarra/:id/colaboradores", reemplazarColaboradores);
router.delete("/pizarra/:id", eliminarPizarra);

export default router;
