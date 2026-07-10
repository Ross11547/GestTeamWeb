import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { derivarSigla } from "./codigoDocente.js";

export async function listarDocentesCasoUso({ rolId, q }) {
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

    return rows.map((u) => ({
        id: u.id,
        nombre: u.nombre,
        apellido: u.apellido || "",
        email: u.correo,
        telefono: u.telefono || "",
        ci: u.ci,
        departamento: u.facultad?.nombre || "",
        especialidad: u.carrera?.nombre || "",
        materias: u.docenteMaterias.map((dm) => ({ id: dm.materia.id, nombre: dm.materia.nombre })),
        codigo: u.codigo || `${derivarSigla(u.carrera?.nombre || u.facultad?.nombre)}${u.ci}`,
    }));
}
