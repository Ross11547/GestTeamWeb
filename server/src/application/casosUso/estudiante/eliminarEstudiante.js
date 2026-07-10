import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function eliminarEstudianteCasoUso({ id, rolId }) {
    const exists = await prisma.usuario.findUnique({ where: { id }, select: { idRol: true } });
    if (!exists || exists.idRol !== rolId) return null;

    return await prisma.usuario.delete({ where: { id } });
}
