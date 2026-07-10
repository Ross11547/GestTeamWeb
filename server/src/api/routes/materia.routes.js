import { Router } from "express";
import {
  listarMateria,
  obtenerMateria,
  crearMateria,
  actualizarMateria,
  eliminarMateria,
  listarMateriaPorSemestre,
  listarMateriaPorCarrera,
  listarMateriasMias,
  obtenerRelacionesMateria,
} from "../controllers/materia.controller.js";

const router = Router();

router.get("/materia", listarMateria);
router.get("/materia/by-semestre", listarMateriaPorSemestre);
router.get("/materia/by-carrera", listarMateriaPorCarrera);

router.get("/materias/mias", listarMateriasMias);

router.get("/materia/:id/relaciones", obtenerRelacionesMateria);
router.get("/materia/:id", obtenerMateria);

router.post("/materia", crearMateria);
router.put("/materia/:id", actualizarMateria);
router.delete("/materia/:id", eliminarMateria);

export default router;
