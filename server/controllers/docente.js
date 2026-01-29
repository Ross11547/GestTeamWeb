import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// ---------- helpers ----------
let _roleDocenteId = null;
async function getDocenteRoleId() {
    if (_roleDocenteId) return _roleDocenteId;
    const rol = await prisma.rol.findFirst({
        where: { nombre: { equals: "DOCENTE", mode: "insensitive" } },
        select: { id: true },
    });
    if (!rol) return null;
    _roleDocenteId = rol.id;
    return _roleDocenteId;
}

const strip = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

function makeInstitutionalEmail(nombre = "", apellido = "") {
    const nombres = strip(nombre).replace(/\s+/g, " ");
    const apellidos = strip(apellido).replace(/\s+/g, " ");
    const apParts = apellidos.split(" ").filter(Boolean);
    const ap1 = apParts[0] || "";
    const ap2 = (apParts[1] || "").slice(0, 2);
    const local = ["cbbe", nombres.replace(/\s+/g, ""), ap1, ap2].filter(Boolean).join(".");
    return `${local}@unifranz.edu.bo`;
}

function derivarSigla(nombre = "") {
    const parts = strip(nombre).split(/\s+/).filter(Boolean).filter(w => !["de", "del", "la", "el", "y"].includes(w));
    if (!parts.length) return "GEN";
    return parts[parts.length - 1].slice(0, 3).toUpperCase();
}

async function obtenerSiglaCarrera(idCarrera) {
    if (!idCarrera) return null;
    const c = await prisma.carrera.findUnique({
        where: { id: Number(idCarrera) },
        select: { sigla: true, nombre: true },
    });
    if (!c) return null;
    return c.sigla || derivarSigla(c.nombre);
}

async function nombreFacultad(idFacultad) {
    if (!idFacultad) return "";
    const f = await prisma.facultad.findUnique({
        where: { id: Number(idFacultad) },
        select: { nombre: true },
    });
    return f?.nombre || "";
}

function buildCodigo({ ci, siglaCarrera, siglaFallback }) {
    const pref = siglaCarrera || siglaFallback || "GEN";
    return `${pref}${ci}`;
}

// ---------- GET /docente ----------
app.get("/docente", async (req, res) => {
    try {
        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const q = String(req.query.q || "").trim();

        const where = {
            idRol: rolId,
            ...(q
                ? {
                    OR: [
                        { nombre: { contains: q, mode: "insensitive" } },
                        { apellido: { contains: q, mode: "insensitive" } },
                        { correo: { contains: q, mode: "insensitive" } },
                        { codigo: { contains: q, mode: "insensitive" } },
                    ],
                }
                : {}),
        };

        const rows = await prisma.usuario.findMany({
            where,
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true } },
                docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
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
            materias: u.docenteMaterias.map(dm => ({ id: dm.materia.id, nombre: dm.materia.nombre })),
            codigo: u.codigo || `${derivarSigla(u.carrera?.nombre || u.facultad?.nombre)}${u.ci}`,
        }));

        res.json({ data, message: "docentes obtenidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener docentes", error: error.message });
    }
});

// ---------- GET /docente/:id ----------
app.get("/docente/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const u = await prisma.usuario.findUnique({
            where: { id },
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true } },
                rol: { select: { id: true, nombre: true } },
                docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
            },
        });

        if (!u || u.idRol !== rolId) {
            return res.status(404).json({ message: "Docente no encontrado" });
        }

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
                materias: u.docenteMaterias.map(dm => ({ id: dm.materia.id, nombre: dm.materia.nombre })),
                codigo: u.codigo || `${derivarSigla(u.carrera?.nombre || u.facultad?.nombre)}${u.ci}`,
                raw: {
                    nombre: u.nombre,
                    apellido: u.apellido,
                    correo: u.correo,
                    telefono: u.telefono,
                    idFacultad: u.idFacultad,
                    idCarrera: u.idCarrera,
                    ci: u.ci,
                    codigo: u.codigo,
                    activo: u.activo,
                    materiaIds: u.docenteMaterias.map(dm => dm.materia.id),
                },
            },
            message: "docente obtenido correctamente",
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener docente", error: error.message });
    }
});

