import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// ===== Helpers =====
const VALID_DAYS = [
    "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO",
];

// guardamos hora en una fecha fija (UTC) para comparar fácilmente
const BASE_DATE = "1970-01-01";
const toDate = (hhmm) => {
    if (typeof hhmm !== "string" || !/^\d{2}:\d{2}$/.test(hhmm)) return null;
    return new Date(`${BASE_DATE}T${hhmm}:00.000Z`); // UTC
};

// chequeo de solapamiento en misma materia+día
const hasOverlap = async ({ idToIgnore, materiaId, dia, ini, fin }) => {
    const overlap = await prisma.horario.findFirst({
        where: {
            materiaId,
            dia,
            ...(idToIgnore ? { NOT: { id: idToIgnore } } : {}),
            AND: [{ horaInicio: { lt: fin } }, { horaFin: { gt: ini } }],
        },
        select: { id: true },
    });
    return Boolean(overlap);
};

// include comunes
const carreraWithFacultad = { include: { facultad: { select: { id: true, nombre: true } } } };
const materiaInclude = {
    include: {
        carrera: carreraWithFacultad,
    },
};

// ===== Endpoints =====

// GET /horario
app.get("/horario", async (_req, res) => {
    try {
        const items = await prisma.horario.findMany({
            orderBy: [{ dia: "asc" }, { horaInicio: "asc" }],
            include: { materia: materiaInclude },
        });
        res.json({ data: items, message: "Horarios obtenidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener horarios", error: error.message });
    }
});

// GET /horario/:id
app.get("/horario/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const item = await prisma.horario.findUnique({
            where: { id },
            include: { materia: materiaInclude },
        });
        if (!item) return res.status(404).json({ message: "Horario no encontrado" });

        res.json({ data: item, message: "Horario obtenido correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener horario", error: error.message });
    }
});

// GET /horario/by-materia?materiaId=#
app.get("/horario/by-materia", async (req, res) => {
    try {
        const materiaId = Number(req.query.materiaId);
        if (!Number.isInteger(materiaId) || materiaId <= 0) {
            return res.status(400).json({ message: "materiaId requerido" });
        }

        const items = await prisma.horario.findMany({
            where: { materiaId },
            orderBy: [{ dia: "asc" }, { horaInicio: "asc" }],
            include: { materia: { select: { id: true, nombre: true, codigo: true } } },
        });
        res.json({ data: items, message: "Horarios por materia obtenidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener horarios por materia", error: error.message });
    }
});

// POST /horario
// Body: { materiaId:number, dia:"LUNES"|..., horaInicio:"HH:MM", horaFin:"HH:MM", aula:string }
app.post("/horario", async (req, res) => {
    try {
        const { materiaId, dia, horaInicio, horaFin, aula } = req.body || {};
        const matId = Number(materiaId);
        if (!matId) return res.status(400).json({ message: "materiaId válido es requerido" });

        const mat = await prisma.materia.findUnique({ where: { id: matId } });
        if (!mat) return res.status(400).json({ message: "La materia indicada no existe" });

        const day = String(dia || "").toUpperCase();
        if (!VALID_DAYS.includes(day)) {
            return res.status(400).json({ message: "dia inválido" });
        }

        const ini = toDate(horaInicio);
        const fin = toDate(horaFin);
        if (!ini || !fin) return res.status(400).json({ message: "Formato de hora inválido (use HH:MM)" });
        if (fin <= ini) return res.status(400).json({ message: "horaFin debe ser mayor que horaInicio" });

        if (await hasOverlap({ materiaId: matId, dia: day, ini, fin })) {
            return res.status(400).json({ message: "El horario se solapa con otro existente para esa materia y día" });
        }

        const created = await prisma.horario.create({
            data: { materiaId: matId, dia: day, horaInicio: ini, horaFin: fin, aula: String(aula || "").trim() },
            include: { materia: materiaInclude },
        });

        res.json({ data: created, message: "Horario creado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear horario", error: error.message });
    }
});

// PUT /horario/:id
app.put("/horario/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const current = await prisma.horario.findUnique({ where: { id } });
        if (!current) return res.status(404).json({ message: "Horario no encontrado" });

        const data = {};
        let materiaId = current.materiaId;
        let dia = current.dia;
        let ini = current.horaInicio;
        let fin = current.horaFin;

        if (req.body.materiaId !== undefined) {
            const m = Number(req.body.materiaId);
            if (!m) return res.status(400).json({ message: "materiaId inválido" });
            const mat = await prisma.materia.findUnique({ where: { id: m } });
            if (!mat) return res.status(400).json({ message: "La materia indicada no existe" });
            materiaId = m;
            data.materiaId = m;
        }
        if (req.body.dia !== undefined) {
            const day = String(req.body.dia || "").toUpperCase();
            if (!VALID_DAYS.includes(day)) return res.status(400).json({ message: "dia inválido" });
            dia = day;
            data.dia = day;
        }
        if (req.body.horaInicio !== undefined) {
            const d = toDate(req.body.horaInicio);
            if (!d) return res.status(400).json({ message: "horaInicio inválida (HH:MM)" });
            ini = d;
            data.horaInicio = d;
        }
        if (req.body.horaFin !== undefined) {
            const d = toDate(req.body.horaFin);
            if (!d) return res.status(400).json({ message: "horaFin inválida (HH:MM)" });
            fin = d;
            data.horaFin = d;
        }
        if (fin <= ini) return res.status(400).json({ message: "horaFin debe ser mayor que horaInicio" });
        if (await hasOverlap({ idToIgnore: id, materiaId, dia, ini, fin })) {
            return res.status(400).json({ message: "El horario se solapa con otro existente para esa materia y día" });
        }
        if (req.body.aula !== undefined) {
            data.aula = String(req.body.aula || "").trim();
        }

        const updated = await prisma.horario.update({
            where: { id },
            data,
            include: { materia: materiaInclude },
        });

        res.json({ data: updated, message: "Horario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar horario", error: error.message });
    }
});

// DELETE /horario/:id
app.delete("/horario/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const exists = await prisma.horario.findUnique({ where: { id }, select: { id: true } });
        if (!exists) return res.status(404).json({ message: "Horario no encontrado" });

        const deleted = await prisma.horario.delete({
            where: { id },
            include: { materia: materiaInclude },
        });
        res.json({ data: deleted, message: "Horario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar horario", error: error.message });
    }
});

export default app;
