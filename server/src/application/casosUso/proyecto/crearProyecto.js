import { crearProyecto } from "../../../dominio/proyecto/validacionProyecto.js";
import { normalizarTexto } from "../../../dominio/proyecto/helpersProyecto.js";
import { proyectoRepositorio } from "../../../infrastructure/repositories/repositorioProyecto.js";

export async function crearProyectoCasoUso(payload) {
    const body = crearProyecto.parse(payload);

    const titulo = normalizarTexto(body.titulo);
    const descripcion = body.descripcion !== undefined ? normalizarTexto(body.descripcion) : "";

    return proyectoRepositorio.crear({
        titulo,
        descripcion,
        codigoMateria: body.codigoMateria ? normalizarTexto(body.codigoMateria) : null,
        tipoGrupo: body.tipoGrupo ?? undefined, // Prisma pondrá el default si no mandas nada
        estado: body.estado ?? undefined,       // Prisma pondrá el default si no mandas nada
        repoUrl: body.repoUrl ? body.repoUrl.trim() : null,
    });
}
