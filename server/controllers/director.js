import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// ───────── helpers ─────────
let _roleDirectorId = null;
async function getDirectorRoleId() {
    if (_roleDirectorId) return _roleDirectorId;
    const rol = await prisma.rol.findFirst({
        where: { nombre: { equals: "DIRECTOR", mode: "insensitive" } },
        select: { id: true },
    });
    if (!rol) return null;
    _roleDirectorId = rol.id;
    return _roleDirectorId;
}

const strip = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
function siglaFromNombre(nombre = "") {
    const parts = strip(nombre)
        .split(/\s+/)
        .filter(Boolean)
        .filter((w) => !["de", "del", "la", "el", "y"].includes(w));
    if (!parts.length) return "GEN";
    const last = parts[parts.length - 1];
    return last.slice(0, 3).toUpperCase();
}
async function obtenerSiglaCarrera(idCarrera) {
    if (!idCarrera) return null;
    const c = await prisma.carrera.findUnique({
        where: { id: Number(idCarrera) },
        select: { sigla: true, nombre: true },
    });
    if (!c) return null;
    return c.sigla || siglaFromNombre(c.nombre);
}
async function nombreFacultad(idFacultad) {
    if (!idFacultad) return "";
    const f = await prisma.facultad.findUnique({ where: { id: Number(idFacultad) }, select: { nombre: true } });
    return f?.nombre || "";
}
function buildCodigo({ ci, siglaCarrera, siglaFallback }) {
    const pref = (siglaCarrera || siglaFallback || "GEN").toUpperCase();
    return `${pref}${ci}`;
}
function buildCorreo({ nombres, apellidos }) {
    const n = strip(nombres).replace(/\s+/g, "");
    const aps = strip(apellidos).split(/\s+/).filter(Boolean);
    const ap1 = aps[0] || "";
    const ap2 = (aps[1] || "").slice(0, 2);
    const local = ["cbbe", n, ap1, ap2].filter(Boolean).join(".");
    return `${local}@unifranz.edu.bo`;
}

// Unifica el shape que enviamos al front
function toDirectorDTO(u) {
    return {
        id: u.id,
        nombre: u.nombre,
        apellido: u.apellido || "",
        email: u.correo,
        telefono: u.telefono || "",
        ci: u.ci,
        departamento: u.facultad?.nombre || "",
        especialidad: u.carrera?.nombre || "",
        materias: (u.docenteMaterias || []).map(dm => ({ id: dm.materia.id, nombre: dm.materia.nombre })),
        codigo: u.codigo || buildCodigo({
            ci: u.ci,
            siglaCarrera: u.carrera?.sigla || siglaFromNombre(u.carrera?.nombre || ""),
            siglaFallback: siglaFromNombre(u.facultad?.nombre || ""),
        }),
    };
}

// ───────── GET /director (opcional ?q=) ─────────
app.get("/director", async (req, res) => {
    try {
        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const q = String(req.query.q || "").trim();
        const where = {
            idRol: rolId,
            esDirector: true,
            ...(q ? {
                OR: [
                    { nombre: { contains: q, mode: "insensitive" } },
                    { apellido: { contains: q, mode: "insensitive" } },
                    { correo: { contains: q, mode: "insensitive" } },
                    { codigo: { contains: q, mode: "insensitive" } },
                ],
            } : {}),
        };

        const rows = await prisma.usuario.findMany({
            where,
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true, sigla: true } },
                docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
            },
            orderBy: { id: "desc" },
        });

        res.json({ data: rows.map(toDirectorDTO), message: "directores obtenidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener directores", error: error.message });
    }
});

// ───────── GET /director/:id ─────────
app.get("/director/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const u = await prisma.usuario.findUnique({
            where: { id },
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true, sigla: true } },
                rol: { select: { id: true, nombre: true } },
                docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
            },
        });

        if (!u || u.idRol !== rolId || !u.esDirector) {
            return res.status(404).json({ message: "Director no encontrado" });
        }

        res.json({
            data: {
                ...toDirectorDTO(u),
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
                    materiaIds: u.docenteMaterias.map((dm) => dm.materia.id),
                },
            },
            message: "director obtenido correctamente",
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener director", error: error.message });
    }
});

