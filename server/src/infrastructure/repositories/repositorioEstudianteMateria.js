import { prisma } from "../db/prisma.client.js";

export const estudianteMateriaRepositorio = {
    listar: () =>
        prisma.estudianteMateria.findMany({
            orderBy: { id: "asc" },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    obtenerPorId: (id) =>
        prisma.estudianteMateria.findUnique({
            where: { id },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    crear: (data) =>
        prisma.estudianteMateria.create({
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    actualizar: (id, data) =>
        prisma.estudianteMateria.update({
            where: { id },
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    eliminar: (id) => prisma.estudianteMateria.delete({ where: { id } }),

    existeUsuario: (usuarioId) =>
        prisma.usuario.findUnique({ where: { id: usuarioId }, select: { id: true } }),

    existeMateria: (materiaId) =>
        prisma.materia.findUnique({ where: { id: materiaId }, select: { id: true } }),

    existePorUsuarioMateria: (usuarioId, materiaId, idIgnorar = null) =>
        prisma.estudianteMateria.findFirst({
            where: {
                usuarioId,
                materiaId,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
