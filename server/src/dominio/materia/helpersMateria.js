const STOPWORDS = new Set([
    "a", "al", "con", "de", "del", "el", "la", "las", "los", "en", "para", "por", "sin",
    "y", "e", "o", "u", "un", "una", "uno", "unos", "unas", "the", "and", "of",
]);

const isRoman = (tok) => /^[IVXLCDM]+$/i.test(tok);
const isNumber = (tok) => /^\d+$/.test(tok);

export function normalizarTexto(s = "") {
    return String(s)
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .trim();
}

export function makeCodigoMateria(nombre) {
    if (!nombre) return "MAT";

    const raw = normalizarTexto(nombre)
        .replace(/[^A-Za-z0-9\s]+/g, " ")
        .trim();

    const sig = raw
        .split(/\s+/)
        .filter(Boolean)
        .filter((t) => !STOPWORDS.has(t.toLowerCase()))
        .filter((t) => !isRoman(t) && !isNumber(t))
        .map((t) => t.toUpperCase());

    if (sig.length === 0) return raw.replace(/\s+/g, "").toUpperCase().slice(0, 3) || "MAT";
    if (sig.length === 1) return sig[0].slice(0, 3);
    if (sig.length === 2) return sig[0][0] + sig[1].slice(0, 2);
    return sig[0][0] + sig[1][0] + sig[2][0];
}

export function extraerBaseCodigo(codigo = "") {
    return String(codigo).replace(/\d+$/, "").toUpperCase();
}

export function ensureInt(v) {
    const n = Number(v);
    return Number.isInteger(n) ? n : NaN;
}
