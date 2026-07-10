import { actualizarInstitucion } from "../../../dominio/institucion/validacionInstitucion.js";
import { institucionRepositorio } from "../../../infrastructure/repositories/repositorioInstitucion.js";

export async function actualizarInstitucionCasoUso(id, payload) {
    const data = actualizarInstitucion.parse(payload);

    const actual = await institucionRepositorio.obtenerPorId(id);
    if (!actual) throw new Error("Institución no encontrada");

    if (data.slug && data.slug !== actual.slug) {
        const existe = await institucionRepositorio.obtenerPorSlug(data.slug);
        if (existe) throw new Error("El slug ya está en uso");
    }

    return institucionRepositorio.actualizar(id, data);
}
