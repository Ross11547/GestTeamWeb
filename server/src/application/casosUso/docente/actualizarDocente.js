import { prisma } from "../../../infrastructure/db/prisma.client.js";
import {
    makeInstitutionalEmail,
    obtenerSiglaCarrera,
    nombreFacultad,
    derivarSigla,
    buildCodigo,
} from "./codigoDocente.js";

export async function actualizarDocenteCasoUso({ id, rolId, body }) {
    const exists = await prisma.usuario.findUnique({ where: { id }, select: { idRol: true } });
    if (!exists || exists.idRol !== rolId) {
        const err = new Error("Docente no encontrado");
        err.status = 404;
        throw err;
    }

    const { nombre, apellido, telefono, ci, idFacultad, idCarrera, materiaIds, password, activo } = body || {};

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
            codigo: buildCodigo({ ci: newCi, siglaCarrera: siglaCarr, siglaFallback: derivarSigla(facName) }),
        };
    }

    let correoUpdate = {};
    if (nombre !== undefined || apellido !== undefined) {
        const u = await prisma.usuario.findUnique({ where: { id }, select: { nombre: true, apellido: true } });
        const newNom = nombre !== undefined ? nombre : u.nombre;
        const newApe = apellido !== undefined ? apellido : u.apellido;
        correoUpdate = { correo: makeInstitutionalEmail(newNom, newApe) };
    }

    let updated;
    try {
        updated = await prisma.usuario.update({
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
                ...codigoUpdate,
                ...correoUpdate,
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

    if (Array.isArray(materiaIds)) {
        await prisma.docenteMateria.deleteMany({ where: { usuarioId: id } });

        if (materiaIds.length > 0) {
            await prisma.docenteMateria.createMany({
                data: materiaIds.map((mid) => ({ usuarioId: id, materiaId: Number(mid) })),
                skipDuplicates: true,
            });
        }
    }

    return updated;
}
