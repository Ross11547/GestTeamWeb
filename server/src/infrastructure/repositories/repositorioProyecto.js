import { prisma } from "../db/prisma.client.js";

export const proyectoRepositorio = {
    listar: () =>
        prisma.proyecto.findMany({
            orderBy: { id: "asc" },
            include: {
                _count: {
                    select: {
                        miembros: true,
                        hitos: true,
                        equipos: true,
                        solicitudAccesoProyectos: true,
                        pizarras: true,
                    },
                },
            },
        }),

    obtenerPorId: (id) =>
        prisma.proyecto.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        miembros: true,
                        hitos: true,
                        equipos: true,
                        solicitudAccesoProyectos: true,
                        pizarras: true,
                    },
                },
            },
        }),

    crear: (data) =>
        prisma.proyecto.create({
            data,
            include: {
                _count: {
                    select: {
                        miembros: true,
                        hitos: true,
                        equipos: true,
                        solicitudAccesoProyectos: true,
                        pizarras: true,
                    },
                },
            },
        }),

    actualizar: (id, data) =>
        prisma.proyecto.update({
            where: { id },
            data,
            include: {
                _count: {
                    select: {
                        miembros: true,
                        hitos: true,
                        equipos: true,
                        solicitudAccesoProyectos: true,
                        pizarras: true,
                    },
                },
            },
        }),

    eliminar: (id) => prisma.proyecto.delete({ where: { id } }),
};
