// routes/materia.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();

// ======== Auth helper (JWT en Authorization: Bearer ...) ========
const JWT_SECRET = process.env.SESSION_SECRET || "dev_secret";

function getUserIdFromAuth(req) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  try {
    const payload = jwt.verify(m[1], JWT_SECRET);
    return Number(payload.uid);
  } catch {
    return null;
  }
}

// =================== Helpers ===================
const ensureInt = (v) => {
  const n = Number(v);
  return Number.isInteger(n) ? n : NaN;
};

// Stopwords / conectores a ignorar
const STOPWORDS = new Set([
  "a", "al", "con", "de", "del", "el", "la", "las", "los", "en", "para", "por", "sin",
  "y", "e", "o", "u", "un", "una", "uno", "unos", "unas", "the", "and", "of",
]);
const isRoman = (tok) => /^[IVXLCDM]+$/i.test(tok);
const isNumber = (tok) => /^\d+$/.test(tok);

// Genera código: "Sistemas de Control" -> SCO, "Redes II" -> RED, etc.
const makeCode = (nombre) => {
  if (!nombre) return "";
  const raw = String(nombre)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9\s]+/g, " ")
    .trim();

  const sig = raw
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !STOPWORDS.has(t.toLowerCase()))
    .filter((t) => !isRoman(t) && !isNumber(t))
    .map((t) => t.toUpperCase());

  if (sig.length === 0) return raw.replace(/\s+/g, "").toUpperCase().slice(0, 3) || "MAT";
  if (sig.length === 1) return sig[0].slice(0, 3);
  if (sig.length === 2) return sig[0][0] + sig[1].slice(0, 2);
  return sig[0][0] + sig[1][0] + sig[2][0];
};

// Garantiza unicidad (TCO, TCO2, TCO3, ...)
const ensureUniqueCode = async (base) => {
  const seed = base || "MAT";
  let code = seed || "MAT";
  let i = 1;
  while (true) {
    const exists = await prisma.materia.findUnique({ where: { codigo: code } });
    if (!exists) return code;
    i += 1;
    code = `${seed}${i}`;
  }
};

// includes comunes
const carreraWithFacultad = {
  include: { facultad: { select: { id: true, nombre: true } } },
};
const semestreSelect = {
  select: { id: true, numero: true, etiqueta: true, carreraId: true },
};

// =================== Endpoints ===================

// GET /materia  (filtros opcionales: ?idCarrera= , ?semestreId= , ?q=)
app.get("/materia", async (req, res) => {
  try {
    const idCarrera = req.query.idCarrera ? ensureInt(req.query.idCarrera) : undefined;
    const semestreId = req.query.semestreId ? ensureInt(req.query.semestreId) : undefined;
    const q = String(req.query.q || "").trim();

    const where = {
      ...(idCarrera ? { idCarrera } : {}),
      ...(semestreId ? { semestreId } : {}),
      ...(q
        ? {
          OR: [
            { nombre: { contains: q, mode: "insensitive" } },
            { codigo: { contains: q, mode: "insensitive" } },
            { carrera: { nombre: { contains: q, mode: "insensitive" } } },
          ],
        }
        : {}),
    };

    const materias = await prisma.materia.findMany({
      where,
      orderBy: [{ idCarrera: "asc" }, { semestreId: "asc" }, { nombre: "asc" }],
      include: { carrera: carreraWithFacultad, semestre: semestreSelect },
    });

    res.json({ data: materias, message: "Materias obtenidas correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener materias", error: error.message });
  }
});

// GET /materia/:id
app.get("/materia/:id", async (req, res) => {
  try {
    const id = ensureInt(req.params.id);
    if (!id) return res.status(400).json({ message: "ID inválido" });

    const materia = await prisma.materia.findUnique({
      where: { id },
      include: { carrera: carreraWithFacultad, semestre: semestreSelect },
    });
    res.json({ data: materia, message: "Materia obtenida correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener materia", error: error.message });
  }
});

// POST /materia
app.post("/materia", async (req, res) => {
  try {
    const { nombre, idCarrera, semestreId } = req.body || {};
    if (!nombre || String(nombre).trim() === "")
      return res.status(400).json({ message: "nombre es requerido" });

    const c = ensureInt(idCarrera);
    const s = semestreId == null ? null : ensureInt(semestreId);
    if (!c) return res.status(400).json({ message: "idCarrera válido es requerido" });

    const carrera = await prisma.carrera.findUnique({ where: { id: c } });
    if (!carrera) return res.status(400).json({ message: "La carrera indicada no existe" });

    if (s) {
      const semestre = await prisma.semestre.findUnique({ where: { id: s } });
      if (!semestre) return res.status(400).json({ message: "El semestre indicado no existe" });
      if (semestre.carreraId !== c)
        return res.status(400).json({ message: "El semestre no pertenece a la carrera seleccionada" });
    }

    const base = makeCode(nombre);
    const codigo = await ensureUniqueCode(base || "MAT");

    const created = await prisma.materia.create({
      data: { nombre: String(nombre).trim(), codigo, idCarrera: c, semestreId: s },
      include: { carrera: carreraWithFacultad, semestre: semestreSelect },
    });

    res.json({ data: created, message: "Materia creada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar materia", error: error.message });
  }
});

