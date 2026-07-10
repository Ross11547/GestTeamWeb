import { prisma } from "../db/prisma.client.js";

export const facultadRepositorio = {
    listar: (where) =>
        prisma.facultad.findMany({
            where,
            orderBy: { id: "desc" },
            include: {
                institucion: { select: { id: true, nombre: true, slug: true } },
            },
        }),

    obtenerPorId: (id) =>
        prisma.facultad.findUnique({
            where: { id },
            include: {
                institucion: { select: { id: true, nombre: true, slug: true } },
            },
        }),

    crear: (data) =>
        prisma.facultad.create({
            data,
            include: {
                institucion: { select: { id: true, nombre: true, slug: true } },
            },
        }),

    actualizar: (id, data) =>
        prisma.facultad.update({
            where: { id },
            data,
            include: {
                institucion: { select: { id: true, nombre: true, slug: true } },
            },
        }),

    eliminar: (id) => prisma.facultad.delete({ where: { id } }),

    existePorNombreEnInstitucion: (institucionId, nombre, idIgnorar) =>
        prisma.facultad.findFirst({
            where: {
                institucionId: institucionId ?? null,
                nombre,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
