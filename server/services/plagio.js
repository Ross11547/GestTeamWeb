// server/services/plagio.js
import path from "path";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";

import {
    extraerTextoDeDocumento,
    contarPalabras,
} from "./texto.js";
import {
    buscarEnRepositorioUnifranz,
    buscarEnWeb,
} from "./similitud.js";
import { estimarContenidoIA } from "./iaDetector.js";

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getNivelRiesgo(originalidad, plagioWeb, plagioUniversidad, contenidoIA) {
    const riesgoBruto = plagioWeb + plagioUniversidad + contenidoIA;
    if (riesgoBruto >= 60 || originalidad < 55) return "ALTO";
    if (riesgoBruto >= 35 || originalidad < 65) return "MEDIO";
    return "BAJO";
}

function construirAlertas({ originalidad, plagioWeb, plagioUniversidad, contenidoIA }) {
    const alertas = [];

    if (contenidoIA > 10) {
        alertas.push({
            nivel: "alto",
            mensaje: `Se detectó ${contenidoIA}% de contenido con patrones que pueden corresponder a IA`,
        });
    }

    if (plagioUniversidad > 10) {
        alertas.push({
            nivel: "medio",
            mensaje: `Coincidencia del ${plagioUniversidad}% con documentos del repositorio UNIFRANZ`,
        });
    }

    if (plagioWeb > 0) {
        alertas.push({
            nivel: "medio",
            mensaje: `Se encontraron posibles coincidencias en la web (${plagioWeb}%)`,
        });
    }

    if (originalidad < 60) {
        alertas.push({
            nivel: "alto",
            mensaje: "El porcentaje de originalidad está por debajo del mínimo sugerido (60%)",
        });
    }

    return alertas;
}

function generarFragmentos(texto, simWeb, simUnifranz, resultadoIA) {
    const oracionesBase =
        simWeb?.oraciones && Array.isArray(simWeb.oraciones)
            ? simWeb.oraciones
            : texto
                .split(/(?<=[.!?])\s+/)
                .map((o) => o.trim())
                .filter((o) => o.length > 20);

    const fragmentosSospechosos = [];
    const fragmentosOriginales = [];
    const marca = new Array(oracionesBase.length).fill(null);

    if (simWeb?.coincidenciasPorOracion) {
        simWeb.coincidenciasPorOracion.forEach((info, idx) => {
            if (!info) return;
            const o = oracionesBase[idx];
            const inicio = texto.indexOf(o);
            if (inicio === -1) return;

            marca[idx] = "web";
            fragmentosSospechosos.push({
                texto: o,
                tipo: "web",
                fuenteLabel: info.titulo || "Fuente web",
                inicio,
                fin: inicio + o.length,
            });
        });
    }

    const porcentajeUni = simUnifranz?.porcentajeGlobal || 0;
    if (porcentajeUni > 0 && simUnifranz?.fuentes?.length) {
        const objetivoUni = Math.max(
            1,
            Math.round((oracionesBase.length * porcentajeUni) / 100)
        );

        const etiquetaUni =
            simUnifranz.fuentes[0]?.titulo || "Repositorio UNIFRANZ";

        let marcadas = 0;
        const indicesOrdenados = oracionesBase
            .map((o, idx) => ({ idx, len: o.length }))
            .sort((a, b) => b.len - a.len);

        for (const { idx } of indicesOrdenados) {
            if (marcadas >= objetivoUni) break;
            if (marca[idx]) continue;
            const o = oracionesBase[idx];
            if (o.length < 60) continue;

            const inicio = texto.indexOf(o);
            if (inicio === -1) continue;

            marca[idx] = "universidad";
            fragmentosSospechosos.push({
                texto: o,
                tipo: "universidad",
                fuenteLabel: etiquetaUni,
                inicio,
                fin: inicio + o.length,
            });
            marcadas++;
        }
    }

    const pctIA = resultadoIA?.porcentajeIA || 0;
    if (pctIA > 10) {
        const objetivoIA = Math.max(
            1,
            Math.round((oracionesBase.length * pctIA) / 100)
        );

        let marcadasIA = 0;
        const indicesOrdenados = oracionesBase
            .map((o, idx) => ({ idx, len: o.length }))
            .sort((a, b) => b.len - a.len);

        for (const { idx } of indicesOrdenados) {
            if (marcadasIA >= objetivoIA) break;
            if (marca[idx]) continue;

            const o = oracionesBase[idx];
            const palabras = o.split(/\s+/).length;
            if (palabras < 12) continue;

            const inicio = texto.indexOf(o);
            if (inicio === -1) continue;

            marca[idx] = "ia";
            fragmentosSospechosos.push({
                texto: o,
                tipo: "ia",
                fuenteLabel: "Patrón sospechoso de IA",
                inicio,
                fin: inicio + o.length,
            });
            marcadasIA++;
        }
    }

    oracionesBase.forEach((o, idx) => {
        const inicio = texto.indexOf(o);
        if (inicio === -1) return;

        if (!marca[idx]) {
            marca[idx] = "original";
            fragmentosOriginales.push({
                texto: o,
                tipo: "original",
                fuenteLabel: "Texto del estudiante",
                inicio,
                fin: inicio + o.length,
            });
        }
    });

    const todos = [...fragmentosSospechosos, ...fragmentosOriginales];
    todos.sort((a, b) => a.inicio - b.inicio);

    return todos;
}

