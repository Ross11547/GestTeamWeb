import { PrismaClient } from "@prisma/client";
import fetch from "cross-fetch";

const prisma = new PrismaClient();

function normalizarTextoBase(texto) {
    return texto
        .toLowerCase()
        .replace(/[^a-záéíóúñü0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3);
}

function calcularJaccard(wordsA, wordsB) {
    const setA = new Set(wordsA);
    const setB = new Set(wordsB);

    const inter = new Set([...setA].filter((x) => setB.has(x)));
    const menor = Math.min(setA.size, setB.size) || 1;

    return (inter.size / menor) * 100; // 0-100
}

function segmentarOraciones(texto) {
    return texto
        .split(/(?<=[.!?])\s+/)
        .map((o) => o.trim())
        .filter((o) => o.length > 20);
}

export async function buscarEnRepositorioUnifranz(textoDocumento) {
    const docsRepo = await prisma.documento.findMany({
        where: {
            esRepositorioUnifranz: true,
            contenidoTexto: { not: null },
        },
    });

    const palabrasDoc = normalizarTextoBase(textoDocumento);

    if (!docsRepo.length || palabrasDoc.length === 0) {
        return {
            porcentajeGlobal: 0,
            fuentes: [],
        };
    }

    const fuentes = [];

    for (const doc of docsRepo) {
        const palabrasRepo = normalizarTextoBase(doc.contenidoTexto || "");
        if (palabrasRepo.length === 0) continue;

        const similitud = calcularJaccard(palabrasDoc, palabrasRepo);
        if (similitud > 1) {
            fuentes.push({
                tipo: "universidad",
                titulo: doc.nombre,
                autor: "Repositorio UNIFRANZ",
                url: null,
                coincidencia: Math.round(similitud),
            });
        }
    }

    fuentes.sort((a, b) => b.coincidencia - a.coincidencia);

    const top3 = fuentes.slice(0, 3);
    const porcentajeGlobal =
        top3.length === 0
            ? 0
            : Math.min(
                100,
                Math.round(
                    top3.reduce((acc, f) => acc + f.coincidencia, 0) / top3.length
                )
            );

    return {
        porcentajeGlobal,
        fuentes: top3,
    };
}

async function buscarEnSerper(query) {
    const apiKey = process.env.SERPER_KEY;
    const endpoint =
        process.env.SERPER_URL || "https://google.serper.dev/search";

    if (!apiKey) {
        console.warn("SERPER_KEY no configurado. Se omite búsqueda web.");
        return [];
    }

    const body = {
        q: query,
        gl: "bo", 
        hl: "es", 
        num: 5,   
    };

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        console.error("Error Serper:", res.status, await res.text());
        return [];
    }

    const json = await res.json();
    const organic = json.organic || [];

    return organic.map((item) => ({
        name: item.title,
        url: item.link,
        snippet: item.snippet || "",
    }));
}

export async function buscarEnWeb(textoDocumento) {
    const oraciones = segmentarOraciones(textoDocumento);
    const coincidenciasPorOracion = new Array(oraciones.length).fill(null);

    if (oraciones.length === 0) {
        return {
            porcentajeGlobal: 0,
            fuentes: [],
            oraciones,
            coincidenciasPorOracion,
        };
    }

    const maxConsultas = 18;
    const indicesOrdenados = oraciones
        .map((o, idx) => ({ idx, len: o.length }))
        .sort((a, b) => b.len - a.len)
        .slice(0, maxConsultas);

    const fuentesMap = new Map();

    for (const { idx } of indicesOrdenados) {
        const oracion = oraciones[idx];
        const query = oracion.slice(0, 140);

        try {
            const resultados = await buscarEnSerper(query);
            if (!resultados.length) continue;

            const palabrasOracion = normalizarTextoBase(oracion);

            for (const r of resultados) {
                const palabrasSnippet = normalizarTextoBase(r.snippet || r.name || "");
                if (palabrasSnippet.length === 0) continue;

                const sim = calcularJaccard(palabrasOracion, palabrasSnippet);

                if (sim >= 40) {
                    let host = "";
                    try {
                        const urlObj = new URL(r.url);
                        host = urlObj.hostname.replace(/^www\./, "");
                    } catch {
                        host = "";
                    }

                    if (!fuentesMap.has(r.url)) {
                        fuentesMap.set(r.url, {
                            tipo: "web",
                            titulo: r.name,
                            autor: host,
                            url: r.url,
                            coincidencia: Math.round(sim),
                        });
                    } else {
                        const f = fuentesMap.get(r.url);
                        f.coincidencia = Math.max(f.coincidencia, Math.round(sim));
                    }

                    if (
                        !coincidenciasPorOracion[idx] ||
                        coincidenciasPorOracion[idx].score < sim
                    ) {
                        coincidenciasPorOracion[idx] = {
                            score: sim,
                            url: r.url,
                            titulo: r.name,
                        };
                    }
                }
            }
        } catch (e) {
            console.error("Error buscando en web para oración:", e);
        }
    }

    const fuentes = Array.from(fuentesMap.values())
        .sort((a, b) => b.coincidencia - a.coincidencia)
        .slice(0, 5);

    const porcentajeGlobal =
        fuentes.length === 0
            ? 0
            : Math.min(
                40,
                Math.round(
                    fuentes.reduce((acc, f) => acc + f.coincidencia, 0) /
                    fuentes.length
                )
            );

    return {
        porcentajeGlobal,
        fuentes,
        oraciones,
        coincidenciasPorOracion,
    };
}
