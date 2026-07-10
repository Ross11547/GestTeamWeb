import { horarioRepositorio } from "../../../infrastructure/repositories/repositorioHorario.js";

export async function listarHorarioPorMateriaCasoUso(materiaId) {
    if (!Number.isInteger(materiaId) || materiaId <= 0) throw new Error("materiaId requerido");
    return horarioRepositorio.listarPorMateria(materiaId);
}
