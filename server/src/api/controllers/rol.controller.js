import { ensureIdPositivo } from "../../dominio/rol/helpersRol.js";
import { listarRolesCasoUso } from "../../application/casosUso/rol/listarRoles.js";
import { obtenerRolCasoUso } from "../../application/casosUso/rol/obtenerRolID.js";
import { crearRolCasoUso } from "../../application/casosUso/rol/crearRol.js";
import { actualizarRolCasoUso } from "../../application/casosUso/rol/actualizarRol.js";
import { eliminarRolCasoUso } from "../../application/casosUso/rol/eliminarRol.js";

export async function listarRoles(req, res, next) {
    try {
        const data = await listarRolesCasoUso();
        res.json({ data, mensaje: "Roles obtenidos correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerRol(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await obtenerRolCasoUso(id);
        res.json({ data, mensaje: "Rol obtenido correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearRol(req, res, next) {
    try {
        const data = await crearRolCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Rol creado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarRol(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await actualizarRolCasoUso(id, req.body);
        res.json({ data, mensaje: "Rol actualizado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarRol(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "ID inválido" });

        const data = await eliminarRolCasoUso(id);
        res.json({ data, mensaje: "Rol eliminado correctamente" });
    } catch (e) {
        next(e);
    }
}
