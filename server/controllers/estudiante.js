// server/controllers/estudiante.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// ---------------- helpers ----------------
let _roleEstudianteId = null;
async function getEstudianteRoleId() {
    if (_roleEstudianteId) return _roleEstudianteId;
    const rol = await prisma.rol.findFirst({
        where: { nombre: { equals: "ESTUDIANTE", mode: "insensitive" } },
        select: { id: true },
    });
    if (!rol) return null;
    _roleEstudianteId = rol.id;
    return _roleEstudianteId;
}

const strip = (s = "") =>
    String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const lower = (s = "") => strip(s).toLowerCase();

function buildEmail({ nombres = "", apellidos = "" }) {
    const n = lower(nombres).replace(/\s+/g, "");
    const ap = lower(apellidos).split(/\s+/).filter(Boolean);
    const ap1 = ap[0] || "";
    const ap2 = (ap[1] || "").slice(0, 2);
    const local = ["cbbe", n, ap1, ap2].filter(Boolean).join(".");
    return `${local}@unifranz.edu.bo`;
}

function siglaDesdeNombre(nombre = "") {
    const last = lower(nombre).split(/\s+/).filter(Boolean).pop() || "";
    return last.slice(0, 3).toUpperCase() || "GEN";
}

async function siglaCarreraOrFallback(idCarrera, idFacultad) {
    if (idCarrera) {
        const c = await prisma.carrera.findUnique({
            where: { id: Number(idCarrera) },
            select: { sigla: true, nombre: true },
        });
        if (c) return c.sigla || siglaDesdeNombre(c.nombre);
    }
    if (idFacultad) {
        const f = await prisma.facultad.findUnique({
            where: { id: Number(idFacultad) },
            select: { nombre: true },
        });
        if (f) return siglaDesdeNombre(f.nombre);
    }
    return "GEN";
}
const SEM = [null, "Primer", "Segundo", "Tercer", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Undécimo", "Duodécimo"];
const semLabel = (s) => !s ? "" : (s.etiqueta || (SEM[s.numero] ? `${SEM[s.numero]} semestre` : `Semestre ${s.numero}`));
const buildCodigo = (sigla, ci) => `${(sigla || "GEN").toUpperCase()}${Number(ci) || ""}`;

// ---------------- GET /estudiante ----------------
app.get("/estudiante", async (req, res) => {
    try {
        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const q = String(req.query.q || "").trim();

        const where = {
            idRol: rolId,
            ...(q ? {
                OR: [
                    { nombre: { contains: q, mode: "insensitive" } },
                    { apellido: { contains: q, mode: "insensitive" } },
                    { correo: { contains: q, mode: "insensitive" } },
                    { codigo: { contains: q, mode: "insensitive" } },
                ]
            } : {})
        };

        const rows = await prisma.usuario.findMany({
            where,
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true, sigla: true } },
                semestre: { select: { id: true, numero: true, etiqueta: true } },
            },
            orderBy: { id: "desc" },
        });

        const data = rows.map(u => ({
            id: u.id,
            nombre: u.nombre,
            apellido: u.apellido || "",
            email: u.correo,
            telefono: u.telefono || "",
            ci: u.ci,
            departamento: u.facultad?.nombre || "",
            especialidad: u.carrera?.nombre || "",
            semestre: semLabel(u.semestre),
            codigo: u.codigo || buildCodigo(siglaDesdeNombre(u.carrera?.nombre || u.facultad?.nombre || ""), u.ci),
        }));

        res.json({ data, message: "estudiantes obtenidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener estudiantes", error: error.message });
    }
});

// ---------------- GET /estudiante/:id ----------------
app.get("/estudiante/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const u = await prisma.usuario.findUnique({
            where: { id },
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true, sigla: true } },
                semestre: { select: { id: true, numero: true, etiqueta: true } },
                rol: { select: { id: true, nombre: true } },
            },
        });
        if (!u || u.idRol !== rolId) return res.status(404).json({ message: "Estudiante no encontrado" });

        res.json({
            data: {
                id: u.id,
                nombre: u.nombre,
                apellido: u.apellido || "",
                email: u.correo,
                telefono: u.telefono || "",
                ci: u.ci,
                departamento: u.facultad?.nombre || "",
                especialidad: u.carrera?.nombre || "",
                semestre: semLabel(u.semestre),
                codigo: u.codigo || buildCodigo(siglaDesdeNombre(u.carrera?.nombre || u.facultad?.nombre || ""), u.ci),
                raw: {
                    nombre: u.nombre,
                    apellido: u.apellido || "",
                    correo: u.correo,
                    telefono: u.telefono || "",
                    idFacultad: u.idFacultad,
                    idCarrera: u.idCarrera,
                    semestreId: u.semestreId,
                    ci: u.ci,
                    codigo: u.codigo,
                    activo: u.activo,
                    materiaIds: [],
                },
            },
            message: "estudiante obtenido correctamente",
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener estudiante", error: error.message });
    }
});

