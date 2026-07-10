import { prisma } from "../db/prisma.client.js";

export const pizarraRepositorio = {
    crear: (data, tx = prisma) =>
        tx.pizarra.create({
            data,
            include: {
                creadoPor: { select: { id: true, nombre: true, apellido: true, correo: true } },
                colaboradores: {
                    include: { usuario: { select: { id: true, nombre: true, apellido: true, correo: true } } },
                },
            },
        }),

    listar: (where) =>
        prisma.pizarra.findMany({
            where,
            orderBy: { updatedAt: "desc" },
            select: {
                id: true,
                nombre: true,
                proyectoId: true,
                equipoId: true,
                periodoId: true,
                version: true,
                esPublica: true,
                creadoPorId: true,
                createdAt: true,
                updatedAt: true,
            },
        }),

    buscarPorId: (id) =>
        prisma.pizarra.findUnique({
            where: { id },
            include: {
                proyecto: { select: { id: true, titulo: true } },
                equipo: { select: { id: true, nombre: true } },
                periodo: { select: { id: true, nombre: true } },
                creadoPor: { select: { id: true, nombre: true, apellido: true, correo: true } },
                colaboradores: {
                    include: { usuario: { select: { id: true, nombre: true, apellido: true, correo: true } } },
                },
            },
        }),

    actualizar: (id, data) =>
        prisma.pizarra.update({ where: { id }, data }),

    eliminar: (id) =>
        prisma.pizarra.delete({ where: { id } }),

    reemplazarColaboradores: ({ pizarraId, colaboradores, agregadoPorId }) =>
        prisma.$transaction(async (tx) => {
            await tx.pizarraColaborador.deleteMany({ where: { pizarraId } });

            if (colaboradores.length > 0) {
                await tx.pizarraColaborador.createMany({
                    data: colaboradores.map(c => ({
                        pizarraId,
                        usuarioId: c.usuarioId,
                        rol: c.rol ?? "EDITOR",
                        agregadoPorId: agregadoPorId ?? null,
                    })),
                    skipDuplicates: true,
                });
            }

            return tx.pizarra.findUnique({
                where: { id: pizarraId },
                include: {
                    colaboradores: {
                        include: { usuario: { select: { id: true, nombre: true, apellido: true, correo: true } } },
                    },
                },
            });
        }),
};
