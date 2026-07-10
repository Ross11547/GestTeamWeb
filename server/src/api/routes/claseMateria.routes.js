import { Router } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../../infrastructure/db/prisma.client.js";

const router = Router();

function crearError(message, status = 400) {
  const e = new Error(message);
  e.status = status;
  e.statusCode = status;
  return e;
}

function toInt(value, field) {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) {
    throw crearError(`${field} inválido`, 400);
  }
  return n;
}

function toOptionalInt(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

async function obtenerPeriodoId(periodoId) {
  if (periodoId) return toInt(periodoId, "periodoId");

  const activo = await prisma.periodoAcademico.findFirst({
    where: { activo: true },
    orderBy: { id: "desc" },
    select: { id: true },
  });

  if (!activo) {
    throw crearError("No existe un periodo académico activo", 400);
  }

  return activo.id;
}

router.post("/clase-materia/ofertar", async (req, res, next) => {
  try {
    const periodoId = await obtenerPeriodoId(req.body.periodoId);
    const idCarrera = toInt(req.body.idCarrera, "idCarrera");
    const semestreId = toOptionalInt(req.body.semestreId);
    const paralelo = String(req.body.paralelo || "A").trim().toUpperCase();
    const cupoMaximo = Number(req.body.cupoMaximo || 30);

    const materias = await prisma.materia.findMany({
      where: {
        idCarrera,
        ...(semestreId ? { semestreId } : {}),
      },
      select: {
        id: true,
        nombre: true,
        codigo: true,
      },
    });

    if (!materias.length) {
      return res.status(404).json({
        mensaje: "No hay materias registradas para esa carrera/semestre.",
        data: [],
      });
    }

    await prisma.claseMateria.createMany({
      data: materias.map((m) => ({
        periodoId,
        materiaId: m.id,
        paralelo,
        cupoMaximo,
        activo: true,
      })),
      skipDuplicates: true,
    });

    const clases = await prisma.claseMateria.findMany({
      where: {
        periodoId,
        paralelo,
        materia: {
          idCarrera,
          ...(semestreId ? { semestreId } : {}),
        },
      },
      include: {
        materia: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
            idCarrera: true,
            semestreId: true,
          },
        },
        periodo: {
          select: {
            id: true,
            nombre: true,
            activo: true,
          },
        },
        docente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
      },
      orderBy: [
        { materia: { codigo: "asc" } },
        { paralelo: "asc" },
      ],
    });

    return res.status(201).json({
      mensaje: "Oferta académica creada correctamente.",
      data: clases,
    });
  } catch (e) {
    next(e);
  }
});

router.get("/clase-materia/disponibles", async (req, res, next) => {
  try {
    const periodoId = await obtenerPeriodoId(req.query.periodoId);
    const idCarrera = toOptionalInt(req.query.idCarrera);
    const semestreId = toOptionalInt(req.query.semestreId);
    const docenteId = toOptionalInt(req.query.docenteId);

    const clases = await prisma.claseMateria.findMany({
      where: {
        periodoId,
        activo: true,
        ...(docenteId
          ? {
              OR: [
                { docenteId: null },
                { docenteId },
              ],
            }
          : {
              docenteId: null,
            }),
        materia: {
          ...(idCarrera ? { idCarrera } : {}),
          ...(semestreId ? { semestreId } : {}),
        },
      },
      include: {
        materia: {
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
        },
        periodo: {
          select: {
            id: true,
            nombre: true,
            activo: true,
          },
        },
        docente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
      },
      orderBy: [
        { materia: { codigo: "asc" } },
        { paralelo: "asc" },
      ],
    });

    return res.json({
      mensaje: "Clases disponibles obtenidas correctamente.",
      data: clases,
    });
  } catch (e) {
    next(e);
  }
});

