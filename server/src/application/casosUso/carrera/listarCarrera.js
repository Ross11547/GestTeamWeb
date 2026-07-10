import { listarCarrera } from "../../../dominio/carrera/validacionCarrera.js";
import { carreraRepositorio } from "../../../infrastructure/repositories/repositorioCarrera.js";

export async function listarCarreraCasoUso(query) {
    const q = listarCarrera.parse(query);

    const where = {
        ...(q.idFacultad ? { idFacultad: q.idFacultad } : {}),
        ...(q.q ? { nombre: { contains: q.q, mode: "insensitive" } } : {}),
    };

    return carreraRepositorio.listar(where);
}
