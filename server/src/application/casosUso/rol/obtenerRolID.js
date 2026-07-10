import { rolRepositorio } from "../../../infrastructure/repositories/repositorioRol.js";

export async function obtenerRolCasoUso(id) {
    const rol = await rolRepositorio.obtenerPorId(id);
    if (!rol) throw new Error("Rol no encontrado");
    return rol;
}
