import { claseMateriaRepositorio } from "../../../infrastructure/repositories/repositorioClaseMateria.js";

export async function listarClasesMateriaCasoUso({ periodoId, materiaId, docenteId } = {}) {
    const where = {
        ...(periodoId ? { periodoId } : {}),
        ...(materiaId ? { materiaId } : {}),
        ...(docenteId ? { docenteId } : {}),
    };

    return claseMateriaRepositorio.listar(where);
}
