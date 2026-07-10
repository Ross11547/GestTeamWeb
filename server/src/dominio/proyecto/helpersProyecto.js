export function ensureIdPositivo(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
}

export function normalizarTexto(v) {
    return String(v || "").trim().replace(/\s+/g, " ");
}
