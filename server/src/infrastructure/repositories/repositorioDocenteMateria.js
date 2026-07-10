import { prisma } from "../db/prisma.client.js";

export const docenteMateriaRepositorio = {
    listar: () =>
        prisma.docenteMateria.findMany({
            orderBy: { id: "asc" },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    obtenerPorId: (id) =>
        prisma.docenteMateria.findUnique({
            where: { id },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    crear: (data) =>
        prisma.docenteMateria.create({
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    actualizar: (id, data) =>
        prisma.docenteMateria.update({
            where: { id },
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
            },
        }),

    eliminar: (id) => prisma.docenteMateria.delete({ where: { id } }),

    existeUsuario: (usuarioId) =>
        prisma.usuario.findUnique({ where: { id: usuarioId }, select: { id: true, idRol: true } }),

    existeMateria: (materiaId) =>
        prisma.materia.findUnique({ where: { id: materiaId }, select: { id: true } }),

    existePorUsuarioMateria: (usuarioId, materiaId, idIgnorar = null) =>
        prisma.docenteMateria.findFirst({
            where: {
                usuarioId,
                materiaId,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
