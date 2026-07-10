import { crearDocenteMateria } from "../../../dominio/docenteMateria/validacionDocenteMateria.js";
import { docenteMateriaRepositorio } from "../../../infrastructure/repositories/repositorioDocenteMateria.js";

export async function crearDocenteMateriaCasoUso(payload) {
    const body = crearDocenteMateria.parse(payload);

    const usuario = await docenteMateriaRepositorio.existeUsuario(body.usuarioId);
    if (!usuario) throw new Error("El usuario no existe");

    const materia = await docenteMateriaRepositorio.existeMateria(body.materiaId);
    if (!materia) throw new Error("La materia no existe");

    const yaExiste = await docenteMateriaRepositorio.existePorUsuarioMateria(body.usuarioId, body.materiaId);
    if (yaExiste) throw new Error("El docente ya está asignado a esta materia");

    return docenteMateriaRepositorio.crear({
        usuarioId: body.usuarioId,
        materiaId: body.materiaId,
    });
}
