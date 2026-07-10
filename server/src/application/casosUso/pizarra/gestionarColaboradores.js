import { colaboradores } from "../../../dominio/pizarra/validacionesPizarra.js";
import { ErrorNoEncontrado, ErrorValidacion } from "../../../dominio/pizarra/erroresPizarra.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { pizarraRepositorio } from "../../../infrastructure/repositories/repositoriosPizarras.js";

export async function reemplazarColaboradoresCasoUso(id, payload) {
    const pizarraId = Number(id);
    if (!Number.isInteger(pizarraId) || pizarraId <= 0) throw new ErrorValidacion("id inválido");

    const parsed = colaboradores.safeParse(payload);
    if (!parsed.success) throw new ErrorValidacion("Datos inválidos", parsed.error.flatten());

    const { colaboradores } = parsed.data;

    const pizarra = await prisma.pizarra.findUnique({
        where: { id: pizarraId },
        select: { id: true, creadoPorId: true },
    });
    if (!pizarra) throw new ErrorNoEncontrado("Pizarra no encontrada");

    // validar existencia usuarios
    if (colaboradores.length > 0) {
        const ids = [...new Set(colaboradores.map(c => Number(c.usuarioId)))];
        const existentes = await prisma.usuario.findMany({ where: { id: { in: ids } }, select: { id: true } });
        if (existentes.length !== ids.length) throw new ErrorValidacion("Uno o más colaboradores no existen");
    }

    // regla: aseguramos que el creador sea OWNER si está en la lista; si no, lo agregamos
    const yaIncluyeCreador = colaboradores.some(c => Number(c.usuarioId) === pizarra.creadoPorId);
    const listaFinal = yaIncluyeCreador
        ? colaboradores.map(c => (Number(c.usuarioId) === pizarra.creadoPorId ? { ...c, rol: "OWNER" } : c))
        : [{ usuarioId: pizarra.creadoPorId, rol: "OWNER" }, ...colaboradores];

    const updated = await pizarraRepositorio.reemplazarColaboradores({
        pizarraId,
        colaboradores: listaFinal,
        agregadoPorId: pizarra.creadoPorId,
    });

    return updated;
}
