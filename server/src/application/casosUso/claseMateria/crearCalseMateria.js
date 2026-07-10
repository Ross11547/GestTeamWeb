import { claseMateriaRepositorio } from "../../../infrastructure/repositories/repositorioClaseMateria.js";
import { crearClaseMateria } from "../../../dominio/claseMateria/validacionClaseMateria.js";
import { limpiarTexto, normalizarParalelo } from "../../../dominio/claseMateria/helpersClaseMateria.js";

export async function crearClaseMateriaCasoUso(payload) {
    const body = crearClaseMateria.parse(payload);

    const periodo = await claseMateriaRepositorio.existePeriodo(Number(body.periodoId));
    if (!periodo) {
        const e = new Error("El periodo académico indicado no existe");
        e.status = 400;
        throw e;
    }

    const materia = await claseMateriaRepositorio.existeMateria(Number(body.materiaId));
    if (!materia) {
        const e = new Error("La materia indicada no existe");
        e.status = 400;
        throw e;
    }

    let docenteId = null;
    if (body.docenteId != null) {
        const u = await claseMateriaRepositorio.existeUsuario(Number(body.docenteId));
        if (!u) {
            const e = new Error("El docente indicado no existe");
            e.status = 400;
            throw e;
        }
        if (!u.activo) {
            const e = new Error("El docente indicado está inactivo");
            e.status = 400;
            throw e;
        }
        docenteId = Number(body.docenteId);
    }

    const paralelo = normalizarParalelo(body.paralelo);
    const aula = limpiarTexto(body.aula);

    // Anti-duplicado recomendado
    const dup = await claseMateriaRepositorio.existeClaseSimilar({
        periodoId: Number(body.periodoId),
        materiaId: Number(body.materiaId),
        paralelo,
    });
    if (dup) {
        const e = new Error("Ya existe una clase para ese periodo y materia con el mismo paralelo");
        e.status = 409;
        throw e;
    }

    return claseMateriaRepositorio.crear({
        periodoId: Number(body.periodoId),
        materiaId: Number(body.materiaId),
        docenteId,
        paralelo,
        aula,
    });
}
