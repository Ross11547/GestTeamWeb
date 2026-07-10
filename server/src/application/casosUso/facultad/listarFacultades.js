import { listarFacultad } from "../../../dominio/facultad/validacionFacultad.js";
import { facultadRepositorio } from "../../../infrastructure/repositories/repositorioFacultad.js";

export async function listarFacultadCasoUso(query) {
    const q = listarFacultad.parse(query);

    const where = {
        ...(q.institucionId ? { institucionId: q.institucionId } : {}),
        ...(q.q
            ? { nombre: { contains: q.q, mode: "insensitive" } }
            : {}),
    };

    return facultadRepositorio.listar(where);
}
