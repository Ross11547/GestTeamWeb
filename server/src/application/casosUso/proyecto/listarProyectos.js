import { proyectoRepositorio } from "../../../infrastructure/repositories/repositorioProyecto.js";

export async function listarProyectosCasoUso() {
    return proyectoRepositorio.listar();
}
