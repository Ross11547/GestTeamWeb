import { rolRepositorio } from "../../../infrastructure/repositories/repositorioRol.js";

export async function eliminarRolCasoUso(id) {
    const rol = await rolRepositorio.obtenerPorId(id);
    if (!rol) throw new Error("Rol no encontrado");

    const usuarios = await rolRepositorio.contarUsuarios(id);
    if (usuarios > 0) {
        throw new Error("No se puede eliminar el rol porque tiene usuarios asignados");
    }

    return rolRepositorio.eliminar(id);
}
