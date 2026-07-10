import * as path from "path";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { extraerTextoDeDocumento } from "./texto.js";
import { analizarDocumento } from "../similitud/plagio.js";

const prisma = new PrismaClient();

export async function uploadDocumento(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se envió ningún archivo." });
        }

        const file = req.file;

        const documento = await prisma.documento.create({
            data: {
                nombre: file.originalname,
                ruta: file.path,
                mimetype: file.mimetype,
                tamano: file.size,
            },
        });

        try {
            const rutaAbsoluta = path.resolve(file.path);
            const texto = await extraerTextoDeDocumento(
                rutaAbsoluta,
                file.mimetype,
                file.originalname
            );

            await prisma.documento.update({
                where: { id: documento.id },
                data: { contenidoTexto: texto },
            });
        } catch (e) {
            console.error("Error extrayendo texto:", e.message);
        }

        return res.json({ documentoId: documento.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error subiendo documento." });
    }
}

export async function analizar(req, res) {
    try {
        const { documentoId } = req.body;
        if (!documentoId) {
            return res.status(400).json({ message: "Falta documentoId." });
        }

        const resultado = await analizarDocumento(Number(documentoId));
        return res.json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error analizando documento.",
            error: error.message,
        });
    }
}

export async function uploadRepositorioUnifranz(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se envió ningún archivo." });
        }

        const file = req.file;

        const documento = await prisma.documento.create({
            data: {
                nombre: file.originalname,
                ruta: file.path,
                mimetype: file.mimetype,
                tamano: file.size,
                esRepositorioUnifranz: true,
            },
        });

        try {
            const rutaAbsoluta = path.resolve(file.path);
            const texto = await extraerTextoDeDocumento(
                rutaAbsoluta,
                file.mimetype,
                file.originalname
            );

            await prisma.documento.update({
                where: { id: documento.id },
                data: { contenidoTexto: texto },
            });
        } catch (e) {
            console.error("Error extrayendo texto (repo):", e.message);
        }

        return res.json({ ok: true, documentoId: documento.id });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Error subiendo a repositorio UNIFRANZ." });
    }
}
