import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { semLabel, buildCodigo, siglaDesdeCarreraOFacultad } from "./codigoEstudiante.js";

export async function listarEstudiantesCasoUso({ rolId, q }) {
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
            carrera: { select: { id: true, nombre: true, sigla: true } },
            semestre: { select: { id: true, numero: true, etiqueta: true } },
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
        semestre: semLabel(u.semestre),
        codigo: u.codigo || buildCodigo(siglaDesdeCarreraOFacultad(u.carrera?.nombre, u.facultad?.nombre), u.ci),
    }));
}