// ---------------- POST /estudiante ----------------
app.post("/estudiante", async (req, res) => {
    try {
        const rolId = await getEstudianteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol ESTUDIANTE primero" });

        const {
            nombre,
            apellido = "",
            telefono = "",
            ci,
            idFacultad = null,
            idCarrera = null,
            semestreId = null,
            password = "123456",
            activo = true,
        } = req.body || {};

        if (!nombre || !ci) {
            return res.status(400).json({ message: "nombre y ci son requeridos" });
        }
        if (!Number.isInteger(Number(ci)) || Number(ci) <= 0) {
            return res.status(400).json({ message: "ci debe ser un número válido y positivo" });
        }

        if (idFacultad !== null) {
            const fac = await prisma.facultad.findUnique({ where: { id: Number(idFacultad) } });
            if (!fac) return res.status(400).json({ message: "La facultad indicada no existe" });
        }
        if (idCarrera !== null) {
            const car = await prisma.carrera.findUnique({ where: { id: Number(idCarrera) } });
            if (!car) return res.status(400).json({ message: "La carrera indicada no existe" });
        }
        if (semestreId !== null) {
            const sem = await prisma.semestre.findUnique({ where: { id: Number(semestreId) } });
            if (!sem) return res.status(400).json({ message: "El semestre indicado no existe" });
            if (idCarrera && sem.carreraId !== Number(idCarrera)) {
                return res.status(400).json({ message: "El semestre no pertenece a la carrera seleccionada" });
            }
        }

        const correo = buildEmail({ nombres: nombre, apellidos: apellido });
        const sigla = await siglaCarreraOrFallback(idCarrera, idFacultad);
        const codigo = buildCodigo(sigla, ci);

        let created;
        try {
            created = await prisma.usuario.create({
                data: {
                    nombre,
                    apellido,
                    telefono,
                    ci: Number(ci),
                    correo,
                    password, // TODO: hash
                    idRol: rolId,
                    activo: Boolean(activo),
                    idFacultad: idFacultad ? Number(idFacultad) : null,
                    idCarrera: idCarrera ? Number(idCarrera) : null,
                    semestreId: semestreId ? Number(semestreId) : null,
                    codigo,
                },
            });
        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Correo o código ya existen" });
            }
            throw error;
        }

        res.json({ data: created, message: "estudiante creado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar estudiante", error: error.message });
    }
});

// ---------------- PUT /estudiante/:id ----------------
app.put("/estudiante/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getEstudianteRoleId();

        const exists = await prisma.usuario.findUnique({
            where: { id },
            select: { idRol: true, idFacultad: true, idCarrera: true, ci: true, nombre: true, apellido: true },
        });
        if (!exists || exists.idRol !== rolId) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        const { nombre, apellido, telefono, ci, idFacultad, idCarrera, semestreId, password, activo } = req.body || {};

        if (ci !== undefined && (!Number.isInteger(Number(ci)) || Number(ci) <= 0)) {
            return res.status(400).json({ message: "ci debe ser un número válido y positivo" });
        }
        if (idFacultad !== undefined && idFacultad !== null) {
            const fac = await prisma.facultad.findUnique({ where: { id: Number(idFacultad) } });
            if (!fac) return res.status(400).json({ message: "La facultad indicada no existe" });
        }
        if (idCarrera !== undefined && idCarrera !== null) {
            const car = await prisma.carrera.findUnique({ where: { id: Number(idCarrera) } });
            if (!car) return res.status(400).json({ message: "La carrera indicada no existe" });
        }
        if (semestreId !== undefined && semestreId !== null) {
            const sem = await prisma.semestre.findUnique({ where: { id: Number(semestreId) } });
            if (!sem) return res.status(400).json({ message: "El semestre indicado no existe" });
            const carreraIdToUse = idCarrera !== undefined ? Number(idCarrera) : exists.idCarrera;
            if (carreraIdToUse && sem.carreraId !== carreraIdToUse) {
                return res.status(400).json({ message: "El semestre no pertenece a la carrera seleccionada" });
            }
        }

        let emailUpdate = {};
        if (nombre !== undefined || apellido !== undefined) {
            const n = nombre !== undefined ? nombre : exists.nombre;
            const a = apellido !== undefined ? apellido : exists.apellido;
            emailUpdate = { correo: buildEmail({ nombres: n, apellidos: a }) };
        }

        let codigoUpdate = {};
        if (ci !== undefined || idCarrera !== undefined || idFacultad !== undefined) {
            const newCi = ci !== undefined ? Number(ci) : exists.ci;
            const newCar = idCarrera !== undefined ? Number(idCarrera) : exists.idCarrera;
            const newFac = idFacultad !== undefined ? Number(idFacultad) : exists.idFacultad;
            const sigla = await siglaCarreraOrFallback(newCar, newFac);
            codigoUpdate = { codigo: buildCodigo(sigla, newCi) };
        }

        let updated;
        try {
            updated = await prisma.usuario.update({
                where: { id },
                data: {
                    ...(nombre !== undefined ? { nombre } : {}),
                    ...(apellido !== undefined ? { apellido } : {}),
                    ...(telefono !== undefined ? { telefono } : {}),
                    ...(ci !== undefined ? { ci: Number(ci) } : {}),
                    ...(idFacultad !== undefined ? { idFacultad: idFacultad ? Number(idFacultad) : null } : {}),
                    ...(idCarrera !== undefined ? { idCarrera: idCarrera ? Number(idCarrera) : null } : {}),
                    ...(semestreId !== undefined ? { semestreId: semestreId ? Number(semestreId) : null } : {}),
                    ...(password !== undefined ? { password } : {}),
                    ...(activo !== undefined ? { activo: Boolean(activo) } : {}),
                    ...emailUpdate,
                    ...codigoUpdate,
                },
            });
        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Correo o código ya existen" });
            }
            throw error;
        }

        res.json({ data: updated, message: "estudiante actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar estudiante", error: error.message });
    }
});

// ---------------- DELETE /estudiante/:id ----------------
app.delete("/estudiante/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getEstudianteRoleId();

        const exists = await prisma.usuario.findUnique({ where: { id }, select: { idRol: true } });
        if (!exists || exists.idRol !== rolId) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        const del = await prisma.usuario.delete({ where: { id } });
        res.json({ data: del, message: "estudiante eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar estudiante", error: error.message });
    }
});

export default app;
