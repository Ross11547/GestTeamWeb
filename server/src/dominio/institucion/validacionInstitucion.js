import { z } from "zod";

export const crearInstitucion = z.object({
    nombre: z.string().min(3, "El nombre es obligatorio"),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug inválido"),
    activo: z.boolean().optional(),
});

export const actualizarInstitucion = z.object({
    nombre: z.string().min(3).optional(),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/).optional(),
    activo: z.boolean().optional(),
});

export const listarInstitucion = z.object({
    activo: z
        .string()
        .optional()
        .transform(v => (v === undefined ? undefined : v === "true")),
});
