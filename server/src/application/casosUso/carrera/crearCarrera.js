import { Prisma } from "@prisma/client";
import {
  crearCarrera,
  derivarSiglaDesdeNombre,
} from "../../../dominio/carrera/validacionCarrera.js";
import { carreraRepositorio } from "../../../infrastructure/repositories/repositorioCarrera.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function crearCarreraCasoUso(payload) {
  const payloadNormalizado = {
    ...payload,
    idFacultad: Number(payload.idFacultad),
    sigla:
      payload.sigla && String(payload.sigla).trim() !== ""
        ? String(payload.sigla).trim().toUpperCase()
        : undefined,
    nombre: payload.nombre ? String(payload.nombre).trim() : payload.nombre,
  };

  const data = crearCarrera.parse(payloadNormalizado);

  const fac = await prisma.facultad.findUnique({
    where: { id: data.idFacultad },
    select: { id: true },
  });

  if (!fac) {
    const err = new Error("La facultad indicada no existe");
    err.statusCode = 404;
    throw err;
  }

  const dup = await carreraRepositorio.existePorNombreEnFacultad(
    data.idFacultad,
    data.nombre
  );

  if (dup) {
    const err = new Error("Ya existe una carrera con ese nombre en la facultad");
    err.statusCode = 409;
    throw err;
  }

  const siglaFinal = data.sigla ?? derivarSiglaDesdeNombre(data.nombre);

  try {
    return await carreraRepositorio.crear({
      nombre: data.nombre,
      idFacultad: data.idFacultad,
      sigla: siglaFinal,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const err = new Error("La sigla ya está en uso");
      err.statusCode = 409;
      throw err;
    }

    throw e;
  }
}