import { horarioRepositorio } from "../../../infrastructure/repositories/repositorioHorario.js";

export async function obtenerHorarioCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("ID inválido");

    const item = await horarioRepositorio.obtenerPorId(id);
    if (!item) throw new Error("Horario no encontrado");
    return item;
}
