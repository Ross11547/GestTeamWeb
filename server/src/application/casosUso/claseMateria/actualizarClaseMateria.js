import { claseMateriaRepositorio } from "../../../infrastructure/repositories/repositorioClaseMateria.js";
import { actualizarClaseMateria } from "../../../dominio/claseMateria/validacionClaseMateria.js";
import { ensureIdPositivo, limpiarTexto, normalizarParalelo } from "../../../dominio/claseMateria/helpersClaseMateria.js";

export async function actualizarClaseMateriaCasoUso({ id, data }) {
    const cid = ensureIdPositivo(id);
    if (!cid) {
        const e = new Error("id inválido");
        e.status = 400;
        throw e;
    }

    const actual = await claseMateriaRepositorio.obtenerPorId(cid);
    if (!actual) {
        const e = new Error("Clase no encontrada");
        e.status = 404;
        throw e;
    }

    const body = actualizarClaseMateria.parse(data || {});
    const update = {};

    if (body.periodoId !== undefined) {
        const p = await claseMateriaRepositorio.existePeriodo(Number(body.periodoId));
        if (!p) {
            const e = new Error("El periodo académico indicado no existe");
            e.status = 400;
            throw e;
        }
        update.periodoId = Number(body.periodoId);
    }

    if (body.materiaId !== undefined) {
        const m = await claseMateriaRepositorio.existeMateria(Number(body.materiaId));
        if (!m) {
            const e = new Error("La materia indicada no existe");
            e.status = 400;
            throw e;
        }
        update.materiaId = Number(body.materiaId);
    }

    if (body.docenteId !== undefined) {
        if (body.docenteId == null) {
            update.docenteId = null;
        } else {
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
            update.docenteId = Number(body.docenteId);
        }
    }

    if (body.paralelo !== undefined) update.paralelo = normalizarParalelo(body.paralelo);
    if (body.aula !== undefined) update.aula = limpiarTexto(body.aula);

    const periodoIdFinal = update.periodoId ?? actual.periodoId;
    const materiaIdFinal = update.materiaId ?? actual.materiaId;
    const paraleloFinal = (update.paralelo !== undefined) ? update.paralelo : (actual.paralelo ?? null);

    const dup = await claseMateriaRepositorio.existeClaseSimilar({
        periodoId: periodoIdFinal,
        materiaId: materiaIdFinal,
        paralelo: paraleloFinal,
        idIgnorar: cid,
    });
    if (dup) {
        const e = new Error("Ya existe una clase para ese periodo y materia con el mismo paralelo");
        e.status = 409;
        throw e;
    }

    return claseMateriaRepositorio.actualizar(cid, update);
}
