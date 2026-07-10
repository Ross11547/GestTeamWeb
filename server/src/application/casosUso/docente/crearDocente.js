import { prisma } from "../../../infrastructure/db/prisma.client.js";
import {
    makeInstitutionalEmail,
    obtenerSiglaCarrera,
    nombreFacultad,
    derivarSigla,
    buildCodigo,
} from "./codigoDocente.js";

export async function crearDocenteCasoUso({ rolId, body }) {
    const {
        nombre,
        apellido = "",
        telefono = "",
        ci,
        idFacultad = null,
        idCarrera = null,
        materiaIds = [],
        password = "123456",
        activo = true,
    } = body || {};

    if (!nombre || !ci) {
        const err = new Error("nombre y ci son requeridos");
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

    const correo = makeInstitutionalEmail(nombre, apellido);
    const siglaCarr = await obtenerSiglaCarrera(idCarrera);
    const facName = await nombreFacultad(idFacultad);

    const codigo = buildCodigo({
        ci: Number(ci),
        siglaCarrera: siglaCarr,
        siglaFallback: derivarSigla(facName),
    });

    let created;
    try {
        created = await prisma.usuario.create({
            data: {
                nombre,
                apellido,
                telefono,
                ci: Number(ci),
                correo,
                password,
                idRol: rolId,
                activo: Boolean(activo),
                idFacultad: idFacultad ? Number(idFacultad) : null,
                idCarrera: idCarrera ? Number(idCarrera) : null,
                codigo,
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

    if (Array.isArray(materiaIds) && materiaIds.length > 0) {
        await prisma.docenteMateria.createMany({
            data: materiaIds.map((mid) => ({ usuarioId: created.id, materiaId: Number(mid) })),
            skipDuplicates: true,
        });
    }

    return created;
}
