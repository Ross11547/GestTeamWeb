import { z } from "zod";

export function etiquetaSemestre(numero) {
    const map = {
        1: "Primer semestre",
        2: "Segundo semestre",
        3: "Tercer semestre",
        4: "Cuarto semestre",
        5: "Quinto semestre",
        6: "Sexto semestre",
        7: "Séptimo semestre",
        8: "Octavo semestre",
        9: "Noveno semestre",
        10: "Décimo semestre",
        11: "Undécimo semestre",
        12: "Duodécimo semestre",
    };
    return map[numero] || `Semestre ${numero}`;
}

export const listarSemestre = z.object({
    carreraId: z.string().optional().transform(v => (v ? Number(v) : undefined)),
    q: z.string().optional().transform(v => (v ? String(v).trim() : undefined)),
});

export const crearSemestre = z.object({
    numero: z.number().int().min(1, "numero inválido").max(20, "numero inválido"),
    carreraId: z.number().int().positive("carreraId inválido"),
    etiqueta: z.string().optional().transform(v => (v ? String(v).trim() : undefined)),
});

export const actualizarSemestre = z.object({
    numero: z.number().int().min(1).max(20).optional(),
    carreraId: z.number().int().positive().optional(),
    etiqueta: z.string().optional().transform(v => (v ? String(v).trim() : undefined)),
});
