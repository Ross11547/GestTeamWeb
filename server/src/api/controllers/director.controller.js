import { getDirectorRoleId } from "../../application/casosUso/director/codigoDirector.js";
import { listarDirectoresCasoUso } from "../../application/casosUso/director/listarDirectores.js";
import { obtenerDirectorCasoUso } from "../../application/casosUso/director/obtenerDirectorID.js";
import { crearDirectorCasoUso } from "../../application/casosUso/director/crearDirector.js";
import { actualizarDirectorCasoUso } from "../../application/casosUso/director/actualizarDirector.js";
import { eliminarDirectorCasoUso } from "../../application/casosUso/director/eliminarDirector.js";

function validarId(idParam) {
    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0) return null;
    return id;
}

export async function listarDirectores(req, res, next) {
    try {
        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const q = String(req.query.q || "").trim();
        const data = await listarDirectoresCasoUso({ rolId, q });

        return res.json({ data, message: "directores obtenidos correctamente" });
    } catch (e) {
        return next(e);
    }
}

export async function obtenerDirectorID(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const data = await obtenerDirectorCasoUso({ id, rolId });
        if (!data) return res.status(404).json({ message: "Director no encontrado" });

        return res.json({ data, message: "director obtenido correctamente" });
    } catch (e) {
        return next(e);
    }
}

export async function crearDirector(req, res, next) {
    try {
        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const created = await crearDirectorCasoUso({ rolId, body: req.body || {} });
        return res.json({ data: created, message: "director creado correctamente" });
    } catch (e) {
        if (e?.status) return res.status(e.status).json({ message: e.message });
        return next(e);
    }
}

export async function actualizarDirector(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const updated = await actualizarDirectorCasoUso({ id, rolId, body: req.body || {} });
        return res.json({ data: updated, message: "director actualizado correctamente" });
    } catch (e) {
        if (e?.status) return res.status(e.status).json({ message: e.message });
        return next(e);
    }
}

export async function eliminarDirector(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const del = await eliminarDirectorCasoUso({ id, rolId });
        if (!del) return res.status(404).json({ message: "Director no encontrado" });

        return res.json({ data: del, message: "director eliminado correctamente" });
    } catch (e) {
        return next(e);
    }
}
