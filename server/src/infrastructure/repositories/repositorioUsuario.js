import { prisma } from "../db/prisma.client.js";

const includeBasico = {
    rol: { select: { id: true, nombre: true } },
    facultad: { select: { id: true, nombre: true, theme: true } },
    carrera: { select: { id: true, nombre: true, sigla: true } },
    semestre: { select: { id: true, numero: true, etiqueta: true, carreraId: true } },
};

export const usuarioRepositorio = {
    listar: () =>
        prisma.usuario.findMany({
            orderBy: { id: "desc" },
            include: includeBasico,
        }),

    obtenerPorId: (id) =>
        prisma.usuario.findUnique({
            where: { id },
            include: includeBasico,
        }),

    obtenerPorCorreo: (correo) =>
        prisma.usuario.findUnique({
            where: { correo },
            include: includeBasico,
        }),

    crear: (data) =>
        prisma.usuario.create({
            data,
            include: includeBasico,
        }),

    actualizar: (id, data) =>
        prisma.usuario.update({
            where: { id },
            data,
            include: includeBasico,
        }),

    eliminar: (id) => prisma.usuario.delete({ where: { id } }),

    existeCorreo: (correo, idIgnorar = null) =>
        prisma.usuario.findFirst({
            where: {
                correo: { equals: correo, mode: "insensitive" },
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),

    existeCodigo: (codigo, idIgnorar = null) =>
        prisma.usuario.findFirst({
            where: {
                codigo: String(codigo),
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),

    existeRol: (idRol) => prisma.rol.findUnique({ where: { id: idRol }, select: { id: true } }),
    existeFacultad: (id) => prisma.facultad.findUnique({ where: { id }, select: { id: true } }),
    existeCarrera: (id) => prisma.carrera.findUnique({ where: { id }, select: { id: true, idFacultad: true } }),
    existeSemestre: (id) => prisma.semestre.findUnique({ where: { id }, select: { id: true, carreraId: true } }),
};
