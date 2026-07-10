export function ensureIdPositivo(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
}

export function limpiarTexto(v) {
    const t = String(v ?? "").trim().replace(/\s+/g, " ");
    return t.length ? t : null;
}

export function normalizarParalelo(v) {
    const t = limpiarTexto(v);
    return t ? t.toUpperCase() : null;
}
