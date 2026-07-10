import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { usuarioRepositorio } from "../../../infrastructure/repositories/repositorioUsuario.js";
import { actualizarUsuario } from "../../../dominio/usuario/validacionUsuario.js";
import {
  ensureIdPositivo,
  limpiarTexto,
  toUsuarioDTO,
} from "../../../dominio/usuario/helpersUsuario.js";

function crearError(message, status = 400) {
  const e = new Error(message);
  e.status = status;
  e.statusCode = status;
  return e;
}

function normalizarIdOpcional(value) {
  if (value === undefined) return undefined;

  if (
    value === null ||
    value === "" ||
    value === "null" ||
    value === "undefined"
  ) {
    return null;
  }

  const n = Number(value);

  if (!Number.isInteger(n) || n <= 0) {
    return value;
  }

  return n;
}

function normalizarBooleanOpcional(value) {
  if (value === undefined) return undefined;
  if (value === null || value === "") return undefined;

  if (typeof value === "boolean") return value;
  if (String(value).toLowerCase() === "true") return true;
  if (String(value).toLowerCase() === "false") return false;

  return Boolean(value);
}

export async function actualizarUsuarioCasoUso({ id, data }) {
  const uid = ensureIdPositivo(id);

  if (!uid) {
    throw crearError("id inválido", 400);
  }

  const actual = await usuarioRepositorio.obtenerPorId(uid);

  if (!actual) {
    throw crearError("usuario no encontrado", 404);
  }

  const payloadNormalizado = {
    ...data,

    nombre:
      data?.nombre !== undefined ? String(data.nombre).trim() : data?.nombre,

    apellido:
      data?.apellido !== undefined
        ? String(data.apellido).trim()
        : data?.apellido,

    telefono:
      data?.telefono !== undefined
        ? String(data.telefono).trim()
        : data?.telefono,

    correo:
      data?.correo !== undefined
        ? String(data.correo).trim().toLowerCase()
        : data?.correo,

    codigo:
      data?.codigo !== undefined
        ? String(data.codigo).trim()
        : data?.codigo,

    ci:
      data?.ci !== undefined && data?.ci !== ""
        ? Number(data.ci)
        : data?.ci,

    idRol: normalizarIdOpcional(data?.idRol),
    idFacultad: normalizarIdOpcional(data?.idFacultad),
    idCarrera: normalizarIdOpcional(data?.idCarrera),
    semestreId: normalizarIdOpcional(data?.semestreId),

    activo: normalizarBooleanOpcional(data?.activo),
    esDirector: normalizarBooleanOpcional(data?.esDirector),
  };

  const body = actualizarUsuario.parse(payloadNormalizado);

  const update = {};

  if (body.nombre !== undefined) {
    update.nombre = limpiarTexto(body.nombre);
  }

  if (body.apellido !== undefined) {
    update.apellido = limpiarTexto(body.apellido);
  }

  if (body.telefono !== undefined) {
    update.telefono = limpiarTexto(body.telefono);
  }

  if (body.ci !== undefined) {
    update.ci = Number(body.ci);
  }

  if (body.correo !== undefined) {
    const correo = String(body.correo).trim().toLowerCase();

    const dupe = await usuarioRepositorio.existeCorreo(correo, uid);

    if (dupe) {
      throw crearError("El correo ingresado ya está registrado", 409);
    }

    update.correo = correo;
  }

  if (body.password !== undefined && String(body.password).trim() !== "") {
    update.password = await bcrypt.hash(String(body.password), 10);
  }

  if (body.idRol !== undefined) {
    const rol = await usuarioRepositorio.existeRol(Number(body.idRol));

    if (!rol) {
      throw crearError("El rol indicado no existe", 400);
    }

    update.idRol = Number(body.idRol);
  }

  if (body.activo !== undefined) {
    update.activo = Boolean(body.activo);
  }

  if (body.esDirector !== undefined) {
    update.esDirector = Boolean(body.esDirector);
  }

  let idFacultad =
    body.idFacultad !== undefined ? body.idFacultad : actual.idFacultad;

  let idCarrera =
    body.idCarrera !== undefined ? body.idCarrera : actual.idCarrera;

  let semestreId =
    body.semestreId !== undefined ? body.semestreId : actual.semestreId;

  if (body.idFacultad !== undefined) {
    if (body.idFacultad === null) {
      update.idFacultad = null;
      update.idCarrera = null;
      update.semestreId = null;

      idFacultad = null;
      idCarrera = null;
      semestreId = null;
    } else {
      const fac = await usuarioRepositorio.existeFacultad(
        Number(body.idFacultad)
      );

      if (!fac) {
        throw crearError("La facultad indicada no existe", 400);
      }

      update.idFacultad = Number(body.idFacultad);
      idFacultad = Number(body.idFacultad);
    }
  }

  if (body.idCarrera !== undefined) {
    if (body.idCarrera === null) {
      update.idCarrera = null;
      update.semestreId = null;

      idCarrera = null;
      semestreId = null;
    } else {
      const car = await usuarioRepositorio.existeCarrera(
        Number(body.idCarrera)
      );

      if (!car) {
        throw crearError("La carrera indicada no existe", 400);
      }

      const facToUse = idFacultad != null ? Number(idFacultad) : null;

      if (facToUse != null && car.idFacultad !== facToUse) {
        throw crearError(
          "La carrera no pertenece a la facultad seleccionada",
          400
        );
      }

      update.idCarrera = Number(body.idCarrera);
      idCarrera = Number(body.idCarrera);
    }
  }

  if (body.semestreId !== undefined) {
    if (body.semestreId === null) {
      update.semestreId = null;
      semestreId = null;
    } else {
      const sem = await usuarioRepositorio.existeSemestre(
        Number(body.semestreId)
      );

      if (!sem) {
        throw crearError("El semestre indicado no existe", 400);
      }

      const carToUse = idCarrera != null ? Number(idCarrera) : null;

      if (carToUse != null && sem.carreraId !== carToUse) {
        throw crearError(
          "El semestre no pertenece a la carrera seleccionada",
          400
        );
      }

      update.semestreId = Number(body.semestreId);
      semestreId = Number(body.semestreId);
    }
  }

  if (body.codigo !== undefined) {
    if (body.codigo == null || String(body.codigo).trim() === "") {
      update.codigo = null;
    } else {
      const codigo = String(body.codigo).trim();

      const dup = await usuarioRepositorio.existeCodigo(codigo, uid);

      if (dup) {
        throw crearError("El código ya está en uso", 409);
      }

      update.codigo = codigo;
    }
  }

  try {
    const actualizado = await usuarioRepositorio.actualizar(uid, update);
    return toUsuarioDTO(actualizado);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      throw crearError("Correo o código en uso", 409);
    }

    throw err;
  }
}