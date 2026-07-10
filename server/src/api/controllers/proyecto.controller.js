import { ensureIdPositivo } from "../../dominio/proyecto/helpersProyecto.js";
import { listarProyectosCasoUso } from "../../application/casosUso/proyecto/listarProyectos.js";
import { obtenerProyectoCasoUso } from "../../application/casosUso/proyecto/obtenerProyectoID.js";
import { crearProyectoCasoUso } from "../../application/casosUso/proyecto/crearProyecto.js";
import { actualizarProyectoCasoUso } from "../../application/casosUso/proyecto/actualizarProyecto.js";
import { eliminarProyectoCasoUso } from "../../application/casosUso/proyecto/eliminarProyecto.js";

export async function listarProyectos(req, res, next) {
    try {
        const data = await listarProyectosCasoUso();
        res.json({ data, mensaje: "Proyectos obtenidos correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerProyecto(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await obtenerProyectoCasoUso(id);
        res.json({ data, mensaje: "Proyecto obtenido correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearProyecto(req, res, next) {
    try {
        const data = await crearProyectoCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Proyecto creado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarProyecto(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await actualizarProyectoCasoUso(id, req.body);
        res.json({ data, mensaje: "Proyecto actualizado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarProyecto(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await eliminarProyectoCasoUso(id);
        res.json({ data, mensaje: "Proyecto eliminado correctamente" });
    } catch (e) {
        next(e);
    }
}
