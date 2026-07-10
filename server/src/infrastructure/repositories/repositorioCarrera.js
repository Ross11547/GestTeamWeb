import { prisma } from "../db/prisma.client.js";

const includeFacultad = {
    facultad: { select: { id: true, nombre: true, institucionId: true } },
};

export const carreraRepositorio = {
    listar: (where) =>
        prisma.carrera.findMany({
            where,
            include: includeFacultad,
            orderBy: { id: "desc" },
        }),

    obtenerPorId: (id) =>
        prisma.carrera.findUnique({
            where: { id },
            include: includeFacultad,
        }),

    crear: (data) =>
        prisma.carrera.create({
            data,
            include: includeFacultad,
        }),

    actualizar: (id, data) =>
        prisma.carrera.update({
            where: { id },
            data,
            include: includeFacultad,
        }),

    eliminar: (id) => prisma.carrera.delete({ where: { id } }),

    existePorNombreEnFacultad: (idFacultad, nombre, idIgnorar) =>
        prisma.carrera.findFirst({
            where: {
                idFacultad,
                nombre,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
