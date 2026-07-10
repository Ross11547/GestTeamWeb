import { Router } from "express";
import {
    listarRoles,
    obtenerRol,
    crearRol,
    actualizarRol,
    eliminarRol,
} from "../controllers/rol.controller.js";

const router = Router();

router.get("/rol", listarRoles);
router.get("/rol/:id", obtenerRol);

router.post("/rol", crearRol);
router.put("/rol/:id", actualizarRol);
router.delete("/rol/:id", eliminarRol);

export default router;
