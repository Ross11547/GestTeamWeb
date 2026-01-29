import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const semLabel = (n) => {
    const map = {
        1: "Primer semestre", 2: "Segundo semestre", 3: "Tercer semestre",
        4: "Cuarto semestre", 5: "Quinto semestre", 6: "Sexto semestre",
        7: "Séptimo semestre", 8: "Octavo semestre", 9: "Noveno semestre",
        10: "Décimo semestre", 11: "Undécimo semestre", 12: "Duodécimo semestre",
    };
    return map[n] || `Semestre ${n}`;
};

// ---------- GET /semestre ----------
app.get("/semestre", async (_req, res) => {
    try {
        const semestres = await prisma.semestre.findMany({
            orderBy: [{ carreraId: "asc" }, { numero: "asc" }],
            include: { carrera: { select: { id: true, nombre: true, idFacultad: true } } },
        });
        res.json({ data: semestres, message: "Semestres obtenidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener semestres", error: error.message });
    }
});

// ---------- GET /semestre/by-carrera?carreraId=# ----------
app.get("/semestre/by-carrera", async (req, res) => {
    try {
        const carreraId = Number(req.query.carreraId);
        if (!Number.isInteger(carreraId) || carreraId <= 0) {
            return res.status(400).json({ message: "carreraId válido es requerido" });
        }

        const items = await prisma.semestre.findMany({
            where: { carreraId },
            orderBy: { numero: "asc" },
            select: { id: true, numero: true, carreraId: true },
        });

        res.json({ data: items, message: "Semestres por carrera obtenidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener semestres por carrera", error: error.message });
    }
});

// ---------- GET /semestre/:id ----------
app.get("/semestre/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const semestre = await prisma.semestre.findUnique({
            where: { id },
            include: { carrera: { select: { id: true, nombre: true, idFacultad: true } } },
        });
        if (!semestre) {
            return res.status(404).json({ message: "Semestre no encontrado" });
        }

        res.json({ data: semestre, message: "Semestre obtenido correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener semestre", error: error.message });
    }
});

// ---------- POST /semestre ----------
app.post("/semestre", async (req, res) => {
    try {
        const { numero, carreraId } = req.body || {};
        const n = Number(numero);
        const c = Number(carreraId);

        if (!Number.isInteger(c) || c <= 0) {
            return res.status(400).json({ message: "carreraId válido es requerido" });
        }
        if (!Number.isInteger(n) || n < 1) {
            return res.status(400).json({ message: "numero de semestre válido (>=1) es requerido" });
        }

        const carrera = await prisma.carrera.findUnique({ where: { id: c } });
        if (!carrera) return res.status(400).json({ message: "La carrera indicada no existe" });

        const dup = await prisma.semestre.findFirst({ where: { carreraId: c, numero: n } });
        if (dup) return res.status(400).json({ message: "Ya existe ese semestre para la carrera" });

        const created = await prisma.semestre.create({
            data: { numero: n, etiqueta: semLabel(n), carreraId: c },
            include: { carrera: { select: { id: true, nombre: true, idFacultad: true } } },
        });

        res.json({ data: created, message: "Semestre creado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear semestre", error: error.message });
    }
});

// ---------- PUT /semestre/:id ----------
app.put("/semestre/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const data = {};

        if (req.body.numero !== undefined) {
            const n = Number(req.body.numero);
            if (!Number.isInteger(n) || n < 1) {
                return res.status(400).json({ message: "numero de semestre válido (>=1) es requerido" });
            }
            data.numero = n;
            data.etiqueta = semLabel(n);
        }

        if (req.body.carreraId !== undefined) {
            const c = Number(req.body.carreraId);
            if (!Number.isInteger(c) || c <= 0) {
                return res.status(400).json({ message: "carreraId inválido" });
            }
            const carrera = await prisma.carrera.findUnique({ where: { id: c } });
            if (!carrera) return res.status(400).json({ message: "La carrera indicada no existe" });
            data.carreraId = c;
        }

        if (data.carreraId !== undefined || data.numero !== undefined) {
            const current = await prisma.semestre.findUnique({ where: { id } });
            if (!current) return res.status(404).json({ message: "Semestre no encontrado" });

            const carreraId = data.carreraId ?? current.carreraId;
            const numero = data.numero ?? current.numero;

            const dup = await prisma.semestre.findFirst({
                where: { carreraId, numero, NOT: { id } },
            });
            if (dup) return res.status(400).json({ message: "Ya existe ese semestre para la carrera" });
        }

        const updated = await prisma.semestre.update({
            where: { id },
            data,
            include: { carrera: { select: { id: true, nombre: true, idFacultad: true } } },
        });

        res.json({ data: updated, message: "Semestre actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar semestre", error: error.message });
    }
});

// ---------- DELETE /semestre/:id ----------
app.delete("/semestre/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const exist = await prisma.semestre.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!exist) {
            return res.status(404).json({ message: "Semestre no encontrado" });
        }

        const deleted = await prisma.semestre.delete({
            where: { id },
            include: { carrera: { select: { id: true, nombre: true, idFacultad: true } } },
        });
        res.json({ data: deleted, message: "Semestre eliminado correctamente" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar semestre (verifica que no tenga materias asociadas)",
            error: error.message,
        });
    }
});

export default app;
