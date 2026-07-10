import { carreraRepositorio } from "../../../infrastructure/repositories/repositorioCarrera.js";

export async function obtenerCarreraCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const item = await carreraRepositorio.obtenerPorId(id);
    if (!item) throw new Error("Carrera no encontrada");
    return item;
}
