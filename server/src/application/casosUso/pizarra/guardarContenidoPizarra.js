import { guardarContenido } from "../../../dominio/pizarra/validacionesPizarra.js";
import { ErrorConflicto, ErrorNoEncontrado, ErrorValidacion } from "../../../dominio/pizarra/erroresPizarra.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

function validarJsonObjeto(dataJson) {
    if (!dataJson || typeof dataJson !== "object" || Array.isArray(dataJson)) {
        throw new ErrorValidacion("dataJson debe ser un objeto JSON válido");
    }
}

export async function guardarContenidoPizarraCasoUso(id, payload) {
    const num = Number(id);
    if (!Number.isInteger(num) || num <= 0) throw new ErrorValidacion("id inválido");

    const parsed = guardarContenido.safeParse(payload);
    if (!parsed.success) throw new ErrorValidacion("Datos inválidos", parsed.error.flatten());

    const { dataJson, version } = parsed.data;
    validarJsonObjeto(dataJson);

    const actual = await prisma.pizarra.findUnique({ where: { id: num }, select: { id: true, version: true } });
    if (!actual) throw new ErrorNoEncontrado("Pizarra no encontrada");

    if (actual.version !== version) {
        throw new ErrorConflicto("La pizarra cambió. Recarga antes de guardar.", { versionActual: actual.version });
    }

    // optimistic lock
    const updated = await prisma.pizarra.update({
        where: { id: num },
        data: {
            dataJson,
            version: { increment: 1 },
        },
        select: { id: true, version: true, updatedAt: true },
    });

    return updated;
}
