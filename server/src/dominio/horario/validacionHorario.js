import { z } from "zod";
import { DIAS_VALIDOS } from "./helpersHorario.js";

export const crearHorario = z.object({
    materiaId: z.number().int().positive("materiaId válido es requerido"),
    dia: z.string().transform(v => String(v || "").toUpperCase()),
    horaInicio: z.string(),
    horaFin: z.string(),
    aula: z.string().optional().default("").transform(v => String(v || "").trim()),
}).superRefine((val, ctx) => {
    if (!DIAS_VALIDOS.includes(val.dia)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "dia inválido", path: ["dia"] });
    }
});

export const actualizarHorario = z.object({
    materiaId: z.number().int().positive().optional(),
    dia: z.string().optional().transform(v => (v === undefined ? undefined : String(v || "").toUpperCase())),
    horaInicio: z.string().optional(),
    horaFin: z.string().optional(),
    aula: z.string().optional().transform(v => String(v || "").trim()),
}).superRefine((val, ctx) => {
    if (val.dia !== undefined && !DIAS_VALIDOS.includes(val.dia)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "dia inválido", path: ["dia"] });
    }
});
