import { estudianteMateriaRepositorio } from "../../../infrastructure/repositories/repositorioEstudianteMateria.js";

export async function eliminarEstudianteMateriaCasoUso(id) {
    const registro = await estudianteMateriaRepositorio.obtenerPorId(id);
    if (!registro) throw new Error("Asignación estudiante materia no encontrada");
    return estudianteMateriaRepositorio.eliminar(id);
}
