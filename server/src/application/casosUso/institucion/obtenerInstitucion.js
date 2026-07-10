import { institucionRepositorio } from "../../../infrastructure/repositories/repositorioInstitucion.js";

export async function obtenerInstitucionCasoUso(id) {
    const institucion = await institucionRepositorio.obtenerPorId(id);
    if (!institucion) throw new Error("Institución no encontrada");
    return institucion;
}
