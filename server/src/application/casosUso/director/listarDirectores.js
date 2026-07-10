import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { toDirectorDTO } from "./codigoDirector.js";

export async function listarDirectoresCasoUso({ rolId, q }) {
    const where = {
        idRol: rolId,
        esDirector: true,
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
            docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
        },
        orderBy: { id: "desc" },
    });

    return rows.map(toDirectorDTO);
}
