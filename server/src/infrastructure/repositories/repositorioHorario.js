import { prisma } from "../db/prisma.client.js";

const carreraWithFacultad = {
    include: { facultad: { select: { id: true, nombre: true } } },
};

const materiaInclude = {
    include: {
        carrera: carreraWithFacultad,
    },
};

export const horarioRepositorio = {
    materiaInclude,

    listar: () =>
        prisma.horario.findMany({
            orderBy: [{ dia: "asc" }, { horaInicio: "asc" }],
            include: { materia: materiaInclude },
        }),

    obtenerPorId: (id) =>
        prisma.horario.findUnique({
            where: { id },
            include: { materia: materiaInclude },
        }),

    listarPorMateria: (materiaId) =>
        prisma.horario.findMany({
            where: { materiaId },
            orderBy: [{ dia: "asc" }, { horaInicio: "asc" }],
            include: { materia: { select: { id: true, nombre: true, codigo: true } } },
        }),

    crear: (data) =>
        prisma.horario.create({
            data,
            include: { materia: materiaInclude },
        }),

    actualizar: (id, data) =>
        prisma.horario.update({
            where: { id },
            data,
            include: { materia: materiaInclude },
        }),

    eliminar: (id) =>
        prisma.horario.delete({
            where: { id },
            include: { materia: materiaInclude },
        }),

    existeMateria: (materiaId) => prisma.materia.findUnique({ where: { id: materiaId }, select: { id: true } }),

    haySolapamiento: async ({ idIgnorar, materiaId, dia, ini, fin }) => {
        const overlap = await prisma.horario.findFirst({
            where: {
                materiaId,
                dia,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
                AND: [{ horaInicio: { lt: fin } }, { horaFin: { gt: ini } }],
            },
            select: { id: true },
        });
        return Boolean(overlap);
    },
};
