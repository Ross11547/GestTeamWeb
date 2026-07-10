import { listarPeriodoAcademico } from "../../../dominio/periodoAcademico/vlidacionPeriodoAcademico.js";
import { periodoAcademicoRepositorio } from "../../../infrastructure/repositories/repositorioPeriodoAcademico.js";

export async function listarPeriodoAcademicoCasoUso(query) {
    const q = listarPeriodoAcademico.parse(query);

    const where = {
        ...(q.institucionId ? { institucionId: q.institucionId } : {}),
        ...(q.activo !== undefined ? { activo: q.activo } : {}),
    };

    return periodoAcademicoRepositorio.listar(where);
}
