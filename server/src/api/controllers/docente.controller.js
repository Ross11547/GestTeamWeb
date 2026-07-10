import { getDocenteRoleId } from "../../application/casosUso/docente/codigoDocente.js";
import { listarDocentesCasoUso } from "../../application/casosUso/docente/listarDocentes.js";
import { obtenerDocenteCasoUso } from "../../application/casosUso/docente/obtenerDocenteID.js";
import { crearDocenteCasoUso } from "../../application/casosUso/docente/crearDocente.js";
import { actualizarDocenteCasoUso } from "../../application/casosUso/docente/actualizarDocente.js";
import { eliminarDocenteCasoUso } from "../../application/casosUso/docente/eliminarDocente.js";

function validarId(idParam) {
    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0) return null;
    return id;
}

export async function listarDocentes(req, res, next) {
    try {
        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const q = String(req.query.q || "").trim();
        const data = await listarDocentesCasoUso({ rolId, q });

        return res.json({ data, message: "docentes obtenidos correctamente" });
    } catch (e) {
        return next(e);
    }
}

export async function obtenerDocenteID(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const data = await obtenerDocenteCasoUso({ id, rolId });
        if (!data) return res.status(404).json({ message: "Docente no encontrado" });

        return res.json({ data, message: "docente obtenido correctamente" });
    } catch (e) {
        return next(e);
    }
}

export async function crearDocente(req, res, next) {
    try {
        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const created = await crearDocenteCasoUso({ rolId, body: req.body || {} });
        return res.json({ data: created, message: "docente creado correctamente" });
    } catch (e) {
        if (e?.status) return res.status(e.status).json({ message: e.message });
        return next(e);
    }
}

export async function actualizarDocente(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const updated = await actualizarDocenteCasoUso({ id, rolId, body: req.body || {} });
        return res.json({ data: updated, message: "docente actualizado correctamente" });
    } catch (e) {
        if (e?.status) return res.status(e.status).json({ message: e.message });
        return next(e);
    }
}

export async function eliminarDocente(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const del = await eliminarDocenteCasoUso({ id, rolId });
        if (!del) return res.status(404).json({ message: "Docente no encontrado" });

        return res.json({ data: del, message: "docente eliminado correctamente" });
    } catch (e) {
        return next(e);
    }
}
