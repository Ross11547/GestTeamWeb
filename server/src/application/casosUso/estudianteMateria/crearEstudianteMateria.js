import { crearEstudianteMateria } from "../../../dominio/estudianteMateria/validacionEstudianteMateria.js";
import { estudianteMateriaRepositorio } from "../../../infrastructure/repositories/repositorioEstudianteMateria.js";

export async function crearEstudianteMateriaCasoUso(payload) {
    const body = crearEstudianteMateria.parse(payload);

    const usuario = await estudianteMateriaRepositorio.existeUsuario(body.usuarioId);
    if (!usuario) throw new Error("El usuario no existe");

    const materia = await estudianteMateriaRepositorio.existeMateria(body.materiaId);
    if (!materia) throw new Error("La materia no existe");

    const yaExiste = await estudianteMateriaRepositorio.existePorUsuarioMateria(body.usuarioId, body.materiaId);
    if (yaExiste) throw new Error("El estudiante ya está asignado a esta materia");

    return estudianteMateriaRepositorio.crear({
        usuarioId: body.usuarioId,
        materiaId: body.materiaId,
    });
}
