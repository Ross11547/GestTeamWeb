import { ensureIdPositivo } from "../../dominio/estudianteMateria/helpersEstudianteMateria.js";
import { listarEstudianteMateriaCasoUso } from "../../application/casosUso/estudianteMateria/listarEstudianteMateria.js";
import { obtenerEstudianteMateriaCasoUso } from "../../application/casosUso/estudianteMateria/obtenerEstudianteMateriaID.js";
import { crearEstudianteMateriaCasoUso } from "../../application/casosUso/estudianteMateria/crearEstudianteMateria.js";
import { actualizarEstudianteMateriaCasoUso } from "../../application/casosUso/estudianteMateria/actualizarEstudianteMateria.js";
import { eliminarEstudianteMateriaCasoUso } from "../../application/casosUso/estudianteMateria/eliminarEstudianteMateria.js";

export async function listarEstudianteMateria(req, res, next) {
    try {
        const data = await listarEstudianteMateriaCasoUso();
        res.json({ data, mensaje: "Asignaciones estudiante materia obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerEstudianteMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await obtenerEstudianteMateriaCasoUso(id);
        res.json({ data, mensaje: "Asignación estudiante materia obtenida correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearEstudianteMateria(req, res, next) {
    try {
        const data = await crearEstudianteMateriaCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Asignación estudiante materia creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarEstudianteMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await actualizarEstudianteMateriaCasoUso(id, req.body);
        res.json({ data, mensaje: "Asignación estudiante materia actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarEstudianteMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await eliminarEstudianteMateriaCasoUso(id);
        res.json({ data, mensaje: "Asignación estudiante materia eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
