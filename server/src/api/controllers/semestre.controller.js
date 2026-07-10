import { listarSemestreCasoUso } from "../../application/casosUso/semestre/listarSemestre.js";
import { listarSemestrePorCarreraCasoUso } from "../../application/casosUso/semestre/listarSemestrePorCarrera.js";
import { obtenerSemestreCasoUso } from "../../application/casosUso/semestre/obtenerSemestreID.js";
import { crearSemestreCasoUso } from "../../application/casosUso/semestre/crearSemestre.js";
import { actualizarSemestreCasoUso } from "../../application/casosUso/semestre/actualizarSemestre.js";
import { eliminarSemestreCasoUso } from "../../application/casosUso/semestre/eliminarSemestre.js";

export async function listarSemestre(req, res, next) {
    try {
        const data = await listarSemestreCasoUso(req.query);
        res.json({ data, mensaje: "Semestres listados correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function listarSemestrePorCarrera(req, res, next) {
    try {
        const carreraId = Number(req.query.carreraId);
        const data = await listarSemestrePorCarreraCasoUso(carreraId);
        res.json({ data, mensaje: "Semestres por carrera obtenidos correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerSemestre(req, res, next) {
    try {
        const data = await obtenerSemestreCasoUso(Number(req.params.id));
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

export async function crearSemestre(req, res, next) {
    try {
        const data = await crearSemestreCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Semestre creado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarSemestre(req, res, next) {
    try {
        const data = await actualizarSemestreCasoUso(Number(req.params.id), req.body);
        res.json({ data, mensaje: "Semestre actualizado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarSemestre(req, res, next) {
    try {
        const data = await eliminarSemestreCasoUso(Number(req.params.id));
        res.json({ data, mensaje: "Semestre eliminado correctamente" });
    } catch (e) {
        next(e);
    }
}
