import { ensureIdPositivo } from "../../dominio/inscripcionMateria/helpersInscripcionMateria.js";
import { listarInscripcionMateriaCasoUso } from "../../application/casosUso/inscripcionMateria/listarInscripcionMateria.js";
import { obtenerInscripcionMateriaCasoUso } from "../../application/casosUso/inscripcionMateria/obtenerInscripcionMateriaID.js";
import { crearInscripcionMateriaCasoUso } from "../../application/casosUso/inscripcionMateria/crearInscripcionMaateria.js";
import { actualizarInscripcionMateriaCasoUso } from "../../application/casosUso/inscripcionMateria/actualizarInscripcionMateria.js";
import { eliminarInscripcionMateriaCasoUso } from "../../application/casosUso/inscripcionMateria/eliminarInscripcionMateria.js";

export async function listarInscripcionMateria(req, res, next) {
    try {
        const data = await listarInscripcionMateriaCasoUso();
        res.json({ data, mensaje: "Inscripciones de materia obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerInscripcionMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await obtenerInscripcionMateriaCasoUso(id);
        res.json({ data, mensaje: "Inscripción de materia obtenida correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearInscripcionMateria(req, res, next) {
    try {
        const data = await crearInscripcionMateriaCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Inscripción de materia creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarInscripcionMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await actualizarInscripcionMateriaCasoUso(id, req.body);
        res.json({ data, mensaje: "Inscripción de materia actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarInscripcionMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await eliminarInscripcionMateriaCasoUso(id);
        res.json({ data, mensaje: "Inscripción de materia eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
