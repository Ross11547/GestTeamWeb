export function ensureIdPositivo(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
}

export function limpiarTexto(v) {
    return String(v ?? "").trim().replace(/\s+/g, " ");
}

export function dominioInstitucional() {
    return process.env.ALLOWED_INSTITUTION_DOMAIN || "unifranz.edu.bo";
}

export function validarCorreoInstitucional(correo) {
    const domain = dominioInstitucional();
    const re = new RegExp(`^[a-zA-Z0-9._%+-]+@${domain.replace(".", "\\.")}$`);
    return re.test(String(correo || "").trim());
}

export function toUsuarioDTO(u) {
    if (!u) return null;
    const { password, ...rest } = u;
    return rest;
}
