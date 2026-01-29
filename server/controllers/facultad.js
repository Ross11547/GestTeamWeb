import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// helper opcional: intenta parsear si llega como string
const parseTheme = (t) => {
  if (t == null) return null;
  if (typeof t === "object") return t;
  try { return JSON.parse(t); } catch { return null; }
};

app.get("/facultad", async (req, res) => {
  try {
    const facultad = await prisma.facultad.findMany({});
    res.json({ data: facultad, message: "Facultades obtenidas correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener facultades", error: error.message });
  }
});

app.post("/facultad", async (req, res) => {
  try {
    const { nombre, theme } = req.body || {};
    if (!nombre || String(nombre).trim() === "") {
      return res.status(400).json({ message: "El nombre de la facultad es obligatorio" });
    }

    const facultad = await prisma.facultad.create({
      data: {
        nombre: String(nombre).trim(),
        theme: parseTheme(theme),
      },
    });
    res.json({ data: facultad, message: "Facultad creada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar facultad", error: error.message });
  }
});

app.put("/facultad/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "id inválido" });
    }

    const actual = await prisma.facultad.findUnique({ where: { id } });
    if (!actual) {
      return res.status(404).json({ message: "Facultad no encontrada" });
    }

    const { nombre, theme } = req.body || {};
    if (nombre !== undefined && String(nombre).trim() === "") {
      return res.status(400).json({ message: "El nombre no puede estar vacío" });
    }

    const facultad = await prisma.facultad.update({
      where: { id }, // <-- antes estaba "ci"
      data: {
        ...(nombre !== undefined ? { nombre: String(nombre).trim() } : {}),
        ...(theme !== undefined ? { theme: parseTheme(theme) } : {}),
      },
    });
    res.json({ data: facultad, message: "Facultad actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar facultad", error: error.message });
  }
});

app.delete("/facultad/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "id inválido" });
    }

    const existe = await prisma.facultad.findUnique({ where: { id }, select: { id: true } });
    if (!existe) {
      return res.status(404).json({ message: "Facultad no encontrada" });
    }

    const facultad = await prisma.facultad.delete({
      where: { id },
    });
    res.json({ data: facultad, message: "Facultad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar facultad", error: error.message });
  }
});

app.get("/facultad/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "id inválido" });
    }

    const facultad = await prisma.facultad.findUnique({
      where: { id: id },
    });
    if (!facultad) {
      return res.status(404).json({ message: "Facultad no encontrada" });
    }

    res.json({ data: facultad, message: "Facultad obtenida correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener facultad", error: error.message });
  }
});

export default app;
