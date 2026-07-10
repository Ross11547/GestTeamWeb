import { crearPeriodoAcademicoCasoUso } from "../../application/casosUso/periodoAcademico/crearPeriosoAdemico.js";
import { listarPeriodoAcademicoCasoUso } from "../../application/casosUso/periodoAcademico/listarPeriodoAcademico.js";
import { obtenerPeriodoAcademicoCasoUso } from "../../application/casosUso/periodoAcademico/obtenerPeriodoAdemico.js";
import { actualizarPeriodoAcademicoCasoUso } from "../../application/casosUso/periodoAcademico/actualizarPeriodoAcdemico.js";
import { eliminarPeriodoAcademicoCasoUso } from "../../application/casosUso/periodoAcademico/eliminarPeriodoAcademico.js";
import { activarPeriodoAcademicoCasoUso } from "../../application/casosUso/periodoAcademico/activarPeriodoAcademico.js";

export async function crearPeriodoAcademico(req, res, next) {
    try {
        const data = await crearPeriodoAcademicoCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Periodo académico creado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function listarPeriodoAcademico(req, res, next) {
    try {
        const data = await listarPeriodoAcademicoCasoUso(req.query);
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

export async function obtenerPeriodoAcademico(req, res, next) {
    try {
        const data = await obtenerPeriodoAcademicoCasoUso(Number(req.params.id));
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

export async function actualizarPeriodoAcademico(req, res, next) {
    try {
        const data = await actualizarPeriodoAcademicoCasoUso(Number(req.params.id), req.body);
        res.json({ data, mensaje: "Periodo académico actualizado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarPeriodoAcademico(req, res, next) {
    try {
        await eliminarPeriodoAcademicoCasoUso(Number(req.params.id));
        res.json({ mensaje: "Periodo académico eliminado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function activarPeriodoAcademico(req, res, next) {
    try {
        const data = await activarPeriodoAcademicoCasoUso(Number(req.params.id));
        res.json({ data, mensaje: "Periodo académico activado correctamente" });
    } catch (e) {
        next(e);
    }
}