// ───────── POST /director ─────────
app.post("/director", async (req, res) => {
    try {
        const rolId = await getDirectorRoleId();
        if (!rolId) return res.status(400).json({ message: "Debe crear el rol DIRECTOR primero" });

        const {
            nombre, apellido = "", telefono = "", ci,
            correo, idFacultad = null, idCarrera = null,
            materiaIds = [], password = "123456", activo = true,
        } = req.body || {};

        if (!nombre || !apellido || !ci) {
            return res.status(400).json({ message: "nombre, apellido y ci son requeridos" });
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

        const siglaCarr = await obtenerSiglaCarrera(idCarrera);
        const facName = await nombreFacultad(idFacultad);
        const codigo = buildCodigo({ ci: Number(ci), siglaCarrera: siglaCarr, siglaFallback: siglaFromNombre(facName) });

        const correoFinal = (correo && String(correo).toLowerCase().endsWith("@unifranz.edu.bo"))
            ? correo
            : buildCorreo({ nombres: nombre, apellidos: apellido });

        let created;
        try {
            created = await prisma.usuario.create({
                data: {
                    nombre, apellido, telefono, ci: Number(ci),
                    correo: correoFinal,
                    password,
                    idRol: rolId,
                    esDirector: true,
                    activo: Boolean(activo),
                    idFacultad: idFacultad ? Number(idFacultad) : null,
                    idCarrera: idCarrera ? Number(idCarrera) : null,
                    codigo,
                },
            });
        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Correo/código en uso o ya existe un director para esa carrera" });
            }
            throw error;
        }

        if (Array.isArray(materiaIds) && materiaIds.length > 0) {
            await prisma.docenteMateria.createMany({
                data: materiaIds.map((mid) => ({ usuarioId: created.id, materiaId: Number(mid) })),
                skipDuplicates: true,
            });
        }

        const full = await prisma.usuario.findUnique({
            where: { id: created.id },
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true, sigla: true } },
                docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
            },
        });

        res.json({ data: toDirectorDTO(full), message: "director creado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar director", error: error.message });
    }
});

// ───────── PUT /director/:id ─────────
app.put("/director/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getDirectorRoleId();
        const exists = await prisma.usuario.findUnique({ where: { id }, select: { idRol: true, esDirector: true, nombre: true, apellido: true } });
        if (!exists || exists.idRol !== rolId || !exists.esDirector) {
            return res.status(404).json({ message: "Director no encontrado" });
        }

        const { nombre, apellido, telefono, ci, correo, idFacultad, idCarrera, materiaIds, password, activo } = req.body || {};

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

        // Recalcular código si cambian CI/carrera/facultad
        let codigoUpdate = {};
        if (ci !== undefined || idCarrera !== undefined || idFacultad !== undefined) {
            const u = await prisma.usuario.findUnique({ where: { id }, select: { ci: true, idCarrera: true, idFacultad: true } });
            const newCi = ci !== undefined ? Number(ci) : u.ci;
            const newCarr = idCarrera !== undefined ? Number(idCarrera) : u.idCarrera;
            const newFac = idFacultad !== undefined ? Number(idFacultad) : u.idFacultad;
            const siglaCarr = await obtenerSiglaCarrera(newCarr);
            const facName = await nombreFacultad(newFac);
            codigoUpdate = { codigo: buildCodigo({ ci: newCi, siglaCarrera: siglaCarr, siglaFallback: siglaFromNombre(facName) }) };
        }

        // Correo institucional si no cumple
        let correoUpdate = {};
        if (correo !== undefined) {
            correoUpdate = {
                correo: (String(correo).toLowerCase().endsWith("@unifranz.edu.bo"))
                    ? correo
                    : buildCorreo({ nombres: nombre ?? exists.nombre, apellidos: apellido ?? exists.apellido }),
            };
        }

        try {
            await prisma.usuario.update({
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
                    esDirector: true,
                    ...codigoUpdate,
                    ...correoUpdate,
                },
            });
        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Correo/código en uso o ya existe un director para esa carrera" });
            }
            throw error;
        }

        if (Array.isArray(materiaIds)) {
            await prisma.docenteMateria.deleteMany({ where: { usuarioId: id } });
            if (materiaIds.length > 0) {
                await prisma.docenteMateria.createMany({
                    data: materiaIds.map((mid) => ({ usuarioId: id, materiaId: Number(mid) })),
                    skipDuplicates: true,
                });
            }
        }

        const full = await prisma.usuario.findUnique({
            where: { id },
            include: {
                facultad: { select: { id: true, nombre: true } },
                carrera: { select: { id: true, nombre: true, sigla: true } },
                docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
            },
        });

        res.json({ data: toDirectorDTO(full), message: "director actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar director", error: error.message });
    }
});

// ───────── DELETE /director/:id ─────────
app.delete("/director/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: "id inválido" });
        }

        const rolId = await getDirectorRoleId();
        const exists = await prisma.usuario.findUnique({ where: { id }, select: { idRol: true, esDirector: true } });
        if (!exists || exists.idRol !== rolId || !exists.esDirector) {
            return res.status(404).json({ message: "Director no encontrado" });
        }

        await prisma.docenteMateria.deleteMany({ where: { usuarioId: id } });
        const del = await prisma.usuario.delete({ where: { id } });
        res.json({ data: del, message: "director eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar director", error: error.message });
    }
});

export default app;
