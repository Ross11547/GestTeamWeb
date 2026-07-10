import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { buildEmail, siglaCarreraOrFallback, buildCodigo } from "./codigoEstudiante.js";

export async function actualizarEstudianteCasoUso({ id, rolId, body }) {
    const exists = await prisma.usuario.findUnique({
        where: { id },
        select: { idRol: true, idFacultad: true, idCarrera: true, ci: true, nombre: true, apellido: true },
    });

    if (!exists || exists.idRol !== rolId) {
        const err = new Error("Estudiante no encontrado");
        err.status = 404;
        throw err;
    }

    const { nombre, apellido, telefono, ci, idFacultad, idCarrera, semestreId, password, activo } = body || {};

    if (ci !== undefined && (!Number.isInteger(Number(ci)) || Number(ci) <= 0)) {
        const err = new Error("ci debe ser un número válido y positivo");
        err.status = 400;
        throw err;
    }

    if (idFacultad !== undefined && idFacultad !== null) {
        const fac = await prisma.facultad.findUnique({ where: { id: Number(idFacultad) } });
        if (!fac) {
            const err = new Error("La facultad indicada no existe");
            err.status = 400;
            throw err;
        }
    }

    if (idCarrera !== undefined && idCarrera !== null) {
        const car = await prisma.carrera.findUnique({ where: { id: Number(idCarrera) } });
        if (!car) {
            const err = new Error("La carrera indicada no existe");
            err.status = 400;
            throw err;
        }
    }

    if (semestreId !== undefined && semestreId !== null) {
        const sem = await prisma.semestre.findUnique({ where: { id: Number(semestreId) } });
        if (!sem) {
            const err = new Error("El semestre indicado no existe");
            err.status = 400;
            throw err;
        }
        const carreraIdToUse = idCarrera !== undefined ? Number(idCarrera) : exists.idCarrera;
        if (carreraIdToUse && sem.carreraId !== carreraIdToUse) {
            const err = new Error("El semestre no pertenece a la carrera seleccionada");
            err.status = 400;
            throw err;
        }
    }

    let emailUpdate = {};
    if (nombre !== undefined || apellido !== undefined) {
        const n = nombre !== undefined ? nombre : exists.nombre;
        const a = apellido !== undefined ? apellido : exists.apellido;
        emailUpdate = { correo: buildEmail({ nombres: n, apellidos: a }) };
    }

    let codigoUpdate = {};
    if (ci !== undefined || idCarrera !== undefined || idFacultad !== undefined) {
        const newCi = ci !== undefined ? Number(ci) : exists.ci;
        const newCar = idCarrera !== undefined ? Number(idCarrera) : exists.idCarrera;
        const newFac = idFacultad !== undefined ? Number(idFacultad) : exists.idFacultad;
        const sigla = await siglaCarreraOrFallback(newCar, newFac);
        codigoUpdate = { codigo: buildCodigo(sigla, newCi) };
    }

    try {
        return await prisma.usuario.update({
            where: { id },
            data: {
                ...(nombre !== undefined ? { nombre } : {}),
                ...(apellido !== undefined ? { apellido } : {}),
                ...(telefono !== undefined ? { telefono } : {}),
                ...(ci !== undefined ? { ci: Number(ci) } : {}),
                ...(idFacultad !== undefined ? { idFacultad: idFacultad ? Number(idFacultad) : null } : {}),
                ...(idCarrera !== undefined ? { idCarrera: idCarrera ? Number(idCarrera) : null } : {}),
                ...(semestreId !== undefined ? { semestreId: semestreId ? Number(semestreId) : null } : {}),
                ...(password !== undefined ? { password } : {}),
                ...(activo !== undefined ? { activo: Boolean(activo) } : {}),
                ...emailUpdate,
                ...codigoUpdate,
            },
        });
    } catch (error) {
        if (error?.code === "P2002") {
            const err = new Error("Correo o código ya existen");
            err.status = 409;
            throw err;
        }
        throw error;
    }
}
