import { prisma } from "../db/prisma.client.js";

const includeBase = {
    carrera: { include: { facultad: { select: { id: true, nombre: true } } } },
    semestre: { select: { id: true, numero: true, etiqueta: true, carreraId: true } },
};

export const materiaRepositorio = {
    includeBase,

    listar: (where) =>
        prisma.materia.findMany({
            where,
            orderBy: [{ idCarrera: "asc" }, { semestreId: "asc" }, { nombre: "asc" }],
            include: includeBase,
        }),

    obtenerPorId: (id) =>
        prisma.materia.findUnique({
            where: { id },
            include: includeBase,
        }),

    crear: (data) =>
        prisma.materia.create({
            data,
            include: includeBase,
        }),

    actualizar: (id, data) =>
        prisma.materia.update({
            where: { id },
            data,
            include: includeBase,
        }),

    eliminar: (id) => prisma.materia.delete({ where: { id } }),

    existePorCodigo: (codigo) => prisma.materia.findUnique({ where: { codigo } }),

    relacionesParaBorrado: async (materiaId) => {
        const [
            docenteMateria,
            estudianteMateria,
            inscripciones,
            inscripcionesMateria,
            clases,
            equipos,
            proyectosMateria,
            horarios,
        ] = await Promise.all([
            prisma.docenteMateria.count({ where: { materiaId } }),
            prisma.estudianteMateria.count({ where: { materiaId } }),
            prisma.inscripcion.count({ where: { materiaId } }),
            prisma.inscripcionMateria.count({ where: { materiaId } }),
            prisma.claseMateria.count({ where: { materiaId } }),
            prisma.equipo.count({ where: { materiaId } }),
            prisma.proyectoMateria.count({ where: { materiaId } }),
            prisma.horario.count({ where: { materiaId } }),
        ]);

        return {
            docenteMateria,
            estudianteMateria,
            inscripciones,
            inscripcionesMateria,
            clases,
            equipos,
            proyectosMateria,
            horarios,
        };
    },

    limpiarRelacionesAntesDeBorrar: async (materiaId) => {
        await prisma.$transaction([
            prisma.docenteMateria.deleteMany({ where: { materiaId } }),
            prisma.estudianteMateria.deleteMany({ where: { materiaId } }),
            prisma.inscripcion.deleteMany({ where: { materiaId } }),
            prisma.inscripcionMateria.deleteMany({ where: { materiaId } }),
            prisma.horario.deleteMany({ where: { materiaId } }),
        ]);
    },
};
