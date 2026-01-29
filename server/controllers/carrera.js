import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/carrera", async (req, res) => {
  try {
    const carrera = await prisma.carrera.findMany({
      include: { 
        facultad: { 
          select: { 
            id: true, 
            nombre: true 
          } 
        } 
      },
    });
    res.json({ 
      data: carrera, 
      message: "Carreras obtenidas correctamente" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener carreras", 
      error: error.message 
    });
  }
});

app.post("/carrera", async (req, res) => {
  try {
    const { nombre, idFacultad } = req.body;
    const carrera = await prisma.carrera.create({
      data: {
        nombre,
        idFacultad: parseInt(idFacultad, 10),
      },
      include: {
        facultad: { 
          select: { 
            id: true, 
            nombre: true 
          } 
        } 
      },
    });
    res.json({ 
      data: carrera, 
      message: "Carrera creada correctamente" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al agregar carrera", 
      error: error.message 
    });
  }
});

app.put("/carrera/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const { nombre, idFacultad } = req.body;
    const data = {};
    if (typeof nombre === "string" && nombre.trim() !== "") data.nombre = nombre.trim();
    if (idFacultad !== undefined) data.idFacultad = parseInt(idFacultad, 10);

    const carrera = await prisma.carrera.update({
      where: { id },
      data,
      include: { facultad: { select: { id: true, nombre: true } } },
    });
    res.json({ data: carrera, message: "Carrera actualizada correctamente" });
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "No existe la carrera" });
    }
    res.status(500).json({ message: "Error al actualizar carrera", error: error.message });
  }
});

app.delete("/carrera/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const carrera = await prisma.carrera.delete({
      where: { id },
      include: { facultad: { select: { id: true, nombre: true } } },
    });
    res.json({ data: carrera, message: "Carrera eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar carrera", error: error.message });
  }
});

app.get("/carrera/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const carrera = await prisma.carrera.findUnique({
      where: { id },
      include: { facultad: { select: { id: true, nombre: true } } },
    });
    res.json({ data: carrera, message: "Carrera obtenida correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener carrera", error: error.message });
  }
});

export default app;
