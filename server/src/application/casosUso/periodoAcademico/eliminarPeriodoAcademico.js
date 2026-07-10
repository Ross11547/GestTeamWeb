import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function eliminarPeriodoAcademicoCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const actual = await prisma.periodoAcademico.findUnique({
        where: { id },
        select: { id: true, activo: true },
    });
    if (!actual) throw new Error("Periodo académico no encontrado");

    if (actual.activo) {
        throw new Error("No se puede eliminar el periodo activo. Desactívalo primero.");
    }

    return prisma.periodoAcademico.delete({ where: { id } });
}
