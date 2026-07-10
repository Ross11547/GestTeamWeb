import { z } from "zod";

const tiposGrupo = ["INDIVIDUAL", "GRUPAL", "COLABORATIVO"];
const estadosProyecto = ["BORRADOR", "EN DESARROLLO", "TERMINADO", "PENDIENTE"];

export const crearProyecto = z.object({
    titulo: z
        .string({ required_error: "El título es obligatorio" })
        .trim()
        .min(2, "El título es obligatorio")
        .max(120, "El título es demasiado largo"),

    descripcion: z
        .string()
        .trim()
        .max(2000, "La descripción es demasiado larga")
        .optional(),

    codigoMateria: z
        .string()
        .trim()
        .max(50, "El código de materia es demasiado largo")
        .optional(),

    tipoGrupo: z.enum(tiposGrupo, {
        required_error: "El tipo de grupo es obligatorio",
        invalid_type_error: "El tipo de grupo es inválido",
    }).optional(),

    estado: z.enum(estadosProyecto, {
        required_error: "El estado del proyecto es obligatorio",
        invalid_type_error: "El estado del proyecto es inválido",
    }).optional(),

    repoUrl: z
        .string()
        .trim()
        .url("El repoUrl debe ser una URL válida")
        .max(500, "El repoUrl es demasiado largo")
        .optional(),
});

export const actualizarProyecto = z.object({
    titulo: z.string().trim().min(2, "El título no puede estar vacío").max(120, "El título es demasiado largo").optional(),

    descripcion: z.string().trim().max(2000, "La descripción es demasiado larga").optional(),

    codigoMateria: z.string().trim().max(50, "El código de materia es demasiado largo").optional(),

    tipoGrupo: z.enum(tiposGrupo, { invalid_type_error: "El tipo de grupo es inválido" }).optional(),

    estado: z.enum(estadosProyecto, { invalid_type_error: "El estado del proyecto es inválido" }).optional(),

    repoUrl: z.string().trim().url("El repoUrl debe ser una URL válida").max(500, "El repoUrl es demasiado largo").optional(),
});
