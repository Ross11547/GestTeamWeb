export function ensureIdPositivo(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
}

export function normalizarNombreRol(nombre) {
    return String(nombre || "").trim().replace(/\s+/g, " ");
}
