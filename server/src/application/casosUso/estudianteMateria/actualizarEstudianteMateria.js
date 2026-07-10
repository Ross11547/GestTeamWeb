import { actualizarEstudianteMateria } from "../../../dominio/estudianteMateria/validacionEstudianteMateria.js";
import { estudianteMateriaRepositorio } from "../../../infrastructure/repositories/repositorioEstudianteMateria.js";

export async function actualizarEstudianteMateriaCasoUso(id, payload) {
    const actual = await estudianteMateriaRepositorio.obtenerPorId(id);
    if (!actual) throw new Error("Asignación estudiante materia no encontrada");

    const body = actualizarEstudianteMateria.parse(payload);

    const data = {};

    if (body.usuarioId !== undefined) {
        const usuario = await estudianteMateriaRepositorio.existeUsuario(body.usuarioId);
        if (!usuario) throw new Error("El usuario no existe");
        data.usuarioId = body.usuarioId;
    }

    if (body.materiaId !== undefined) {
        const materia = await estudianteMateriaRepositorio.existeMateria(body.materiaId);
        if (!materia) throw new Error("La materia no existe");
        data.materiaId = body.materiaId;
    }

    if (Object.keys(data).length === 0) return actual;

    const usuarioIdFinal = data.usuarioId ?? actual.usuario.id;
    const materiaIdFinal = data.materiaId ?? actual.materia.id;

    const dup = await estudianteMateriaRepositorio.existePorUsuarioMateria(usuarioIdFinal, materiaIdFinal, id);
    if (dup) throw new Error("Ya existe una asignación para ese estudiante y materia");

    return estudianteMateriaRepositorio.actualizar(id, data);
}
