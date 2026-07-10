import { inscripcionMateriaRepositorio } from "../../../infrastructure/repositories/repositorioInscripcionMateria.js";

export async function eliminarInscripcionMateriaCasoUso(id) {
    const inscripcion = await inscripcionMateriaRepositorio.obtenerPorId(id);
    if (!inscripcion) throw new Error("Inscripción de materia no encontrada");
    return inscripcionMateriaRepositorio.eliminar(id);
}
