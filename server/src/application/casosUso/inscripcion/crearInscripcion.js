import { crearInscripcion } from "../../../dominio/inscripcion/validacionInscripcion.js";
import { inscripcionRepositorio } from "../../../infrastructure/repositories/repositorioInscripcion.js";

export async function crearInscripcionCasoUso(payload) {
    const body = crearInscripcion.parse(payload);

    const usuario = await inscripcionRepositorio.existeUsuario(body.usuarioId);
    if (!usuario) throw new Error("El usuario no existe");

    const materia = await inscripcionRepositorio.existeMateria(body.materiaId);
    if (!materia) throw new Error("La materia no existe");

    const yaExiste = await inscripcionRepositorio.existePorUsuarioMateria(body.usuarioId, body.materiaId);
    if (yaExiste) throw new Error("El usuario ya está inscrito en esta materia");

    return inscripcionRepositorio.crear({
        usuarioId: body.usuarioId,
        materiaId: body.materiaId,
    });
}
