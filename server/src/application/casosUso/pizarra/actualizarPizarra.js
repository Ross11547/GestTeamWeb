import { actualizarPizarra } from "../../../dominio/pizarra/validacionesPizarra.js";
import { ErrorNoEncontrado, ErrorValidacion } from "../../../dominio/pizarra/erroresPizarra.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { pizarraRepositorio } from "../../../infrastructure/repositories/repositoriosPizarras.js";

export async function actualizarPizarraCasoUso(id, payload) {
    const num = Number(id);
    if (!Number.isInteger(num) || num <= 0) throw new ErrorValidacion("id inválido");

    const parsed = actualizarPizarra.safeParse(payload);
    if (!parsed.success) throw new ErrorValidacion("Datos inválidos", parsed.error.flatten());

    const existe = await prisma.pizarra.findUnique({ where: { id: num }, select: { id: true } });
    if (!existe) throw new ErrorNoEncontrado("Pizarra no encontrada");

    const data = {};
    if (parsed.data.nombre !== undefined) data.nombre = parsed.data.nombre.trim();
    if (parsed.data.esPublica !== undefined) data.esPublica = Boolean(parsed.data.esPublica);

    const updated = await pizarraRepositorio.actualizar(num, data);
    return updated;
}
