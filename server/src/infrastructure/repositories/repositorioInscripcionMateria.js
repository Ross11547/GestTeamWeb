import { prisma } from "../db/prisma.client.js";

export const inscripcionMateriaRepositorio = {
    listar: () =>
        prisma.inscripcionMateria.findMany({
            orderBy: { id: "asc" },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                periodo: { select: { id: true, nombre: true, fechaIni: true, fechaFin: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
                clase: {
                    select: {
                        id: true,
                        paralelo: true,
                        aula: true,
                        periodoId: true,
                        materiaId: true,
                        docenteId: true,
                    },
                },
            },
        }),

    obtenerPorId: (id) =>
        prisma.inscripcionMateria.findUnique({
            where: { id },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                periodo: { select: { id: true, nombre: true, fechaIni: true, fechaFin: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
                clase: {
                    select: {
                        id: true,
                        paralelo: true,
                        aula: true,
                        periodoId: true,
                        materiaId: true,
                        docenteId: true,
                    },
                },
            },
        }),

    crear: (data) =>
        prisma.inscripcionMateria.create({
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                periodo: { select: { id: true, nombre: true, fechaIni: true, fechaFin: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
                clase: {
                    select: {
                        id: true,
                        paralelo: true,
                        aula: true,
                        periodoId: true,
                        materiaId: true,
                        docenteId: true,
                    },
                },
            },
        }),

    actualizar: (id, data) =>
        prisma.inscripcionMateria.update({
            where: { id },
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true, correo: true } },
                periodo: { select: { id: true, nombre: true, fechaIni: true, fechaFin: true } },
                materia: { select: { id: true, nombre: true, codigo: true } },
                clase: {
                    select: {
                        id: true,
                        paralelo: true,
                        aula: true,
                        periodoId: true,
                        materiaId: true,
                        docenteId: true,
                    },
                },
            },
        }),

    eliminar: (id) => prisma.inscripcionMateria.delete({ where: { id } }),

    existeUsuario: (usuarioId) =>
        prisma.usuario.findUnique({ where: { id: usuarioId }, select: { id: true } }),

    existePeriodo: (periodoId) =>
        prisma.periodoAcademico.findUnique({ where: { id: periodoId }, select: { id: true } }),

    existeMateria: (materiaId) =>
        prisma.materia.findUnique({ where: { id: materiaId }, select: { id: true } }),

    obtenerClase: (claseId) =>
        prisma.claseMateria.findUnique({
            where: { id: claseId },
            select: { id: true, periodoId: true, materiaId: true },
        }),

    existePorUsuarioPeriodoMateria: (usuarioId, periodoId, materiaId, idIgnorar = null) =>
        prisma.inscripcionMateria.findFirst({
            where: {
                usuarioId,
                periodoId,
                materiaId,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
