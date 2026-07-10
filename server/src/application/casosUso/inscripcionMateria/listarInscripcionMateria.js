import { inscripcionMateriaRepositorio } from "../../../infrastructure/repositories/repositorioInscripcionMateria.js";

export async function listarInscripcionMateriaCasoUso() {
    return inscripcionMateriaRepositorio.listar();
}
