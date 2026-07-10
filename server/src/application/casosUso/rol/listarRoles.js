import { rolRepositorio } from "../../../infrastructure/repositories/repositorioRol.js";

export async function listarRolesCasoUso() {
    return rolRepositorio.listar();
}
