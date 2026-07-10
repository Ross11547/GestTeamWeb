import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { horarioRepositorio } from "../../../infrastructure/repositories/repositorioHorario.js";

export async function eliminarHorarioCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("ID inválido");

    const exists = await prisma.horario.findUnique({ where: { id }, select: { id: true } });
    if (!exists) throw new Error("Horario no encontrado");

    return horarioRepositorio.eliminar(id);
}
