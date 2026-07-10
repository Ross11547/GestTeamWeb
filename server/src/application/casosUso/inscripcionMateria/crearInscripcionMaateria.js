import { crearInscripcionMateria } from "../../../dominio/inscripcionMateria/validacionInscripcionMateria.js";
import { inscripcionMateriaRepositorio } from "../../../infrastructure/repositories/repositorioInscripcionMateria.js";

export async function crearInscripcionMateriaCasoUso(payload) {
    const body = crearInscripcionMateria.parse(payload);

    const usuario = await inscripcionMateriaRepositorio.existeUsuario(body.usuarioId);
    if (!usuario) throw new Error("El usuario no existe");

    const periodo = await inscripcionMateriaRepositorio.existePeriodo(body.periodoId);
    if (!periodo) throw new Error("El periodo académico no existe");

    const materia = await inscripcionMateriaRepositorio.existeMateria(body.materiaId);
    if (!materia) throw new Error("La materia no existe");

    const yaExiste = await inscripcionMateriaRepositorio.existePorUsuarioPeriodoMateria(
        body.usuarioId,
        body.periodoId,
        body.materiaId
    );
    if (yaExiste) throw new Error("El usuario ya está inscrito en esta materia para este periodo");

    if (body.claseId !== undefined) {
        const clase = await inscripcionMateriaRepositorio.obtenerClase(body.claseId);
        if (!clase) throw new Error("La clase no existe");
        if (clase.periodoId !== body.periodoId) throw new Error("La clase no pertenece al periodo indicado");
        if (clase.materiaId !== body.materiaId) throw new Error("La clase no corresponde a la materia indicada");
    }

    return inscripcionMateriaRepositorio.crear({
        usuarioId: body.usuarioId,
        periodoId: body.periodoId,
        materiaId: body.materiaId,
        claseId: body.claseId ?? null,
    });
}
