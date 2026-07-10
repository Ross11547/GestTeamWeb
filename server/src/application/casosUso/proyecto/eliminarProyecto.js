import { proyectoRepositorio } from "../../../infrastructure/repositories/repositorioProyecto.js";

export async function eliminarProyectoCasoUso(id) {
    const proyecto = await proyectoRepositorio.obtenerPorId(id);
    if (!proyecto) throw new Error("Proyecto no encontrado");

    return proyectoRepositorio.eliminar(id);
}