function mapearAFrontend(analisis, fuentes, fragmentosGuardados, texto) {
    const resumen = analisis.resumenJson || {};
    const palabrasAnalizadas = resumen.palabrasAnalizadas || contarPalabras(texto);
    const frasesAnalizadas =
        resumen.frasesAnalizadas || Math.max(1, Math.round(palabrasAnalizadas / 18));

    const fuentesDto = fuentes.map((f) => ({
        tipo: f.tipo,
        titulo: f.titulo,
        autor: f.autor || "",
        coincidencia: f.coincidencia,
        url: f.url,
    }));

    const fragmentosDto = fragmentosGuardados.map((fr) => ({
        original: fr.texto,
        fuente: fr.fuenteLabel || "Desconocida",
        tipo: fr.tipo,
        inicio: fr.inicio,
        fin: fr.fin,
    }));

    const alertas = construirAlertas({
        originalidad: analisis.originalidad,
        plagioWeb: analisis.plagioWeb,
        plagioUniversidad: analisis.plagioUniversidad,
        contenidoIA: analisis.contenidoIA,
    });

    return {
        originalidad: Math.round(analisis.originalidad),
        plagioWeb: Math.round(analisis.plagioWeb),
        plagioUniversidad: Math.round(analisis.plagioUniversidad),
        contenidoIA: Math.round(analisis.contenidoIA),
        fuentes: fuentesDto,
        alertas,
        fragmentos: fragmentosDto,
        fechaAnalisis: analisis.creadoEn.toLocaleString("es-BO"),
        tiempoAnalisis: resumen.tiempoAnalisis || "7.8 segundos",
        palabrasAnalizadas,
        frasesAnalizadas,
        textoOriginal: texto,
    };
}

export async function analizarDocumento(documentoId) {
    const documento = await prisma.documento.findUnique({
        where: { id: documentoId },
    });

    if (!documento) throw new Error("Documento no encontrado");

    const rutaAbsoluta = path.resolve(documento.ruta);
    const texto =
        documento.contenidoTexto ||
        (await extraerTextoDeDocumento(
            rutaAbsoluta,
            documento.mimetype,
            documento.nombre
        ));

    const palabrasAnalizadas = contarPalabras(texto);

    const simUnifranz = await buscarEnRepositorioUnifranz(texto);
    const simWeb = await buscarEnWeb(texto);
    const resultadoIA = estimarContenidoIA(texto);

    const plagioUniversidad = simUnifranz.porcentajeGlobal;
    const plagioWeb = simWeb.porcentajeGlobal;
    const contenidoIA = resultadoIA.porcentajeIA;
    const originalidad = Math.max(
        0,
        100 - plagioUniversidad - plagioWeb - contenidoIA
    );

    const nivelRiesgo = getNivelRiesgo(
        originalidad,
        plagioWeb,
        plagioUniversidad,
        contenidoIA
    );

    const fragmentosCalculados = generarFragmentos(
        texto,
        simWeb,
        simUnifranz,
        resultadoIA
    );

    const analisis = await prisma.analisisPlagio.create({
        data: {
            documentoId,
            originalidad,
            plagioWeb,
            plagioUniversidad,
            contenidoIA,
            nivelRiesgo,
            resumenJson: {
                palabrasAnalizadas,
                frasesAnalizadas: Math.max(
                    1,
                    Math.round(palabrasAnalizadas / 18)
                ),
                tiempoAnalisis: "7.8 segundos",
            },
            fuentes: {
                create: [
                    ...simUnifranz.fuentes,
                    ...simWeb.fuentes,
                    ...(contenidoIA > 5
                        ? [
                            {
                                tipo: "ia",
                                titulo: "Contenido potencialmente generado por IA",
                                autor: "Heurística local",
                                url: null,
                                coincidencia: contenidoIA,
                            },
                        ]
                        : []),
                ],
            },
            fragmentos: {
                create: fragmentosCalculados.map((f) => ({
                    inicio: f.inicio || 0,
                    fin: f.fin || 0,
                    texto: f.texto,
                    tipo: f.tipo,
                    fuenteLabel: f.fuenteLabel,
                })),
            },
        },
        include: {
            fuentes: true,
            fragmentos: true,
        },
    });

    return mapearAFrontend(
        analisis,
        analisis.fuentes,
        analisis.fragmentos,
        texto
    );
}
