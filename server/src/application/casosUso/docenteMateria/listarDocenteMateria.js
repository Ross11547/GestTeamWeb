import { docenteMateriaRepositorio } from "../../../infrastructure/repositories/repositorioDocenteMateria.js";

export async function listarDocenteMateriaCasoUso() {
    return docenteMateriaRepositorio.listar();
}
