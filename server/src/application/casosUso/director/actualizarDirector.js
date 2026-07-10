import { prisma } from "../../../infrastructure/db/prisma.client.js";
import {
    obtenerSiglaCarrera,
    nombreFacultad,
    siglaFromNombre,
    buildCodigo,
    buildCorreo,
    toDirectorDTO,
} from "./codigoDirector.js";

export async function actualizarDirectorCasoUso({ id, rolId, body }) {
    const exists = await prisma.usuario.findUnique({
        where: { id },
        select: { idRol: true, esDirector: true, nombre: true, apellido: true },
    });

    if (!exists || exists.idRol !== rolId || !exists.esDirector) {
        const err = new Error("Director no encontrado");
        err.status = 404;
        throw err;
    }

    const { nombre, apellido, telefono, ci, correo, idFacultad, idCarrera, materiaIds, password, activo } = body || {};

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

    // Código
    let codigoUpdate = {};
    if (ci !== undefined || idCarrera !== undefined || idFacultad !== undefined) {
        const u = await prisma.usuario.findUnique({
            where: { id },
            select: { ci: true, idCarrera: true, idFacultad: true },
        });

        const newCi = ci !== undefined ? Number(ci) : u.ci;
        const newCarr = idCarrera !== undefined ? Number(idCarrera) : u.idCarrera;
        const newFac = idFacultad !== undefined ? Number(idFacultad) : u.idFacultad;

        const siglaCarr = await obtenerSiglaCarrera(newCarr);
        const facName = await nombreFacultad(newFac);

        codigoUpdate = {
            codigo: buildCodigo({ ci: newCi, siglaCarrera: siglaCarr, siglaFallback: siglaFromNombre(facName) }),
        };
    }

    // Correo
    let correoUpdate = {};
    if (correo !== undefined) {
        correoUpdate = {
            correo: String(correo).toLowerCase().endsWith("@unifranz.edu.bo")
                ? correo
                : buildCorreo({ nombres: nombre ?? exists.nombre, apellidos: apellido ?? exists.apellido }),
        };
    }

    try {
        await prisma.usuario.update({
            where: { id },
            data: {
                ...(nombre !== undefined ? { nombre } : {}),
                ...(apellido !== undefined ? { apellido } : {}),
                ...(telefono !== undefined ? { telefono } : {}),
                ...(ci !== undefined ? { ci: Number(ci) } : {}),
                ...(idFacultad !== undefined ? { idFacultad: idFacultad ? Number(idFacultad) : null } : {}),
                ...(idCarrera !== undefined ? { idCarrera: idCarrera ? Number(idCarrera) : null } : {}),
                ...(password !== undefined ? { password } : {}),
                ...(activo !== undefined ? { activo: Boolean(activo) } : {}),
                esDirector: true,
                ...codigoUpdate,
                ...correoUpdate,
            },
        });
    } catch (error) {
        if (error?.code === "P2002") {
            const err = new Error("Correo/código en uso o ya existe un director para esa carrera");
            err.status = 409;
            throw err;
        }
        throw error;
    }

    if (Array.isArray(materiaIds)) {
        await prisma.docenteMateria.deleteMany({ where: { usuarioId: id } });
        if (materiaIds.length > 0) {
            await prisma.docenteMateria.createMany({
                data: materiaIds.map((mid) => ({ usuarioId: id, materiaId: Number(mid) })),
                skipDuplicates: true,
            });
        }
    }

    const full = await prisma.usuario.findUnique({
        where: { id },
        include: {
            facultad: { select: { id: true, nombre: true } },
            carrera: { select: { id: true, nombre: true, sigla: true } },
            docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
        },
    });

    return toDirectorDTO(full);
}
