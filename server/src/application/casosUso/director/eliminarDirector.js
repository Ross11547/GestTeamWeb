import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function eliminarDirectorCasoUso({ id, rolId }) {
    const exists = await prisma.usuario.findUnique({
        where: { id },
        select: { idRol: true, esDirector: true },
    });

    if (!exists || exists.idRol !== rolId || !exists.esDirector) return null;

    await prisma.docenteMateria.deleteMany({ where: { usuarioId: id } });
    return await prisma.usuario.delete({ where: { id } });
}
