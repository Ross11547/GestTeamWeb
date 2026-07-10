import { prisma } from "../db/prisma.client.js";

export const institucionRepositorio = {
    crear: (data) =>
        prisma.institucion.create({ data }),

    actualizar: (id, data) =>
        prisma.institucion.update({ where: { id }, data }),

    eliminar: (id) =>
        prisma.institucion.delete({ where: { id } }),

    obtenerPorId: (id) =>
        prisma.institucion.findUnique({ where: { id } }),

    obtenerPorSlug: (slug) =>
        prisma.institucion.findUnique({ where: { slug } }),

    listar: (filtros) =>
        prisma.institucion.findMany({
            where: filtros,
            orderBy: { createdAt: "desc" },
        }),
};
