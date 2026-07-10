import { actualizarInscripcionMateria } from "../../../dominio/inscripcionMateria/validacionInscripcionMateria.js";
import { inscripcionMateriaRepositorio } from "../../../infrastructure/repositories/repositorioInscripcionMateria.js";

export async function actualizarInscripcionMateriaCasoUso(id, payload) {
    const actual = await inscripcionMateriaRepositorio.obtenerPorId(id);
    if (!actual) throw new Error("Inscripción de materia no encontrada");

    const body = actualizarInscripcionMateria.parse(payload);

    const data = {};

    if (body.usuarioId !== undefined) {
        const usuario = await inscripcionMateriaRepositorio.existeUsuario(body.usuarioId);
        if (!usuario) throw new Error("El usuario no existe");
        data.usuarioId = body.usuarioId;
    }

    if (body.periodoId !== undefined) {
        const periodo = await inscripcionMateriaRepositorio.existePeriodo(body.periodoId);
        if (!periodo) throw new Error("El periodo académico no existe");
        data.periodoId = body.periodoId;
    }

    if (body.materiaId !== undefined) {
        const materia = await inscripcionMateriaRepositorio.existeMateria(body.materiaId);
        if (!materia) throw new Error("La materia no existe");
        data.materiaId = body.materiaId;
    }

    if (body.claseId !== undefined) {
        if (body.claseId === null) {
            data.claseId = null;
        } else {
            const clase = await inscripcionMateriaRepositorio.obtenerClase(body.claseId);
            if (!clase) throw new Error("La clase no existe");
            data.claseId = body.claseId;
        }
    }

    if (Object.keys(data).length === 0) return actual;

    const usuarioIdFinal = data.usuarioId ?? actual.usuarioId;
    const periodoIdFinal = data.periodoId ?? actual.periodoId;
    const materiaIdFinal = data.materiaId ?? actual.materiaId;

    const dup = await inscripcionMateriaRepositorio.existePorUsuarioPeriodoMateria(
        usuarioIdFinal,
        periodoIdFinal,
        materiaIdFinal,
        id
    );
    if (dup) throw new Error("Ya existe una inscripción para ese usuario, periodo y materia");

    const claseIdFinal =
        data.claseId !== undefined ? data.claseId : (actual.clase ? actual.clase.id : null);

    if (claseIdFinal) {
        const clase = await inscripcionMateriaRepositorio.obtenerClase(claseIdFinal);
        if (!clase) throw new Error("La clase no existe");
        if (clase.periodoId !== periodoIdFinal) throw new Error("La clase no pertenece al periodo indicado");
        if (clase.materiaId !== materiaIdFinal) throw new Error("La clase no corresponde a la materia indicada");
    }

    return inscripcionMateriaRepositorio.actualizar(id, data);
}
