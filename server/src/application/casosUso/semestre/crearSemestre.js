import { Prisma } from "@prisma/client";
import { crearSemestre, etiquetaSemestre } from "../../../dominio/semestre/validacionSemestre.js";
import { semestreRepositorio } from "../../../infrastructure/repositories/repositorioSemestre.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function crearSemestreCasoUso(payload) {
    const data = crearSemestre.parse(payload);

    const carrera = await prisma.carrera.findUnique({ where: { id: data.carreraId }, select: { id: true } });
    if (!carrera) throw new Error("La carrera indicada no existe");

    const dup = await semestreRepositorio.existePorCarreraNumero(data.carreraId, data.numero);
    if (dup) throw new Error("Ya existe ese semestre para la carrera");

    const etiqueta = data.etiqueta && data.etiqueta.length > 0 ? data.etiqueta : etiquetaSemestre(data.numero);

    try {
        return await semestreRepositorio.crear({
            numero: data.numero,
            etiqueta,
            carreraId: data.carreraId,
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            throw new Error("Ya existe ese semestre para la carrera");
        }
        throw e;
    }
}
