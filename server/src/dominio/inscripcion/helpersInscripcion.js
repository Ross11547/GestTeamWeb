export function ensureIdPositivo(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
}

export function aEnteroPositivo(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
}
