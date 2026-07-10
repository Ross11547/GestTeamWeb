import { institucionRepositorio } from "../../../infrastructure/repositories/repositorioInstitucion.js";

export async function eliminarInstitucionCasoUso(id) {
    const actual = await institucionRepositorio.obtenerPorId(id);
    if (!actual) throw new Error("Institución no encontrada");
    return institucionRepositorio.eliminar(id);
}
