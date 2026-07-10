import { crearInstitucion } from "../../../dominio/institucion/validacionInstitucion.js";
import { institucionRepositorio } from "../../../infrastructure/repositories/repositorioInstitucion.js";

export async function crearInstitucionCasoUso(payload) {
    const data = crearInstitucion.parse(payload);

    const existente = await institucionRepositorio.obtenerPorSlug(data.slug);
    if (existente) {
        throw new Error("Ya existe una institución con ese slug");
    }

    return institucionRepositorio.crear({
        ...data,
        activo: data.activo ?? true,
    });
}
