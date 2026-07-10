import { inscripcionRepositorio } from "../../../infrastructure/repositories/repositorioInscripcion.js";

export async function obtenerInscripcionCasoUso(id) {
    const inscripcion = await inscripcionRepositorio.obtenerPorId(id);
    if (!inscripcion) throw new Error("Inscripción no encontrada");
    return inscripcion;
}
