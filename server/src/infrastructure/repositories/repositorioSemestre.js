import { prisma } from "../db/prisma.client.js";

const includeCarrera = {
    carrera: { select: { id: true, nombre: true, idFacultad: true } },
};

export const semestreRepositorio = {
    listar: (where) =>
        prisma.semestre.findMany({
            where,
            orderBy: [{ carreraId: "asc" }, { numero: "asc" }],
            include: includeCarrera,
        }),

    listarPorCarrera: (carreraId) =>
        prisma.semestre.findMany({
            where: { carreraId },
            orderBy: { numero: "asc" },
            select: { id: true, numero: true, etiqueta: true, carreraId: true },
        }),

    obtenerPorId: (id) =>
        prisma.semestre.findUnique({
            where: { id },
            include: includeCarrera,
        }),

    crear: (data) =>
        prisma.semestre.create({
            data,
            include: includeCarrera,
        }),

    actualizar: (id, data) =>
        prisma.semestre.update({
            where: { id },
            data,
            include: includeCarrera,
        }),

    eliminar: (id) => prisma.semestre.delete({ where: { id } }),

    existePorCarreraNumero: (carreraId, numero, idIgnorar) =>
        prisma.semestre.findFirst({
            where: {
                carreraId,
                numero,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
