import { z } from "zod";

const enteroPositivo = (mensaje) =>
    z.preprocess(
        (v) => (v === "" || v === null || v === undefined ? v : Number(v)),
        z
            .number({ required_error: mensaje })
            .int(mensaje)
            .positive(mensaje)
    );

export const crearInscripcionMateria = z.object({
    usuarioId: enteroPositivo("El usuarioId es obligatorio y debe ser un entero positivo"),
    periodoId: enteroPositivo("El periodoId es obligatorio y debe ser un entero positivo"),
    materiaId: enteroPositivo("El materiaId es obligatorio y debe ser un entero positivo"),
    claseId: enteroPositivo("El claseId debe ser un entero positivo").optional(),
});

export const actualizarInscripcionMateria = z.object({
    usuarioId: enteroPositivo("El usuarioId debe ser un entero positivo").optional(),
    periodoId: enteroPositivo("El periodoId debe ser un entero positivo").optional(),
    materiaId: enteroPositivo("El materiaId debe ser un entero positivo").optional(),
    claseId: enteroPositivo("El claseId debe ser un entero positivo").optional(),
});
