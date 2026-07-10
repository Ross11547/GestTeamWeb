import { facultadRepositorio } from "../../../infrastructure/repositories/repositorioFacultad.js";

export async function obtenerFacultadCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const item = await facultadRepositorio.obtenerPorId(id);
    if (!item) throw new Error("Facultad no encontrada");
    return item;
}
