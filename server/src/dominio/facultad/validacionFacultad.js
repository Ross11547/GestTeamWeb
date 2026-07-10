import { z } from "zod";

export const crearFacultad = z.object({
    institucionId: z.number().int().positive("institucionId inválido").optional().nullable(),
    nombre: z.string().min(2, "El nombre es obligatorio").transform(s => s.trim()),
    theme: z.any().optional().nullable(), // JSON o string JSON
});

export const actualizarFacultad = z.object({
    institucionId: z.number().int().positive().optional().nullable(),
    nombre: z.string().min(2).optional().transform(s => s.trim()),
    theme: z.any().optional().nullable(),
});

export const listarFacultad = z.object({
    institucionId: z
        .string()
        .optional()
        .transform(v => (v ? Number(v) : undefined)),
    q: z.string().optional().transform(v => (v ? String(v).trim() : undefined)),
});

export function parseTheme(theme) {
    if (theme == null) return null;
    if (typeof theme === "object") return theme;
    if (typeof theme === "string") {
        const t = theme.trim();
        if (t === "") return null;
        try {
            return JSON.parse(t);
        } catch {
            return null;
        }
    }
    return null;
}
