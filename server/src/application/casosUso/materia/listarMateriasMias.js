import jwt from "jsonwebtoken";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

const JWT_SECRET = process.env.SESSION_SECRET || "dev_secret";

function crearError(message, statusCode = 400) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.status = statusCode;
  return err;
}

function getUserIdFromAuth(req) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer\s+(.+)$/i);

  if (!m) return null;

  try {
    const payload = jwt.verify(m[1], JWT_SECRET);
    return Number(payload.uid || payload.id || payload.usuarioId);
  } catch {
    return null;
  }
}

export async function listarMateriasMiasCasoUso(req) {
  const uid = getUserIdFromAuth(req);

  if (!uid) {
    throw crearError("No autenticado", 401);
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: uid },
    select: {
      id: true,
      nombre: true,
      apellido: true,
      idCarrera: true,
      semestreId: true,
      carrera: {
        select: {
          id: true,
          nombre: true,
        },
      },
      semestre: {
        select: {
          id: true,
          numero: true,
          etiqueta: true,
        },
      },
    },
  });

  if (!usuario) {
    throw crearError("Usuario no encontrado", 404);
  }

  if (!usuario.idCarrera) {
    throw crearError("El usuario no tiene carrera asignada", 400);
  }

  if (!usuario.semestreId) {
    throw crearError("El usuario no tiene semestre asignado", 400);
  }

  const materias = await prisma.materia.findMany({
    where: {
      idCarrera: usuario.idCarrera,
      semestreId: usuario.semestreId,
    },
    select: {
      id: true,
      nombre: true,
      codigo: true,
      idCarrera: true,
      semestreId: true,
      carrera: {
        select: {
          id: true,
          nombre: true,
        },
      },
      semestre: {
        select: {
          id: true,
          numero: true,
          etiqueta: true,
        },
      },
    },
    orderBy: [
      { codigo: "asc" },
      { nombre: "asc" },
    ],
  });

  return materias;
}