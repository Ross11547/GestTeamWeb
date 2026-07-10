import { z } from "zod";

export const crearCarrera = z.object({
    nombre: z.string().min(2, "El nombre es obligatorio").transform(s => s.trim()),
    idFacultad: z.number().int().positive("idFacultad inválido"),
    sigla: z
        .string()
        .optional()
        .nullable()
        .transform(v => (v == null ? null : String(v).trim().toUpperCase()))
        .refine(v => v == null || /^[A-Z0-9]{2,10}$/.test(v), "sigla inválida (2-10, letras/números)"),
});

export const actualizarCarrera = z.object({
    nombre: z.string().min(2).optional().transform(s => s.trim()),
    idFacultad: z.number().int().positive().optional(),
    sigla: z
        .string()
        .optional()
        .nullable()
        .transform(v => (v == null ? null : String(v).trim().toUpperCase()))
        .refine(v => v == null || /^[A-Z0-9]{2,10}$/.test(v), "sigla inválida (2-10, letras/números)"),
});

export const listarCarrera = z.object({
    idFacultad: z.string().optional().transform(v => (v ? Number(v) : undefined)),
    q: z.string().optional().transform(v => (v ? String(v).trim() : undefined)),
});

export function derivarSiglaDesdeNombre(nombre = "") {
    const limpio = String(nombre)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    const partes = limpio
        .split(/\s+/)
        .filter(Boolean)
        .filter(w => !["de", "del", "la", "el", "y"].includes(w.toLowerCase()));

    const ultima = partes[partes.length - 1] || "";
    const sigla = ultima.slice(0, 3).toUpperCase();
    return sigla || "GEN";
}
