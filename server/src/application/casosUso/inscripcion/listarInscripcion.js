import { inscripcionRepositorio } from "../../../infrastructure/repositories/repositorioInscripcion.js";

export async function listarInscripcionesCasoUso() {
    return inscripcionRepositorio.listar();
}
