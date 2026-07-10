import { proyectoRepositorio } from "../../../infrastructure/repositories/repositorioProyecto.js";

export async function obtenerProyectoCasoUso(id) {
    const proyecto = await proyectoRepositorio.obtenerPorId(id);
    if (!proyecto) throw new Error("Proyecto no encontrado");
    return proyecto;
}
