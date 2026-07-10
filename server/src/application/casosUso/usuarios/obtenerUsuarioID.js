import { usuarioRepositorio } from "../../../infrastructure/repositories/repositorioUsuario.js";
import { toUsuarioDTO, ensureIdPositivo } from "../../../dominio/usuario/helpersUsuario.js";

export async function obtenerUsuarioPorIdCasoUso({ id }) {
    const uid = ensureIdPositivo(id);
    if (!uid) {
        const e = new Error("id inválido");
        e.status = 400;
        throw e;
    }

    const u = await usuarioRepositorio.obtenerPorId(uid);
    if (!u) {
        const e = new Error("usuario no encontrado");
        e.status = 404;
        throw e;
    }
    return toUsuarioDTO(u);
}
