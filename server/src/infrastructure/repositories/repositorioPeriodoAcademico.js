import { prisma } from "../db/prisma.client.js";

export const periodoAcademicoRepositorio = {
    crear: (data) => prisma.periodoAcademico.create({ data }),

    actualizar: (id, data) =>
        prisma.periodoAcademico.update({ where: { id }, data }),

    eliminar: (id) => prisma.periodoAcademico.delete({ where: { id } }),

    obtenerPorId: (id) => prisma.periodoAcademico.findUnique({ where: { id } }),

    listar: (where) =>
        prisma.periodoAcademico.findMany({
            where,
            orderBy: { fechaIni: "desc" },
            include: {
                institucion: { select: { id: true, nombre: true, slug: true } },
            },
        }),

    desactivarTodos: (institucionId) =>
        prisma.periodoAcademico.updateMany({
            where: { institucionId, activo: true },
            data: { activo: false },
        }),

    existeNombreEnInstitucion: (institucionId, nombre, idIgnorar) =>
        prisma.periodoAcademico.findFirst({
            where: {
                institucionId,
                nombre,
                ...(idIgnorar ? { NOT: { id: idIgnorar } } : {}),
            },
            select: { id: true },
        }),
};
