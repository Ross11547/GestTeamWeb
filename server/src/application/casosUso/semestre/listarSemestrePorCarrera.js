import { semestreRepositorio } from "../../../infrastructure/repositories/repositorioSemestre.js";

export async function listarSemestrePorCarreraCasoUso(carreraId) {
    if (!Number.isInteger(carreraId) || carreraId <= 0) throw new Error("carreraId válido es requerido");
    return semestreRepositorio.listarPorCarrera(carreraId);
}
