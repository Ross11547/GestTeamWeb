import { horarioRepositorio } from "../../../infrastructure/repositories/repositorioHorario.js";

export async function listarHorarioCasoUso() {
    return horarioRepositorio.listar();
}
