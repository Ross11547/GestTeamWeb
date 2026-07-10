import { ErrorNoEncontrado, ErrorValidacion } from "../../../dominio/pizarra/erroresPizarra.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { pizarraRepositorio } from "../../../infrastructure/repositories/repositoriosPizarras.js";

export async function eliminarPizarraCasoUso(id) {
    const num = Number(id);
    if (!Number.isInteger(num) || num <= 0) throw new ErrorValidacion("id inválido");

    const existe = await prisma.pizarra.findUnique({ where: { id: num }, select: { id: true } });
    if (!existe) throw new ErrorNoEncontrado("Pizarra no encontrada");

    return pizarraRepositorio.eliminar(num);
}
