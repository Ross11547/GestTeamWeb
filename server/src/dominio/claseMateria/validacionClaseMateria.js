import { z } from "zod";

const idPositivo = (msg) => z.coerce.number().int(msg).positive(msg);

export const crearClaseMateria = z.object({
    periodoId: idPositivo("periodoId es requerido"),
    materiaId: idPositivo("materiaId es requerido"),

    docenteId: z.coerce.number().int().positive().optional().nullable(), // puede ser null

    paralelo: z.string().trim().max(20).optional().nullable(),
    aula: z.string().trim().max(50).optional().nullable(),
});

export const actualizarClaseMateria = z.object({
    periodoId: z.coerce.number().int().positive().optional(),
    materiaId: z.coerce.number().int().positive().optional(),

    docenteId: z.coerce.number().int().positive().optional().nullable(),

    paralelo: z.string().trim().max(20).optional().nullable(),
    aula: z.string().trim().max(50).optional().nullable(),
});
