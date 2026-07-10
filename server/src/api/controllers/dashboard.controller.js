import { resumenDashboardCasoUso } from "../../application/casosUso/dashboard/resumenDashboard.js";
import { crecimientoEstudiantesCasoUso } from "../../application/casosUso/dashboard/crecimientoEstudiantes.js";

export async function resumenDashboard(req, res, next) {
    try {
        const data = await resumenDashboardCasoUso();
        return res.json({ data, message: "resumen del dashboard obtenido correctamente" });
    } catch (e) {
        return next(e);
    }
}

export async function crecimientoEstudiantes(req, res, next) {
    try {
        const yearTo = new Date().getFullYear();
        const from = parseInt(req.query.from ?? String(yearTo - 5), 10);
        const to = parseInt(req.query.to ?? String(yearTo), 10);

        if (!Number.isInteger(from) || !Number.isInteger(to) || from > to) {
            return res.status(400).json({ error: "Parámetros inválidos: from/to" });
        }

        const data = await crecimientoEstudiantesCasoUso({ from, to });
        return res.json({ data, message: "crecimiento de estudiantes obtenido correctamente" });
    } catch (e) {
        return next(e);
    }
}

