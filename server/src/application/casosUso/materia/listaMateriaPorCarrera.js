import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function listarMateriaPorCarreraCasoUso(idCarrera) {
    if (!Number.isInteger(idCarrera) || idCarrera <= 0) throw new Error("idCarrera requerido");

    return prisma.materia.findMany({
        where: { idCarrera },
        orderBy: [{ semestreId: "asc" }, { nombre: "asc" }],
        select: { id: true, nombre: true, codigo: true, idCarrera: true, semestreId: true },
    });
}
