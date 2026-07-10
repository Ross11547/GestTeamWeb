import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { semLabel, buildCodigo, siglaDesdeCarreraOFacultad } from "./codigoEstudiante.js";

export async function obtenerEstudianteCasoUso({ id, rolId }) {
    const u = await prisma.usuario.findUnique({
        where: { id },
        include: {
            facultad: { select: { id: true, nombre: true } },
            carrera: { select: { id: true, nombre: true, sigla: true } },
            semestre: { select: { id: true, numero: true, etiqueta: true } },
            rol: { select: { id: true, nombre: true } },
        },
    });

    if (!u || u.idRol !== rolId) return null;

    return {
        id: u.id,
        nombre: u.nombre,
        apellido: u.apellido || "",
        email: u.correo,
        telefono: u.telefono || "",
        ci: u.ci,
        departamento: u.facultad?.nombre || "",
        especialidad: u.carrera?.nombre || "",
        semestre: semLabel(u.semestre),
        codigo: u.codigo || buildCodigo(siglaDesdeCarreraOFacultad(u.carrera?.nombre, u.facultad?.nombre), u.ci),
        raw: {
            nombre: u.nombre,
            apellido: u.apellido || "",
            correo: u.correo,
            telefono: u.telefono || "",
            idFacultad: u.idFacultad,
            idCarrera: u.idCarrera,
            semestreId: u.semestreId,
            ci: u.ci,
            codigo: u.codigo,
            activo: u.activo,
            materiaIds: [],
        },
    };
}
