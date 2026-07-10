import { Prisma } from "@prisma/client";
import { actualizarSemestre, etiquetaSemestre } from "../../../dominio/semestre/validacionSemestre.js";
import { semestreRepositorio } from "../../../infrastructure/repositories/repositorioSemestre.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function actualizarSemestreCasoUso(id, payload) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");

    const data = actualizarSemestre.parse(payload);

    const actual = await prisma.semestre.findUnique({
        where: { id },
        select: { id: true, numero: true, carreraId: true, etiqueta: true },
    });
    if (!actual) throw new Error("Semestre no encontrado");

    if (data.carreraId !== undefined) {
        const carrera = await prisma.carrera.findUnique({ where: { id: data.carreraId }, select: { id: true } });
        if (!carrera) throw new Error("La carrera indicada no existe");
    }

    const carreraIdFinal = data.carreraId ?? actual.carreraId;
    const numeroFinal = data.numero ?? actual.numero;

    if (data.carreraId !== undefined || data.numero !== undefined) {
        const dup = await semestreRepositorio.existePorCarreraNumero(carreraIdFinal, numeroFinal, id);
        if (dup) throw new Error("Ya existe ese semestre para la carrera");
    }

    let etiquetaUpdate = {};
    if (data.etiqueta !== undefined) {
        etiquetaUpdate = { etiqueta: data.etiqueta };
    } else if (data.numero !== undefined) {
        etiquetaUpdate = { etiqueta: etiquetaSemestre(numeroFinal) };
    }

    try {
        return await semestreRepositorio.actualizar(id, {
            ...(data.numero !== undefined ? { numero: data.numero } : {}),
            ...(data.carreraId !== undefined ? { carreraId: data.carreraId } : {}),
            ...etiquetaUpdate,
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            throw new Error("Ya existe ese semestre para la carrera");
        }
        throw e;
    }
}
