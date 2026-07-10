import { z } from "zod";

export const crearPeriodoAcademico = z.object({
    institucionId: z.number().int().positive("institucionId inválido"),
    nombre: z.string().min(3, "El nombre es obligatorio"), // "2026-1"
    fechaIni: z.string().datetime("fechaIni debe ser ISO datetime"),
    fechaFin: z.string().datetime("fechaFin debe ser ISO datetime"),
    activo: z.boolean().optional(),
});

export const actualizarPeriodoAcademico = z.object({
    nombre: z.string().min(3).optional(),
    fechaIni: z.string().datetime().optional(),
    fechaFin: z.string().datetime().optional(),
    activo: z.boolean().optional(),
});

export const listarPeriodoAcademico = z.object({
    institucionId: z
        .string()
        .optional()
        .transform(v => (v ? Number(v) : undefined)),
    activo: z
        .string()
        .optional()
        .transform(v => (v === undefined ? undefined : v === "true")),
});
