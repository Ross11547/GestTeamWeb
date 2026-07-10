import { crearRol } from "../../../dominio/rol/validacionRol.js";
import { normalizarNombreRol } from "../../../dominio/rol/helpersRol.js";
import { rolRepositorio } from "../../../infrastructure/repositories/repositorioRol.js";

export async function crearRolCasoUso(payload) {
    const body = crearRol.parse(payload);
    const nombre = normalizarNombreRol(body.nombre);

    const yaExiste = await rolRepositorio.existePorNombre(nombre);
    if (yaExiste) throw new Error("El rol ya existe");

    return rolRepositorio.crear({ nombre });
}
