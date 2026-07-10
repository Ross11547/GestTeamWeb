import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function eliminarFacultadCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const existe = await prisma.facultad.findUnique({
        where: { id },
        select: { id: true },
    });
    if (!existe) throw new Error("Facultad no encontrada");

    const carreras = await prisma.carrera.count({ where: { idFacultad: id } });
    if (carreras > 0) {
        throw new Error("No se puede eliminar: la facultad tiene carreras asociadas");
    }

    return prisma.facultad.delete({ where: { id } });
}