// ---------- POST /docente ----------
app.post("/docente", async (req, res) => {
    try {
        const rolId = await getDocenteRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DOCENTE primero" });

        const {
            nombre,
            apellido = "",
            telefono = "",
            ci,
            idFacultad = null,
            idCarrera = null,
            materiaIds = [],
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

        const correo = makeInstitutionalEmail(nombre, apellido);
        const siglaCarr = await obtenerSiglaCarrera(idCarrera);
        const facName = await nombreFacultad(idFacultad);
        const codigo = buildCodigo({
            ci: Number(ci), siglaCarrera: siglaCarr, siglaFallback: derivarSigla(facName),
        });

        let created;
        try {
            created = await prisma.usuario.create({
                data: {
                    nombre, apellido, telefono,
                    ci: Number(ci),
                    correo,
                    password, // TODO: hash
                    idRol: rolId,
                    activo: Boolean(activo),
                    idFacultad: idFacultad ? Number(idFacultad) : null,
                    idCarrera: idCarrera ? Number(idCarrera) : null,
                    codigo,
                },
            });
        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Correo o código ya existen" });
            }
            throw error;
        }

        if (Array.isArray(materiaIds) && materiaIds.length > 0) {
            await prisma.docenteMateria.createMany({
                data: materiaIds.map(mid => ({ usuarioId: created.id, materiaId: Number(mid) })),
                skipDuplicates: true,
            });
        }

        res.json({ data: created, message: "docente creado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar docente", error: error.message });
    }
});

// ---------- PUT /docente/:id ----------
app.put("/docente/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getDocenteRoleId();

        const exists = await prisma.usuario.findUnique({ where: { id }, select: { idRol: true } });
        if (!exists || exists.idRol !== rolId) {
            return res.status(404).json({ message: "Docente no encontrado" });
        }

        const { nombre, apellido, telefono, ci, idFacultad, idCarrera, materiaIds, password, activo } = req.body || {};

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

        // recalcular código cuando cambien CI/Carrera/Facultad
        let codigoUpdate = {};
        if (ci !== undefined || idCarrera !== undefined || idFacultad !== undefined) {
            const u = await prisma.usuario.findUnique({
                where: { id },
                select: { ci: true, idCarrera: true, idFacultad: true },
            });
            const newCi = ci !== undefined ? Number(ci) : u.ci;
            const newCarr = idCarrera !== undefined ? Number(idCarrera) : u.idCarrera;
            const newFac = idFacultad !== undefined ? Number(idFacultad) : u.idFacultad;

            const siglaCarr = await obtenerSiglaCarrera(newCarr);
            const facName = await nombreFacultad(newFac);
            codigoUpdate = {
                codigo: buildCodigo({ ci: newCi, siglaCarrera: siglaCarr, siglaFallback: derivarSigla(facName) })
            };
        }

        // Si cambia nombre/apellido, regenerar correo institucional
        let correoUpdate = {};
        if (nombre !== undefined || apellido !== undefined) {
            const u = await prisma.usuario.findUnique({ where: { id }, select: { nombre: true, apellido: true } });
            const newNom = nombre !== undefined ? nombre : u.nombre;
            const newApe = apellido !== undefined ? apellido : u.apellido;
            correoUpdate = { correo: makeInstitutionalEmail(newNom, newApe) };
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
                    ...(password !== undefined ? { password } : {}),
                    ...(activo !== undefined ? { activo: Boolean(activo) } : {}),
                    ...codigoUpdate,
                    ...correoUpdate,
                },
            });
        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Correo o código ya existen" });
            }
            throw error;
        }

        if (Array.isArray(materiaIds)) {
            await prisma.docenteMateria.deleteMany({ where: { usuarioId: id } });
            if (materiaIds.length > 0) {
                await prisma.docenteMateria.createMany({
                    data: materiaIds.map(mid => ({ usuarioId: id, materiaId: Number(mid) })),
                    skipDuplicates: true,
                });
            }
        }

        res.json({ data: updated, message: "docente actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar docente", error: error.message });
    }
});

// ---------- DELETE /docente/:id ----------
app.delete("/docente/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getDocenteRoleId();

        const exists = await prisma.usuario.findUnique({ where: { id }, select: { idRol: true } });
        if (!exists || exists.idRol !== rolId) {
            return res.status(404).json({ message: "Docente no encontrado" });
        }

        await prisma.docenteMateria.deleteMany({ where: { usuarioId: id } });
        const del = await prisma.usuario.delete({ where: { id } });

        res.json({ data: del, message: "docente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar docente", error: error.message });
    }
});

export default app;
