import { Prisma } from "@prisma/client";

export function erroresMiddleware(err, req, res, next) {
  console.error("[ERROR]", err);

  const status = err.statusCode || err.status || 500;

  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Datos inválidos",
      mensaje: "Datos inválidos",
      detalles: err.issues || [],
    });
  }

  return res.status(status).json({
    error: err.message || "Error interno del servidor",
    mensaje: err.message || "Error interno del servidor",
  });
}
