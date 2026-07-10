import { crearPizarra } from "../../../dominio/pizarra/validacionesPizarra.js";
import { ErrorNoEncontrado, ErrorValidacion } from "../../../dominio/pizarra//erroresPizarra.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { pizarraRepositorio } from "../../../infrastructure/repositories/repositoriosPizarras.js";

function validarJsonObjeto(dataJson) {
    if (!dataJson || typeof dataJson !== "object" || Array.isArray(dataJson)) {
        throw new ErrorValidacion("dataJson debe ser un objeto JSON válido");
    }
}

export async function crearPizarraCasoUso(payload) {
    const parsed = crearPizarra.safeParse(payload);
    if (!parsed.success) throw new ErrorValidacion("Datos inválidos", parsed.error.flatten());

    const { colaboradores = [], dataJson, ...dto } = parsed.data;

    validarJsonObjeto(dataJson);

    const proyecto = await prisma.proyecto.findUnique({ where: { id: dto.proyectoId }, select: { id: true } });
    if (!proyecto) throw new ErrorNoEncontrado("Proyecto no existe");

    if (dto.equipoId) {
        const equipo = await prisma.equipo.findUnique({
            where: { id: Number(dto.equipoId) },
            select: { id: true, proyectoId: true },
        });
        if (!equipo) throw new ErrorNoEncontrado("Equipo no existe");
        if (equipo.proyectoId !== dto.proyectoId) throw new ErrorValidacion("El equipo no pertenece al proyecto");
    }

    if (dto.periodoId) {
        const periodo = await prisma.periodoAcademico.findUnique({ where: { id: Number(dto.periodoId) }, select: { id: true } });
        if (!periodo) throw new ErrorNoEncontrado("Periodo académico no existe");
    }

    // Validar usuarios colaboradores (si vienen)
    if (colaboradores.length > 0) {
        const ids = [...new Set(colaboradores.map(c => Number(c.usuarioId)))];
        const existentes = await prisma.usuario.findMany({ where: { id: { in: ids } }, select: { id: true } });
        if (existentes.length !== ids.length) throw new ErrorValidacion("Uno o más colaboradores no existen");
    }

    // Crear con transacción
    const creada = await prisma.$transaction(async (tx) => {
        const p = await pizarraRepositorio.crear({
            proyectoId: dto.proyectoId,
            equipoId: dto.equipoId ? Number(dto.equipoId) : null,
            periodoId: dto.periodoId ? Number(dto.periodoId) : null,
            nombre: dto.nombre.trim(),
            esPublica: dto.esPublica ?? false,
            dataJson,
            version: 1,
            creadoPorId: dto.creadoPorId,
            colaboradores: colaboradores.length
                ? {
                    create: colaboradores.map(c => ({
                        usuarioId: Number(c.usuarioId),
                        rol: c.rol ?? "EDITOR",
                        agregadoPorId: dto.creadoPorId,
                    })),
                }
                : undefined,
        }, tx);

        return p;
    });

    return creada;
}
