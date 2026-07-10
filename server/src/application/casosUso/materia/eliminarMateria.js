import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { materiaRepositorio } from "../../../infrastructure/repositories/repositorioMateria.js";

export async function eliminarMateriaCasoUso(id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("ID inválido");

    const existe = await prisma.materia.findUnique({ where: { id }, select: { id: true } });
    if (!existe) throw new Error("Materia no encontrada");

    const rel = await materiaRepositorio.relacionesParaBorrado(id);

    if (rel.clases > 0 || rel.equipos > 0 || rel.proyectosMateria > 0) {
        throw new Error("No se puede eliminar: la materia ya tiene clases/equipos/proyectos asociados");
    }

    await materiaRepositorio.limpiarRelacionesAntesDeBorrar(id);

    return prisma.materia.delete({
        where: { id },
        include: materiaRepositorio.includeBase,
    });
}
