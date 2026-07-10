import { usuarioRepositorio } from "../../../infrastructure/repositories/repositorioUsuario.js";
import { toUsuarioDTO } from "../../../dominio/usuario/helpersUsuario.js";

export async function listarUsuariosCasoUso() {
    const rows = await usuarioRepositorio.listar();
    return rows.map(toUsuarioDTO);
}
