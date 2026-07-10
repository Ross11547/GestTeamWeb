import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function eliminarCarreraCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const existe = await prisma.carrera.findUnique({
        where: { id },
        select: { id: true },
    });
    if (!existe) throw new Error("Carrera no encontrada");

    const [materias, semestres, usuarios] = await Promise.all([
        prisma.materia.count({ where: { idCarrera: id } }),
        prisma.semestre.count({ where: { carreraId: id } }),
        prisma.usuario.count({ where: { idCarrera: id } }),
    ]);

    if (materias > 0 || semestres > 0 || usuarios > 0) {
        throw new Error("No se puede eliminar: la carrera tiene registros asociados (materias/semestres/usuarios)");
    }

    return prisma.carrera.delete({ where: { id } });
}
