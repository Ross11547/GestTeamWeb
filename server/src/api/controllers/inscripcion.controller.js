import { ensureIdPositivo } from "../../dominio/inscripcion/helpersInscripcion.js";
import { listarInscripcionesCasoUso } from "../../application/casosUso/inscripcion/listarInscripcion.js";
import { obtenerInscripcionCasoUso } from "../../application/casosUso/inscripcion/obtenerInscripcionID.js";
import { crearInscripcionCasoUso } from "../../application/casosUso/inscripcion/crearInscripcion.js";
import { actualizarInscripcionCasoUso } from "../../application/casosUso/inscripcion/actualizarInscripcion.js";
import { eliminarInscripcionCasoUso } from "../../application/casosUso/inscripcion/eliminarInscripcion.js";

export async function listarInscripciones(req, res, next) {
    try {
        const data = await listarInscripcionesCasoUso();
        res.json({ data, mensaje: "Inscripciones obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerInscripcion(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await obtenerInscripcionCasoUso(id);
        res.json({ data, mensaje: "Inscripción obtenida correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearInscripcion(req, res, next) {
    try {
        const data = await crearInscripcionCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Inscripción creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarInscripcion(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await actualizarInscripcionCasoUso(id, req.body);
        res.json({ data, mensaje: "Inscripción actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarInscripcion(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await eliminarInscripcionCasoUso(id);
        res.json({ data, mensaje: "Inscripción eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