router.get("/clase-materia/docente/:docenteId", async (req, res, next) => {
  try {
    const docenteId = toInt(req.params.docenteId, "docenteId");
    const periodoId = await obtenerPeriodoId(req.query.periodoId);

    const clases = await prisma.claseMateria.findMany({
      where: {
        docenteId,
        periodoId,
        activo: true,
      },
      include: {
        materia: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
            idCarrera: true,
            semestreId: true,
          },
        },
        periodo: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: [
        { materia: { codigo: "asc" } },
        { paralelo: "asc" },
      ],
    });

    return res.json({
      mensaje: "Clases del docente obtenidas correctamente.",
      data: clases,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/clase-materia/paralelo", async (req, res, next) => {
  try {
    const periodoId = await obtenerPeriodoId(req.body.periodoId);
    const materiaId = toInt(req.body.materiaId, "materiaId");
    const paralelo = String(req.body.paralelo || "A").trim().toUpperCase();
    const cupoMaximo = Number(req.body.cupoMaximo || 30);

    const materia = await prisma.materia.findUnique({
      where: { id: materiaId },
      select: { id: true },
    });

    if (!materia) {
      throw crearError("La materia indicada no existe", 404);
    }

    const clase = await prisma.claseMateria.create({
      data: {
        periodoId,
        materiaId,
        paralelo,
        cupoMaximo,
        activo: true,
      },
      include: {
        materia: true,
        periodo: true,
        docente: true,
      },
    });

    return res.status(201).json({
      mensaje: "Paralelo creado correctamente.",
      data: clase,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return res.status(409).json({
        mensaje: "Ya existe ese paralelo para la materia en este periodo.",
        error: "Paralelo duplicado",
      });
    }

    next(e);
  }
});

router.put("/clase-materia/:id/asignar", async (req, res, next) => {
  try {
    const claseId = toInt(req.params.id, "claseId");
    const docenteId = toInt(req.body.docenteId, "docenteId");

    const clase = await prisma.claseMateria.findUnique({
      where: { id: claseId },
      include: {
        materia: true,
      },
    });

    if (!clase) {
      throw crearError("Clase no encontrada", 404);
    }

    if (!clase.activo) {
      throw crearError("La clase no está activa", 400);
    }

    if (clase.docenteId && clase.docenteId !== docenteId) {
      throw crearError("Esta clase ya fue asignada a otro docente", 409);
    }

    const docente = await prisma.usuario.findUnique({
      where: { id: docenteId },
      include: { rol: true },
    });

    if (!docente) {
      throw crearError("Docente/director no encontrado", 404);
    }

    const actualizada = await prisma.claseMateria.update({
      where: { id: claseId },
      data: { docenteId },
      include: {
        materia: true,
        periodo: true,
        docente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
      },
    });

    await prisma.docenteMateria.upsert({
      where: {
        usuarioId_materiaId: {
          usuarioId: docenteId,
          materiaId: clase.materiaId,
        },
      },
      update: {},
      create: {
        usuarioId: docenteId,
        materiaId: clase.materiaId,
      },
    });

    return res.json({
      mensaje: "Clase asignada correctamente.",
      data: actualizada,
    });
  } catch (e) {
    next(e);
  }
});

router.put("/clase-materia/:id/liberar", async (req, res, next) => {
  try {
    const claseId = toInt(req.params.id, "claseId");

    const actualizada = await prisma.claseMateria.update({
      where: { id: claseId },
      data: {
        docenteId: null,
      },
      include: {
        materia: true,
        periodo: true,
      },
    });

    return res.json({
      mensaje: "Clase liberada correctamente.",
      data: actualizada,
    });
  } catch (e) {
    next(e);
  }
});

router.put("/clase-materia/docente/:docenteId/sincronizar", async (req, res, next) => {
  try {
    const docenteId = toInt(req.params.docenteId, "docenteId");
    const periodoId = await obtenerPeriodoId(req.body.periodoId);
    const claseIds = Array.isArray(req.body.claseIds)
      ? req.body.claseIds.map(Number).filter((n) => Number.isInteger(n) && n > 0)
      : [];

    const docente = await prisma.usuario.findUnique({
      where: { id: docenteId },
      select: { id: true },
    });

    if (!docente) {
      throw crearError("Docente/director no encontrado", 404);
    }

    const clasesSeleccionadas = await prisma.claseMateria.findMany({
      where: {
        id: { in: claseIds },
        periodoId,
        activo: true,
      },
      select: {
        id: true,
        docenteId: true,
        materiaId: true,
      },
    });

    if (clasesSeleccionadas.length !== claseIds.length) {
      throw crearError("Una o más clases seleccionadas no existen o no pertenecen al periodo", 400);
    }

    const tomadaPorOtro = clasesSeleccionadas.find(
      (c) => c.docenteId !== null && c.docenteId !== docenteId
    );

    if (tomadaPorOtro) {
      throw crearError(`La clase ${tomadaPorOtro.id} ya fue asignada a otro docente`, 409);
    }

    await prisma.$transaction(async (tx) => {
      await tx.claseMateria.updateMany({
        where: {
          docenteId,
          periodoId,
          ...(claseIds.length ? { id: { notIn: claseIds } } : {}),
        },
        data: {
          docenteId: null,
        },
      });

      if (claseIds.length) {
        await tx.claseMateria.updateMany({
          where: {
            id: { in: claseIds },
            periodoId,
            OR: [
              { docenteId: null },
              { docenteId },
            ],
          },
          data: {
            docenteId,
          },
        });
      }

      const materiaIds = [...new Set(clasesSeleccionadas.map((c) => c.materiaId))];

      if (materiaIds.length) {
        await tx.docenteMateria.createMany({
          data: materiaIds.map((materiaId) => ({
            usuarioId: docenteId,
            materiaId,
          })),
          skipDuplicates: true,
        });
      }
    });

    const actualizadas = await prisma.claseMateria.findMany({
      where: {
        docenteId,
        periodoId,
      },
      include: {
        materia: true,
        periodo: true,
      },
      orderBy: [
        { materia: { codigo: "asc" } },
        { paralelo: "asc" },
      ],
    });

    return res.json({
      mensaje: "Clases sincronizadas correctamente.",
      data: actualizadas,
    });
  } catch (e) {
    next(e);
  }
});

export default router;