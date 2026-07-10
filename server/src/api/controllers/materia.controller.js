import { listarMateriaCasoUso } from "../../application/casosUso/materia/listarMaterias.js";
import { obtenerMateriaCasoUso } from "../../application/casosUso/materia/obtenerMateriaID.js";
import { crearMateriaCasoUso } from "../../application/casosUso/materia/crearMateria.js";
import { actualizarMateriaCasoUso } from "../../application/casosUso/materia/actualizarMateria.js";
import { eliminarMateriaCasoUso } from "../../application/casosUso/materia/eliminarMateria.js";
import { listarMateriaPorSemestreCasoUso } from "../../application/casosUso/materia/listarMateriasPorSemestre.js";
import { listarMateriaPorCarreraCasoUso } from "../../application/casosUso/materia/listaMateriaPorCarrera.js";
import { listarMateriasMiasCasoUso } from "../../application/casosUso/materia/listarMateriasMias.js";
import { prisma } from "../../infrastructure/db/prisma.client.js";
import { ensureInt } from "../../dominio/materia/helpersMateria.js";

export async function listarMateria(req, res, next) {
    try {
        const data = await listarMateriaCasoUso(req.query);
        res.json({ data, mensaje: "Materias obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerMateria(req, res, next) {
    try {
        const data = await obtenerMateriaCasoUso(Number(req.params.id));
        res.json({ data, mensaje: "Materia obtenida correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearMateria(req, res, next) {
    try {
        const data = await crearMateriaCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Materia creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarMateria(req, res, next) {
    try {
        const data = await actualizarMateriaCasoUso(Number(req.params.id), req.body);
        res.json({ data, mensaje: "Materia actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarMateria(req, res, next) {
    try {
        const data = await eliminarMateriaCasoUso(Number(req.params.id));
        res.json({ data, mensaje: "Materia eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function listarMateriaPorSemestre(req, res, next) {
    try {
        const semestreId = ensureInt(req.query.semestreId);
        const data = await listarMateriaPorSemestreCasoUso(semestreId);
        res.json({ data, mensaje: "Materias por semestre obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function listarMateriaPorCarrera(req, res, next) {
    try {
        const idCarrera = ensureInt(req.query.idCarrera);
        const data = await listarMateriaPorCarreraCasoUso(idCarrera);
        res.json({ data, mensaje: "Materias por carrera obtenidas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function listarMateriasMias(req, res, next) {
    try {
        const materias = await listarMateriasMiasCasoUso(req);

        if (materias.length === 0) {
            return res.json({
                items: [],
                data: [],
                mensaje: "No hay materias asignadas a tu usuario.",
            });
        }

        res.json({
            items: materias,
            data: materias,
            mensaje: "Materias asignadas a tu usuario obtenidas correctamente.",
        });
    } catch (e) {
        next(e);
    }
}

export async function obtenerRelacionesMateria(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ mensaje: "ID inválido" });

        const rel = await prisma.materia.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!rel) return res.status(404).json({ mensaje: "Materia no encontrada" });

        const data = await prisma.$transaction([
            prisma.docenteMateria.count({ where: { materiaId: id } }),
            prisma.estudianteMateria.count({ where: { materiaId: id } }),
            prisma.inscripcion.count({ where: { materiaId: id } }),
            prisma.inscripcionMateria.count({ where: { materiaId: id } }),
            prisma.claseMateria.count({ where: { materiaId: id } }),
            prisma.equipo.count({ where: { materiaId: id } }),
            prisma.proyectoMateria.count({ where: { materiaId: id } }),
            prisma.horario.count({ where: { materiaId: id } }),
        ]);

        res.json({
            data: {
                docenteMateria: data[0],
                estudianteMateria: data[1],
                inscripciones: data[2],
                inscripcionesMateria: data[3],
                clases: data[4],
                equipos: data[5],
                proyectosMateria: data[6],
                horarios: data[7],
            },
            mensaje: "Relaciones obtenidas correctamente",
        });
    } catch (e) {
        next(e);
    }
}
