import { z } from "zod";

const idPositivo = z.coerce.number().int().positive();

const rolColaborador = z.enum(["OWNER", "EDITOR", "VIEWER"]);

export const listarPizarras = z.object({
    proyectoId: idPositivo.optional(),
    equipoId: idPositivo.optional(),
    periodoId: idPositivo.optional(),
});

export const crearPizarra = z.object({
    proyectoId: idPositivo,
    equipoId: idPositivo.optional().nullable(),
    periodoId: idPositivo.optional().nullable(),
    nombre: z.string().min(1, "nombre requerido").max(120, "nombre muy largo"),
    dataJson: z.any(),
    creadoPorId: idPositivo,
    esPublica: z.coerce.boolean().optional(),
    colaboradores: z.array(z.object({
        usuarioId: idPositivo,
        rol: rolColaborador.optional(),
    })).optional(),
});

export const actualizarPizarra = z.object({
    nombre: z.string().min(1).max(120).optional(),
    esPublica: z.coerce.boolean().optional(),
});

export const guardarContenido = z.object({
    dataJson: z.any(),
    version: z.coerce.number().int().positive(),
});

export const colaboradores = z.object({
    colaboradores: z.array(z.object({
        usuarioId: idPositivo,
        rol: rolColaborador.optional(),
    })),
});
