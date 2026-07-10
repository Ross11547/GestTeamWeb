import { ensureIdPositivo } from "../../dominio/docenteMateria/helpersDocenteMateria.js";
import { listarDocenteMateriaCasoUso } from "../../application/casosUso/docenteMateria/listarDocenteMateria.js";
import { obtenerDocenteMateriaCasoUso } from "../../application/casosUso/docenteMateria/obtenerDocenteMateriaID.js";
import { crearDocenteMateriaCasoUso } from "../../application/casosUso/docenteMateria/crearDocenteMateria.js";
import { actualizarDocenteMateriaCasoUso } from "../../application/casosUso/docenteMateria/actualizarDocenteMateria.js";
import { eliminarDocenteMateriaCasoUso } from "../../application/casosUso/docenteMateria/eliminarDocenteMateria.js";

export async function listarDocenteMateria(req, res, next) {
    try {
        const data = await listarDocenteMateriaCasoUso();
        res.json({ data, mensaje: "Asignaciones docente materia obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerDocenteMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await obtenerDocenteMateriaCasoUso(id);
        res.json({ data, mensaje: "Asignación docente materia obtenida correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearDocenteMateria(req, res, next) {
    try {
        const data = await crearDocenteMateriaCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Asignación docente materia creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarDocenteMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await actualizarDocenteMateriaCasoUso(id, req.body);
        res.json({ data, mensaje: "Asignación docente materia actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarDocenteMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await eliminarDocenteMateriaCasoUso(id);
        res.json({ data, mensaje: "Asignación docente materia eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
