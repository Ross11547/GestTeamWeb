import { z } from "zod";

const correo = z
    .string({ required_error: "El correo es obligatorio" })
    .trim()
    .email("El correo debe tener un formato válido")
    .max(120, "El correo es demasiado largo");

const telefono = z.string().trim().min(3, "El teléfono es obligatorio").max(30);

const nombre = z.string().trim().min(2, "El nombre es obligatorio").max(80);
const apellido = z.string().trim().min(2, "El apellido es obligatorio").max(120);

const intPositivo = (mensaje) =>
    z.coerce.number().int(mensaje).positive(mensaje);

export const crearUsuario = z
    .object({
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        ci: intPositivo("El CI debe ser un número válido y positivo"),
        correo: correo,
        password: z.string().min(6, "El password debe tener al menos 6 caracteres").max(200),
        confirmaPassword: z.string().min(6).max(200),
        idRol: intPositivo("idRol es requerido"),
        activo: z.coerce.boolean(),

        codigo: z.string().trim().max(50).optional().nullable(),
        idFacultad: z.coerce.number().int().positive().optional().nullable(),
        idCarrera: z.coerce.number().int().positive().optional().nullable(),
        semestreId: z.coerce.number().int().positive().optional().nullable(),
        esDirector: z.coerce.boolean().optional(),
    })
    .refine((x) => x.password === x.confirmaPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmaPassword"],
    });

export const actualizarUsuario = z.object({
    nombre: nombre.optional(),
    apellido: apellido.optional(),
    telefono: telefono.optional(),
    ci: z.coerce.number().int().positive().optional(),
    correo: correo.optional(),

    // si viene password, la hasheamos
    password: z.string().min(6).max(200).optional(),

    idRol: z.coerce.number().int().positive().optional(),
    activo: z.coerce.boolean().optional(),

    codigo: z.string().trim().max(50).optional().nullable(),
    idFacultad: z.coerce.number().int().positive().optional().nullable(),
    idCarrera: z.coerce.number().int().positive().optional().nullable(),
    semestreId: z.coerce.number().int().positive().optional().nullable(),
    esDirector: z.coerce.boolean().optional(),
});

export const login = z.object({
    correo: correo,
    password: z.string().min(1, "El password es requerido").max(200),
});
