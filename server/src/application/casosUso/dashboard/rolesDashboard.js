import { prisma } from "../../../infrastructure/db/prisma.client.js";

const ROLE_NAMES = { DOCENTE: "Docente", ESTUDIANTE: "Estudiante", DIRECTOR: "Director" };

let _rolesCache = { at: 0, ids: {} };
const TTL = 5 * 60 * 1000;

export async function getRoleIdsDashboard() {
    if (Date.now() - _rolesCache.at < TTL && _rolesCache.ids.ESTUDIANTE) return _rolesCache.ids;

    const rows = await prisma.rol.findMany({ select: { id: true, nombre: true } });
    const byName = (n) =>
        rows.find((r) => String(r.nombre).toUpperCase() === String(n).toUpperCase())?.id ?? null;

    const ids = {
        DOCENTE: byName(ROLE_NAMES.DOCENTE),
        ESTUDIANTE: byName(ROLE_NAMES.ESTUDIANTE),
        DIRECTOR: byName(ROLE_NAMES.DIRECTOR),
    };

    _rolesCache = { at: Date.now(), ids };
    return ids;
}
