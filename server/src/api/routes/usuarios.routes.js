import { Router } from "express";
import {
    listarUsuarios,
    obtenerUsuarioId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    login,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuario", listarUsuarios);
router.get("/usuario/:id", obtenerUsuarioId);
router.post("/usuario", crearUsuario);
router.put("/usuario/:id", actualizarUsuario);
router.delete("/usuario/:id", eliminarUsuario);

router.post("/login", login);

export default router;