// PUT /materia/:id
app.put("/materia/:id", async (req, res) => {
  try {
    const id = ensureInt(req.params.id);
    if (!id) return res.status(400).json({ message: "ID inválido" });

    const current = await prisma.materia.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ message: "Materia no encontrada" });

    const data = {};
    let nombreNuevo = current.nombre;

    if (req.body.nombre !== undefined) {
      const nombre = String(req.body.nombre).trim();
      if (!nombre) return res.status(400).json({ message: "nombre no puede estar vacío" });
      data.nombre = nombre;
      nombreNuevo = nombre;
    }

    if (req.body.idCarrera !== undefined) {
      const c = ensureInt(req.body.idCarrera);
      if (!c) return res.status(400).json({ message: "idCarrera inválido" });
      const carrera = await prisma.carrera.findUnique({ where: { id: c } });
      if (!carrera) return res.status(400).json({ message: "La carrera indicada no existe" });
      data.idCarrera = c;
    }

    if (req.body.semestreId !== undefined) {
      const s = req.body.semestreId == null ? null : ensureInt(req.body.semestreId);
      if (s) {
        const semestre = await prisma.semestre.findUnique({ where: { id: s } });
        if (!semestre) return res.status(400).json({ message: "El semestre indicado no existe" });
        const carreraIdToUse = data.idCarrera ?? current.idCarrera;
        if (carreraIdToUse && semestre.carreraId !== carreraIdToUse) {
          return res.status(400).json({ message: "El semestre no pertenece a la carrera seleccionada" });
        }
      }
      data.semestreId = s;
    }

    // Regenerar código si cambió el nombre (manteniendo unicidad)
    if (req.body.nombre !== undefined) {
      const newBase = makeCode(nombreNuevo) || "MAT";
      const prevBase = (current.codigo || "").replace(/\d+$/, "");
      if (newBase !== prevBase) {
        data.codigo = await ensureUniqueCode(newBase);
      }
    }

    const updated = await prisma.materia.update({
      where: { id },
      data,
      include: { carrera: carreraWithFacultad, semestre: semestreSelect },
    });

    res.json({ data: updated, message: "Materia actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar materia", error: error.message });
  }
});

// DELETE /materia/:id
app.delete("/materia/:id", async (req, res) => {
  try {
    const id = ensureInt(req.params.id);
    if (!id) return res.status(400).json({ message: "ID inválido" });

    await prisma.docenteMateria.deleteMany({ where: { materiaId: id } });

    const deleted = await prisma.materia.delete({
      where: { id },
      include: { carrera: carreraWithFacultad, semestre: semestreSelect },
    });

    res.json({ data: deleted, message: "Materia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar materia", error: error.message });
  }
});

// GET /materia/by-semestre?semestreId=#
app.get("/materia/by-semestre", async (req, res) => {
  try {
    const semestreId = ensureInt(req.query.semestreId);
    if (!semestreId) return res.status(400).json({ message: "semestreId requerido" });

    const materias = await prisma.materia.findMany({
      where: { semestreId },
      orderBy: { nombre: "asc" },
      select: { id: true, nombre: true, codigo: true, idCarrera: true, semestreId: true },
    });

    res.json({ data: materias, message: "Materias por semestre obtenidas correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener materias", error: error.message });
  }
});

// GET /materias/mias
// Materias REALMENTE asignadas al usuario (Inscripcion + EstudianteMateria)
app.get("/materias/mias", async (req, res) => {
  try {
    const uid = getUserIdFromAuth(req);
    if (!uid) return res.status(401).json({ message: "No autenticado" });

    const [inscripciones, estMaterias] = await Promise.all([
      prisma.inscripcion.findMany({
        where: { usuarioId: uid },
        include: {
          materia: {
            include: {
              carrera: { select: { id: true, nombre: true } },
            },
          },
        },
      }),
      prisma.estudianteMateria.findMany({
        where: { usuarioId: uid },
        include: {
          materia: {
            include: {
              carrera: { select: { id: true, nombre: true } },
            },
          },
        },
      }),
    ]);

    const map = new Map();

    const addMateria = (m) => {
      if (!m) return;
      if (map.has(m.id)) return;
      map.set(m.id, {
        id: m.id,
        nombre: m.nombre,
        codigo: m.codigo,
        carrera: { id: m.carrera.id, nombre: m.carrera.nombre },
      });
    };

    inscripciones.forEach((i) => addMateria(i.materia));
    estMaterias.forEach((e) => addMateria(e.materia));

    const materias = Array.from(map.values());

    if (materias.length === 0) {
      return res.json({
        items: [],
        data: [],
        message: "No hay materias asignadas a tu usuario.",
      });
    }

    res.json({
      items: materias,  // para front/móvil nuevo
      data: materias,   // por si algo viejo usa data
      message: "Materias asignadas a tu usuario obtenidas correctamente.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener materias", error: error.message });
  }
});

export default app;
