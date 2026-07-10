import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function eliminarSemestreCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const existe = await prisma.semestre.findUnique({ where: { id }, select: { id: true } });
    if (!existe) throw new Error("Semestre no encontrado");

    const [materias, usuarios] = await Promise.all([
        prisma.materia.count({ where: { semestreId: id } }),
        prisma.usuario.count({ where: { semestreId: id } }),
    ]);

    if (materias > 0 || usuarios > 0) {
        throw new Error("No se puede eliminar: el semestre tiene registros asociados (materias/usuarios)");
    }

    return prisma.semestre.delete({ where: { id } });
}
