import { listarMateria } from "../../../dominio/materia/validacionMateria.js";
import { materiaRepositorio } from "../../../infrastructure/repositories/repositorioMateria.js";

export async function listarMateriaCasoUso(query) {
    const q = listarMateria.parse(query);

    if (q.idCarrera !== undefined && (!Number.isInteger(q.idCarrera) || q.idCarrera <= 0)) {
        throw new Error("idCarrera inválido");
    }
    if (q.semestreId !== undefined && (!Number.isInteger(q.semestreId) || q.semestreId <= 0)) {
        throw new Error("semestreId inválido");
    }

    const where = {
        ...(q.idCarrera ? { idCarrera: q.idCarrera } : {}),
        ...(q.semestreId ? { semestreId: q.semestreId } : {}),
        ...(q.q
            ? {
                OR: [
                    { nombre: { contains: q.q, mode: "insensitive" } },
                    { codigo: { contains: q.q, mode: "insensitive" } },
                    { carrera: { nombre: { contains: q.q, mode: "insensitive" } } },
                ],
            }
            : {}),
    };

    return materiaRepositorio.listar(where);
}
