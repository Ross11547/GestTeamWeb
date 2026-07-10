import { listarClasesMateriaCasoUso } from "../../application/casosUso/claseMateria/listarClasesMaterias.js";
import { obtenerClaseMateriaPorIdCasoUso } from "../../application/casosUso/claseMateria/obtenerClasesMateriaID.js";
import { crearClaseMateriaCasoUso } from "../../application/casosUso/claseMateria/crearCalseMateria.js";
import { actualizarClaseMateriaCasoUso } from "../../application/casosUso/claseMateria/actualizarClaseMateria.js";
import { eliminarClaseMateriaCasoUso } from "../../application/casosUso/claseMateria/eliminarClaseMateria.js";
import { ensureIdPositivo } from "../../dominio/claseMateria/helpersClaseMateria.js";

export async function listarClasesMateria(req, res, next) {
    try {
        const periodoId = req.query.periodoId ? ensureIdPositivo(req.query.periodoId) : null;
        const materiaId = req.query.materiaId ? ensureIdPositivo(req.query.materiaId) : null;
        const docenteId = req.query.docenteId ? ensureIdPositivo(req.query.docenteId) : null;

        const data = await listarClasesMateriaCasoUso({
            ...(periodoId ? { periodoId } : {}),
            ...(materiaId ? { materiaId } : {}),
            ...(docenteId ? { docenteId } : {}),
        });

        res.json({ data, mensaje: "Clases obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerClaseMateriaId(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "id inválido" });

        const data = await obtenerClaseMateriaPorIdCasoUso({ id });
        res.json({ data, mensaje: "Clase obtenida correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearClaseMateria(req, res, next) {
    try {
        const data = await crearClaseMateriaCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Clase creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarClaseMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "id inválido" });

        const data = await actualizarClaseMateriaCasoUso({ id, data: req.body });
        res.json({ data, mensaje: "Clase actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarClaseMateria(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "id inválido" });

        const data = await eliminarClaseMateriaCasoUso({ id });
        res.json({ data, mensaje: "Clase eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
