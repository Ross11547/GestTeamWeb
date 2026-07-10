import { inscripcionRepositorio } from "../../../infrastructure/repositories/repositorioInscripcion.js";

export async function eliminarInscripcionCasoUso(id) {
    const inscripcion = await inscripcionRepositorio.obtenerPorId(id);
    if (!inscripcion) throw new Error("Inscripción no encontrada");

    return inscripcionRepositorio.eliminar(id);
}
