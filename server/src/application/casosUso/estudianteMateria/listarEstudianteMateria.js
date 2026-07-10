import { estudianteMateriaRepositorio } from "../../../infrastructure/repositories/repositorioEstudianteMateria.js";

export async function listarEstudianteMateriaCasoUso() {
    return estudianteMateriaRepositorio.listar();
}
