// server/controllers/dashboard.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// ↳ Usa los nombres EXACTOS (insensible a may/min) que tienes en la tabla Rol
// Tu screenshot: Admin, Estudiante, Docente, Director
const ROLE_NAMES = { DOCENTE: "Docente", ESTUDIANTE: "Estudiante", DIRECTOR: "Director" };

// Cache simple de IDs de rol
let _rolesCache = { at: 0, ids: {} };
const TTL = 5 * 60 * 1000;

async function getRoleIds() {
    if (Date.now() - _rolesCache.at < TTL && _rolesCache.ids.ESTUDIANTE) return _rolesCache.ids;

    const rows = await prisma.rol.findMany({ select: { id: true, nombre: true } });
    const byName = (n) =>
        rows.find(r => String(r.nombre).toUpperCase() === String(n).toUpperCase())?.id ?? null;

    const ids = {
        DOCENTE: byName(ROLE_NAMES.DOCENTE),
        ESTUDIANTE: byName(ROLE_NAMES.ESTUDIANTE),
        DIRECTOR: byName(ROLE_NAMES.DIRECTOR),
    };
    _rolesCache = { at: Date.now(), ids };
    return ids;
}

/** GET /dashboard/summary
 * -> { data: {docentes, alumnos, facultades, directores} }
 */
app.get("/dashboard/summary", async (_req, res) => {
    try {
        const ids = await getRoleIds();

        const [docentes, alumnos, facultades, directores] = await Promise.all([
            ids.DOCENTE ? prisma.usuario.count({ where: { idRol: ids.DOCENTE } }) : 0,
            ids.ESTUDIANTE ? prisma.usuario.count({ where: { idRol: ids.ESTUDIANTE } }) : 0,
            prisma.facultad.count(),
            ids.DIRECTOR ? prisma.usuario.count({ where: { idRol: ids.DIRECTOR } }) : 0,
        ]);

        res.json({
            data: { docentes, alumnos, facultades, directores },
            message: "resumen del dashboard obtenido correctamente",
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener resumen del dashboard", error: error.message });
    }
});

/** GET /dashboard/student-growth?from=2020&to=2025
 * Cuenta ESTUDIANTES por año usando Usuario.createdAt (si existe).
 */
app.get("/dashboard/student-growth", async (req, res) => {
    const from = Number(req.query.from ?? 2020);
    const to = Number(req.query.to ?? new Date().getFullYear());

    try {
        const ids = await getRoleIds();
        const range = Array.from({ length: to - from + 1 }, (_, i) => from + i);

        // Si no hay rol "Estudiante", devolvemos ceros
        if (!ids.ESTUDIANTE) {
            return res.json({
                data: range.map(y => ({ name: String(y), estudiantes: 0 })),
                message: "crecimiento de estudiantes obtenido correctamente",
            });
        }

        // Intento con createdAt (si tu modelo Usuario lo tiene)
        try {
            const rows = await prisma.$queryRaw`
        SELECT EXTRACT(YEAR FROM "createdAt")::int AS year, COUNT(*)::int AS count
        FROM "Usuario"
        WHERE "idRol" = ${ids.ESTUDIANTE}
          AND "createdAt" >= MAKE_DATE(${from}, 1, 1)
          AND "createdAt" <  MAKE_DATE(${to + 1}, 1, 1)
        GROUP BY 1
        ORDER BY 1
      `;

            const data = range.map(y => {
                const hit = rows.find(r => r.year === y);
                return { name: String(y), estudiantes: hit ? hit.count : 0 };
            });

            return res.json({ data, message: "crecimiento de estudiantes obtenido correctamente" });
        } catch {
            // Fallback si no existe createdAt: ponemos todo el total en el año 'to'
            const total = await prisma.usuario.count({ where: { idRol: ids.ESTUDIANTE } });
            const data = range.map(y => ({ name: String(y), estudiantes: y === to ? total : 0 }));
            return res.json({ data, message: "crecimiento de estudiantes (fallback) obtenido correctamente" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener crecimiento de estudiantes", error: error.message });
    }
});

export default app;
