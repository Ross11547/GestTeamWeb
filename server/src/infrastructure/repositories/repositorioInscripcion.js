import { prisma } from "../db/prisma.client.js";

export const inscripcionRepositorio = {
    listar: () =>
        prisma.inscripcion.findMany({
            orderBy: { id: "asc" },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    obtenerPorId: (id) =>
        prisma.inscripcion.findUnique({
            where: { id },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    crear: (data) =>
        prisma.inscripcion.create({
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    actualizar: (id, data) =>
        prisma.inscripcion.update({
            where: { id },
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    eliminar: (id) => prisma.inscripcion.delete({ where: { id } }),

    existePorUsuarioMateria: (usuarioId, materiaId, idIgnorar = null) =>
        prisma.inscripcion.findFirst({
            where: {
                usuarioId,
                materiaId,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),

    existeUsuario: (usuarioId) =>
        prisma.usuario.findUnique({ where: { id: usuarioId }, select: { id: true } }),

    existeMateria: (materiaId) =>
        prisma.materia.findUnique({ where: { id: materiaId }, select: { id: true } }),
};
