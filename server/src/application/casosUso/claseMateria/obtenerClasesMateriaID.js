import { claseMateriaRepositorio } from "../../../infrastructure/repositories/repositorioClaseMateria.js";
import { ensureIdPositivo } from "../../../dominio/claseMateria/helpersClaseMateria.js";

export async function obtenerClaseMateriaPorIdCasoUso({ id }) {
    const cid = ensureIdPositivo(id);
    if (!cid) {
        const e = new Error("id inválido");
        e.status = 400;
        throw e;
    }

    const item = await claseMateriaRepositorio.obtenerPorId(cid);
    if (!item) {
        const e = new Error("Clase no encontrada");
        e.status = 404;
        throw e;
    }

    return item;
}
