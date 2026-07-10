import { z } from "zod";

export const listarMateria = z.object({
    idCarrera: z.string().optional().transform(v => (v ? Number(v) : undefined)),
    semestreId: z.string().optional().transform(v => (v ? Number(v) : undefined)),
    q: z.string().optional().transform(v => (v ? String(v).trim() : undefined)),
});

export const crearMateria = z.object({
    nombre: z.string().min(1, "nombre es requerido").transform(v => v.trim()),
    idCarrera: z.number().int().positive("idCarrera válido es requerido"),
    semestreId: z.number().int().positive().nullable().optional(),
});

export const actualizarMateria = z.object({
    nombre: z.string().min(1).transform(v => v.trim()).optional(),
    idCarrera: z.number().int().positive().optional(),
    semestreId: z.number().int().positive().nullable().optional(),
});
