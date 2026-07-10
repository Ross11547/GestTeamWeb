import { z } from "zod";

export const crearRol = z.object({
    nombre: z
        .string({ required_error: "El nombre del rol es obligatorio" })
        .trim()
        .min(2, "El nombre del rol es obligatorio")
        .max(50, "El nombre del rol es demasiado largo"),
});

export const actualizarRol = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, "El nombre no puede estar vacío")
        .max(50, "El nombre del rol es demasiado largo")
        .optional(),
});
