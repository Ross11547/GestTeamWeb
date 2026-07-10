import { prisma } from "../../../infrastructure/db/prisma.client.js";

let _roleDirectorId = null;
export async function getDirectorRoleId() {
    if (_roleDirectorId) return _roleDirectorId;

    const rol = await prisma.rol.findFirst({
        where: { nombre: { equals: "DIRECTOR", mode: "insensitive" } },
        select: { id: true },
    });

    if (!rol) return null;
    _roleDirectorId = rol.id;
    return _roleDirectorId;
}

const strip = (s = "") =>
    String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function siglaFromNombre(nombre = "") {
    const parts = strip(nombre)
        .split(/\s+/)
        .filter(Boolean)
        .filter((w) => !["de", "del", "la", "el", "y"].includes(w));
    if (!parts.length) return "GEN";
    return parts[parts.length - 1].slice(0, 3).toUpperCase();
}

export async function obtenerSiglaCarrera(idCarrera) {
    if (!idCarrera) return null;
    const c = await prisma.carrera.findUnique({
        where: { id: Number(idCarrera) },
        select: { sigla: true, nombre: true },
    });
    if (!c) return null;
    return c.sigla || siglaFromNombre(c.nombre);
}

export async function nombreFacultad(idFacultad) {
    if (!idFacultad) return "";
    const f = await prisma.facultad.findUnique({
        where: { id: Number(idFacultad) },
        select: { nombre: true },
    });
    return f?.nombre || "";
}

export function buildCodigo({ ci, siglaCarrera, siglaFallback }) {
    const pref = (siglaCarrera || siglaFallback || "GEN").toUpperCase();
    return `${pref}${ci}`;
}

export function buildCorreo({ nombres, apellidos }) {
    const n = strip(nombres).replace(/\s+/g, "");
    const aps = strip(apellidos).split(/\s+/).filter(Boolean);
    const ap1 = aps[0] || "";
    const ap2 = (aps[1] || "").slice(0, 2);
    const local = ["cbbe", n, ap1, ap2].filter(Boolean).join(".");
    return `${local}@unifranz.edu.bo`;
}

export function toDirectorDTO(u) {
    return {
        id: u.id,
        nombre: u.nombre,
        apellido: u.apellido || "",
        email: u.correo,
        telefono: u.telefono || "",
        ci: u.ci,
        departamento: u.facultad?.nombre || "",
        especialidad: u.carrera?.nombre || "",
        materias: (u.docenteMaterias || []).map((dm) => ({ id: dm.materia.id, nombre: dm.materia.nombre })),
        codigo:
            u.codigo ||
            buildCodigo({
                ci: u.ci,
                siglaCarrera: u.carrera?.sigla || siglaFromNombre(u.carrera?.nombre || ""),
                siglaFallback: siglaFromNombre(u.facultad?.nombre || ""),
            }),
    };
}
