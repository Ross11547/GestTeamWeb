import { semestreRepositorio } from "../../../infrastructure/repositories/repositorioSemestre.js";

export async function obtenerSemestreCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const item = await semestreRepositorio.obtenerPorId(id);
    if (!item) throw new Error("Semestre no encontrado");
    return item;
}
