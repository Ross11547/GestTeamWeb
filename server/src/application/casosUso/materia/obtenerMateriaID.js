import { materiaRepositorio } from "../../../infrastructure/repositories/repositorioMateria.js";

export async function obtenerMateriaCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("ID inválido");

    const item = await materiaRepositorio.obtenerPorId(id);
    if (!item) throw new Error("Materia no encontrada");
    return item;
}
