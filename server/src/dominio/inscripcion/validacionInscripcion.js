import { z } from "zod";

const enteroPositivo = (mensaje) =>
    z.preprocess(
        (v) => (v === "" || v === null || v === undefined ? v : Number(v)),
        z
            .number({ required_error: mensaje })
            .int(mensaje)
            .positive(mensaje)
    );

export const crearInscripcion = z.object({
    usuarioId: enteroPositivo("El usuarioId es obligatorio y debe ser un entero positivo"),
    materiaId: enteroPositivo("El materiaId es obligatorio y debe ser un entero positivo"),
});

export const actualizarInscripcion = z.object({
    usuarioId: enteroPositivo("El usuarioId debe ser un entero positivo").optional(),
    materiaId: enteroPositivo("El materiaId debe ser un entero positivo").optional(),
});
