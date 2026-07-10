import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { getRoleIdsDashboard } from "./rolesDashboard.js";

export async function resumenDashboardCasoUso() {
    const ids = await getRoleIdsDashboard();

    const [docentes, alumnos, facultades, directores] = await Promise.all([
        ids.DOCENTE ? prisma.usuario.count({ where: { idRol: ids.DOCENTE } }) : 0,
        ids.ESTUDIANTE ? prisma.usuario.count({ where: { idRol: ids.ESTUDIANTE } }) : 0,
        prisma.facultad.count(),
        ids.DIRECTOR ? prisma.usuario.count({ where: { idRol: ids.DIRECTOR } }) : 0,
    ]);

    return { docentes, alumnos, facultades, directores };
}
