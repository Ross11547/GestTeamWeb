import { ensureIdPositivo } from "../../dominio/horario/helpersHorario.js";
import { listarHorarioCasoUso } from "../../application/casosUso/horario/listarHorario.js";
import { obtenerHorarioCasoUso } from "../../application/casosUso/horario/obtenerHorarioID.js";
import { listarHorarioPorMateriaCasoUso } from "../../application/casosUso/horario/listarHorariosPorMateria.js";
import { crearHorarioCasoUso } from "../../application/casosUso/horario/crearHorario.js";
import { actualizarHorarioCasoUso } from "../../application/casosUso/horario/actualizarHorario.js";
import { eliminarHorarioCasoUso } from "../../application/casosUso/horario/eliminarHorario.js";

export async function listarHorario(req, res, next) {
    try {
        const data = await listarHorarioCasoUso();
        res.json({ data, mensaje: "Horarios obtenidos correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerHorario(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await obtenerHorarioCasoUso(id);
        res.json({ data, mensaje: "Horario obtenido correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function listarHorarioPorMateria(req, res, next) {
    try {
        const materiaId = ensureIdPositivo(req.query.materiaId);
        if (!materiaId) return res.status(400).json({ mensaje: "materiaId requerido" });

        const data = await listarHorarioPorMateriaCasoUso(materiaId);
        res.json({ data, mensaje: "Horarios por materia obtenidos correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearHorario(req, res, next) {
    try {
        const data = await crearHorarioCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Horario creado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarHorario(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await actualizarHorarioCasoUso(id, req.body);
        res.json({ data, mensaje: "Horario actualizado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarHorario(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await eliminarHorarioCasoUso(id);
        res.json({ data, mensaje: "Horario eliminado correctamente" });
    } catch (e) {
        next(e);
    }
}
