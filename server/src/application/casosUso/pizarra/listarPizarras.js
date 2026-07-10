import { listarPizarras } from "../../../dominio/pizarra/validacionesPizarra.js";
import { ErrorValidacion } from "../../../dominio/pizarra/erroresPizarra.js";
import { pizarraRepositorio } from "../../../infrastructure/repositories/repositoriosPizarras.js";

export async function listarPizarrasCasoUso(query) {
    const parsed = listarPizarras.safeParse(query);
    if (!parsed.success) throw new ErrorValidacion("Parámetros inválidos", parsed.error.flatten());

    const { proyectoId, equipoId, periodoId } = parsed.data;

    const where = {
        ...(proyectoId ? { proyectoId } : {}),
        ...(equipoId ? { equipoId } : {}),
        ...(periodoId ? { periodoId } : {}),
    };

    return pizarraRepositorio.listar(where);
}
