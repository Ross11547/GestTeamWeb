import { prisma } from "../db/prisma.client.js";

export const rolRepositorio = {
    listar: () => prisma.rol.findMany({ orderBy: { id: "asc" } }),

    obtenerPorId: (id) => prisma.rol.findUnique({ where: { id } }),

    crear: (data) => prisma.rol.create({ data }),

    actualizar: (id, data) => prisma.rol.update({ where: { id }, data }),

    eliminar: (id) => prisma.rol.delete({ where: { id } }),

    existePorNombre: (nombre, idIgnorar = null) =>
        prisma.rol.findFirst({
            where: {
                nombre: { equals: nombre, mode: "insensitive" },
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),

    contarUsuarios: (rolId) => prisma.usuario.count({ where: { idRol: rolId } }),
};
