import { prisma } from "../../../infrastructure/db/prisma.client.js";

let _roleDocenteId = null;

export async function getDocenteRoleId() {
    if (_roleDocenteId) return _roleDocenteId;

    const rol = await prisma.rol.findFirst({
        where: { nombre: { equals: "DOCENTE", mode: "insensitive" } },
        select: { id: true },
    });

    if (!rol) return null;
    _roleDocenteId = rol.id;
    return _roleDocenteId;
}

const strip = (s = "") =>
    String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function makeInstitutionalEmail(nombre = "", apellido = "") {
    const nombres = strip(nombre).replace(/\s+/g, " ");
    const apellidos = strip(apellido).replace(/\s+/g, " ");
    const apParts = apellidos.split(" ").filter(Boolean);
    const ap1 = apParts[0] || "";
    const ap2 = (apParts[1] || "").slice(0, 2);
    const local = ["cbbe", nombres.replace(/\s+/g, ""), ap1, ap2].filter(Boolean).join(".");
    return `${local}@unifranz.edu.bo`;
}

export function derivarSigla(nombre = "") {
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
    return c.sigla || derivarSigla(c.nombre);
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
    const pref = siglaCarrera || siglaFallback || "GEN";
    return `${pref}${ci}`;
}
