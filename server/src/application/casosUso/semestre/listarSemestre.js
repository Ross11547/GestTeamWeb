import { listarSemestre } from "../../../dominio/semestre/validacionSemestre.js";
import { semestreRepositorio } from "../../../infrastructure/repositories/repositorioSemestre.js";

export async function listarSemestreCasoUso(query) {
    const q = listarSemestre.parse(query);
    const where = {
        ...(q.carreraId ? { carreraId: q.carreraId } : {}),
        ...(q.q ? { etiqueta: { contains: q.q, mode: "insensitive" } } : {}),
    };

    return semestreRepositorio.listar(where);
}
