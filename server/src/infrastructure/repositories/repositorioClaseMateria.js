import { prisma } from "../db/prisma.client.js";

const includeBase = {
    periodo: { select: { id: true, nombre: true, fechaIni: true, fechaFin: true, activo: true } },
    materia: {
        select: {
            id: true,
            nombre: true,
            codigo: true,
            idCarrera: true,
            semestreId: true,
            carrera: { select: { id: true, nombre: true, idFacultad: true, sigla: true } },
        },
    },
    docente: { select: { id: true, nombre: true, apellido: true, correo: true, idRol: true } },
};

export const claseMateriaRepositorio = {
    listar: (where = {}) =>
        prisma.claseMateria.findMany({
            where,
            orderBy: [{ periodoId: "desc" }, { materiaId: "asc" }, { paralelo: "asc" }],
            include: includeBase,
        }),

    obtenerPorId: (id) =>
        prisma.claseMateria.findUnique({
            where: { id },
            include: includeBase,
        }),

    crear: (data) =>
        prisma.claseMateria.create({
            data,
            include: includeBase,
        }),

    actualizar: (id, data) =>
        prisma.claseMateria.update({
            where: { id },
            data,
            include: includeBase,
        }),

    eliminar: (id) => prisma.claseMateria.delete({ where: { id } }),

    existePeriodo: (id) =>
        prisma.periodoAcademico.findUnique({ where: { id }, select: { id: true, institucionId: true } }),

    existeMateria: (id) =>
        prisma.materia.findUnique({ where: { id }, select: { id: true, idCarrera: true } }),

    existeUsuario: (id) =>
        prisma.usuario.findUnique({
            where: { id },
            select: { id: true, idRol: true, esDirector: true, activo: true },
        }),

    existeClaseSimilar: ({ periodoId, materiaId, paralelo, idIgnorar = null }) =>
        prisma.claseMateria.findFirst({
            where: {
                periodoId,
                materiaId,
                paralelo: paralelo ?? null,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
