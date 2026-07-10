import { docenteMateriaRepositorio } from "../../../infrastructure/repositories/repositorioDocenteMateria.js";

export async function eliminarDocenteMateriaCasoUso(id) {
    const registro = await docenteMateriaRepositorio.obtenerPorId(id);
    if (!registro) throw new Error("Asignación docente materia no encontrada");
    return docenteMateriaRepositorio.eliminar(id);
}
