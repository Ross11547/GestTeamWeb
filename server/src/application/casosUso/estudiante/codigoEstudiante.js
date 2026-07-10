import { prisma } from "../../../infrastructure/db/prisma.client.js";

let _roleEstudianteId = null;

export async function getEstudianteRoleId() {
    if (_roleEstudianteId) return _roleEstudianteId;

    const rol = await prisma.rol.findFirst({
        where: { nombre: { equals: "ESTUDIANTE", mode: "insensitive" } },
        select: { id: true },
    });

    if (!rol) return null;
    _roleEstudianteId = rol.id;
    return _roleEstudianteId;
}

const strip = (s = "") => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const lower = (s = "") => strip(s).toLowerCase();

export function buildEmail({ nombres = "", apellidos = "" }) {
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

export async function siglaCarreraOrFallback(idCarrera, idFacultad) {
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

export function semLabel(sem) {
    if (!sem) return "";
    return sem.etiqueta || (SEM[sem.numero] ? `${SEM[sem.numero]} semestre` : `Semestre ${sem.numero}`);
}

export function buildCodigo(sigla, ci) {
    return `${(sigla || "GEN").toUpperCase()}${Number(ci) || ""}`;
}

export function siglaDesdeCarreraOFacultad(nombreCarrera, nombreFacultad) {
    return siglaDesdeNombre(nombreCarrera || nombreFacultad || "");
}
