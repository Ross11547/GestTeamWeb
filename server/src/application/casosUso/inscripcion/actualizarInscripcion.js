import { actualizarInscripcion } from "../../../dominio/inscripcion/validacionInscripcion.js";
import { inscripcionRepositorio } from "../../../infrastructure/repositories/repositorioInscripcion.js";

export async function actualizarInscripcionCasoUso(id, payload) {
    const actual = await inscripcionRepositorio.obtenerPorId(id);
    if (!actual) throw new Error("Inscripción no encontrada");

    const body = actualizarInscripcion.parse(payload);

    const data = {};

    if (body.usuarioId !== undefined) {
        const usuario = await inscripcionRepositorio.existeUsuario(body.usuarioId);
        if (!usuario) throw new Error("El usuario no existe");
        data.usuarioId = body.usuarioId;
    }

    if (body.materiaId !== undefined) {
        const materia = await inscripcionRepositorio.existeMateria(body.materiaId);
        if (!materia) throw new Error("La materia no existe");
        data.materiaId = body.materiaId;
    }

    if (Object.keys(data).length === 0) return actual;

    const usuarioIdFinal = data.usuarioId ?? actual.usuarioId;
    const materiaIdFinal = data.materiaId ?? actual.materiaId;

    const dup = await inscripcionRepositorio.existePorUsuarioMateria(usuarioIdFinal, materiaIdFinal, id);
    if (dup) throw new Error("Ya existe una inscripción para ese usuario y materia");

    return inscripcionRepositorio.actualizar(id, data);
}
