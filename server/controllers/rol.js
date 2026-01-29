import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/rol", async (req, res) => {
  try {
    const rol = await prisma.rol.findMany({});
    res.json({
      data: rol,
      message: "roles obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener rol",
      error: error.message,
    });
  }
});

app.post("/rol", async (req, res) => {
  try {
    const {nombre} = req.body;
    if(!nombre){
      res.status(400).json({
        message: "El nombre del rol es obligatorio",
      });
      return;
    }
    const rol = await prisma.rol.create({
      data: {
        nombre,
      },
    });
    res.json({
      data: rol,
      message: "rol creado correctamente",
    });
  }catch (error) {
    res.status(500).json({
      message: "Error al agregar rol",
    });
  }
});

app.put("/rol/:id", async (req, res) => {
  try {
    const rol = await prisma.rol.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: rol,
      message: "rol actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar rol",
      error: error.message,
    });
  }
});
app.delete("/rol/:id", async (req, res) => {
  try {
    const rol = await prisma.rol.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: rol,
      message: "rol eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar rol",
      error: error.message,
    });
  }
});
app.get("/rol/:id", async (req, res) => {
  try {
    const rol = await prisma.rol.findUnique({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: rol,
      message: "rol obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener rol",
      error: error.message,
    });
  }
});

export default app;
