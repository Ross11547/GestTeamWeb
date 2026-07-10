import { Prisma } from "@prisma/client";
import { actualizarCarrera, derivarSiglaDesdeNombre } from "../../../dominio/carrera/validacionCarrera.js";
import { carreraRepositorio } from "../../../infrastructure/repositories/repositorioCarrera.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function actualizarCarreraCasoUso(id, payload) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");
    const data = actualizarCarrera.parse(payload);

    const actual = await prisma.carrera.findUnique({
        where: { id },
        select: { id: true, nombre: true, idFacultad: true, sigla: true },
    });
    if (!actual) throw new Error("Carrera no encontrada");

    if (data.idFacultad !== undefined) {
        const fac = await prisma.facultad.findUnique({
            where: { id: data.idFacultad },
            select: { id: true },
        });
        if (!fac) throw new Error("La facultad indicada no existe");
    }

    const idFacultadFinal = data.idFacultad ?? actual.idFacultad;
    const nombreFinal = data.nombre ?? actual.nombre;

    if (data.nombre !== undefined || data.idFacultad !== undefined) {
        const dup = await carreraRepositorio.existePorNombreEnFacultad(idFacultadFinal, nombreFinal, id);
        if (dup) throw new Error("Ya existe una carrera con ese nombre en la facultad");
    }

    let siglaUpdate = {};
    if (data.sigla !== undefined) {
        siglaUpdate = { sigla: data.sigla };
    } else if (data.nombre !== undefined && !actual.sigla) {
        siglaUpdate = { sigla: derivarSiglaDesdeNombre(nombreFinal) };
    }

    try {
        return await carreraRepositorio.actualizar(id, {
            ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
            ...(data.idFacultad !== undefined ? { idFacultad: data.idFacultad } : {}),
            ...siglaUpdate,
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            throw new Error("La sigla ya está en uso");
        }
        throw e;
    }
}
