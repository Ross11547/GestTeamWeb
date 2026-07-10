import { prisma } from "../../../infrastructure/db/prisma.client.js";
import {
    obtenerSiglaCarrera,
    nombreFacultad,
    siglaFromNombre,
    buildCodigo,
    buildCorreo,
    toDirectorDTO,
} from "./codigoDirector.js";

export async function crearDirectorCasoUso({ rolId, body }) {
    const {
        nombre,
        apellido = "",
        telefono = "",
        ci,
        correo,
        idFacultad = null,
        idCarrera = null,
        materiaIds = [],
        password = "123456",
        activo = true,
    } = body || {};

    if (!nombre || !apellido || !ci) {
        const err = new Error("nombre, apellido y ci son requeridos");
        err.status = 400;
        throw err;
    }
    if (!Number.isInteger(Number(ci)) || Number(ci) <= 0) {
        const err = new Error("ci debe ser un número válido y positivo");
        err.status = 400;
        throw err;
    }

    if (idFacultad !== null) {
        const fac = await prisma.facultad.findUnique({ where: { id: Number(idFacultad) } });
        if (!fac) {
            const err = new Error("La facultad indicada no existe");
            err.status = 400;
            throw err;
        }
    }
    if (idCarrera !== null) {
        const car = await prisma.carrera.findUnique({ where: { id: Number(idCarrera) } });
        if (!car) {
            const err = new Error("La carrera indicada no existe");
            err.status = 400;
            throw err;
        }
    }

    const siglaCarr = await obtenerSiglaCarrera(idCarrera);
    const facName = await nombreFacultad(idFacultad);
    const codigo = buildCodigo({
        ci: Number(ci),
        siglaCarrera: siglaCarr,
        siglaFallback: siglaFromNombre(facName),
    });

    const correoFinal =
        correo && String(correo).toLowerCase().endsWith("@unifranz.edu.bo")
            ? correo
            : buildCorreo({ nombres: nombre, apellidos: apellido });

    let created;
    try {
        created = await prisma.usuario.create({
            data: {
                nombre,
                apellido,
                telefono,
                ci: Number(ci),
                correo: correoFinal,
                password, // TODO: hash
                idRol: rolId,
                esDirector: true,
                activo: Boolean(activo),
                idFacultad: idFacultad ? Number(idFacultad) : null,
                idCarrera: idCarrera ? Number(idCarrera) : null,
                codigo,
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

    if (Array.isArray(materiaIds) && materiaIds.length > 0) {
        await prisma.docenteMateria.createMany({
            data: materiaIds.map((mid) => ({ usuarioId: created.id, materiaId: Number(mid) })),
            skipDuplicates: true,
        });
    }

    const full = await prisma.usuario.findUnique({
        where: { id: created.id },
        include: {
            facultad: { select: { id: true, nombre: true } },
            carrera: { select: { id: true, nombre: true, sigla: true } },
            docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
        },
    });

    return toDirectorDTO(full);
}
