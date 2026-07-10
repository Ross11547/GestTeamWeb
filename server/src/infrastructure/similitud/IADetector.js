function analizarTextoBasico(texto) {
    const oraciones = texto
        .split(/[.!?¡¿]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

    const palabras = texto
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w.trim())
        .filter((w) => w.length > 0);

    const totalPalabras = palabras.length || 1;
    const totalOraciones = oraciones.length || 1;

    const promedioPalabrasPorOracion = totalPalabras / totalOraciones;

    const vocabulario = new Set(palabras);
    const riquezaLexica = vocabulario.size / totalPalabras; // 0-1

    return {
        totalPalabras,
        totalOraciones,
        promedioPalabrasPorOracion,
        riquezaLexica,
    };
}

export function estimarContenidoIA(texto) {
    const analisis = analizarTextoBasico(texto);

    const normOracion = Math.min(analisis.promedioPalabrasPorOracion / 30, 1); // >30 palabras/oración
    const normRiqueza = 1 - Math.min(analisis.riquezaLexica / 0.6, 1); // si riqueza < 0.6 sube score

    const score = normOracion * 0.5 + normRiqueza * 0.5; // 0-1
    const porcentajeIA = Math.round(score * 100);

    return {
        porcentajeIA: Math.max(0, Math.min(100, porcentajeIA)),
        analisis,
    };
}
