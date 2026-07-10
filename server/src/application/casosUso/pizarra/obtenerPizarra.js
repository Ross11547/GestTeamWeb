import { ErrorNoEncontrado, ErrorValidacion } from "../../../dominio/pizarra/erroresPizarra.js";
import { pizarraRepositorio } from "../../../infrastructure/repositories/repositoriosPizarras.js";

export async function obtenerPizarraCasoUso(id) {
    const num = Number(id);
    if (!Number.isInteger(num) || num <= 0) throw new ErrorValidacion("id inválido");

    const data = await pizarraRepositorio.buscarPorId(num);
    if (!data) throw new ErrorNoEncontrado("Pizarra no encontrada");

    return data;
}
