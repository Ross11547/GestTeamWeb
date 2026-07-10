import { periodoAcademicoRepositorio } from "../../../infrastructure/repositories/repositorioPeriodoAcademico.js";

export async function obtenerPeriodoAcademicoCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const item = await periodoAcademicoRepositorio.obtenerPorId(id);
    if (!item) throw new Error("Periodo académico no encontrado");
    return item;
}
