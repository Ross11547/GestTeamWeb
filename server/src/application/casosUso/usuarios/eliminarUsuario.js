import { usuarioRepositorio } from "../../../infrastructure/repositories/repositorioUsuario.js";
import { ensureIdPositivo } from "../../../dominio/usuario/helpersUsuario.js";

export async function eliminarUsuarioCasoUso({ id }) {
    const uid = ensureIdPositivo(id);
    if (!uid) {
        const e = new Error("id inválido");
        e.status = 400;
        throw e;
    }

    const actual = await usuarioRepositorio.obtenerPorId(uid);
    if (!actual) {
        const e = new Error("usuario no encontrado");
        e.status = 404;
        throw e;
    }

    // Si luego necesito hacer un borrado lógico, aquí debo cambiar a update {activo:false}
    return usuarioRepositorio.eliminar(uid);
}
