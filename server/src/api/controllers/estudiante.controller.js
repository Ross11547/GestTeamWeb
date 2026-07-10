import { listarEstudiantesCasoUso } from "../../application/casosUso/estudiante/listarEstudiantes.js";
import { obtenerEstudianteCasoUso } from "../../application/casosUso/estudiante/obtenerEstudianteID.js";
import { crearEstudianteCasoUso } from "../../application/casosUso/estudiante/crearEstudiante.js";
import { actualizarEstudianteCasoUso } from "../../application/casosUso/estudiante/actualizarEstudiante.js";
import { eliminarEstudianteCasoUso } from "../../application/casosUso/estudiante/eliminarEstudiante.js";
import { getEstudianteRoleId } from "../../application/casosUso/estudiante/codigoEstudiante.js";

function validarId(idParam) {
    const id = Number(idParam);
    if (!Number.isInteger(id) || id <= 0) return null;
    return id;
}

export async function listarEstudiantes(req, res, next) {
    try {
        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const q = String(req.query.q || "").trim();
        const data = await listarEstudiantesCasoUso({ rolId, q });

        return res.json({ data, message: "estudiantes obtenidos correctamente" });
    } catch (e) {
        return next(e);
    }
}

export async function obtenerEstudianteID(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const data = await obtenerEstudianteCasoUso({ id, rolId });
        if (!data) return res.status(404).json({ message: "Estudiante no encontrado" });

        return res.json({ data, message: "estudiante obtenido correctamente" });
    } catch (e) {
        return next(e);
    }
}

export async function crearEstudiante(req, res, next) {
    try {
        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const created = await crearEstudianteCasoUso({ rolId, body: req.body || {} });
        return res.json({ data: created, message: "estudiante creado correctamente" });
    } catch (e) {
        // tu versión vieja respondía 500 con error.message en varios casos.
        // aquí respetamos status si viene seteado, si no pasa a middleware.
        if (e?.status) {
            return res.status(e.status).json({ message: e.message });
        }
        return next(e);
    }
}

export async function actualizarEstudiante(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const updated = await actualizarEstudianteCasoUso({ id, rolId, body: req.body || {} });
        return res.json({ data: updated, message: "estudiante actualizado correctamente" });
    } catch (e) {
        if (e?.status) return res.status(e.status).json({ message: e.message });
        return next(e);
    }
}

export async function eliminarEstudiante(req, res, next) {
    try {
        const id = validarId(req.params.id);
        if (!id) return res.status(400).json({ message: "id inválido" });

        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const del = await eliminarEstudianteCasoUso({ id, rolId });
        if (!del) return res.status(404).json({ message: "Estudiante no encontrado" });

        return res.json({ data: del, message: "estudiante eliminado correctamente" });
    } catch (e) {
        return next(e);
    }
}
