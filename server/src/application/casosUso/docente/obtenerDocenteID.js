import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { derivarSigla } from "./codigoDocente.js";

export async function obtenerDocenteCasoUso({ id, rolId }) {
    const u = await prisma.usuario.findUnique({
        where: { id },
        include: {
            facultad: { select: { id: true, nombre: true } },
            carrera: { select: { id: true, nombre: true } },
            rol: { select: { id: true, nombre: true } },
            docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
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
        materias: u.docenteMaterias.map((dm) => ({ id: dm.materia.id, nombre: dm.materia.nombre })),
        codigo: u.codigo || `${derivarSigla(u.carrera?.nombre || u.facultad?.nombre)}${u.ci}`,
        raw: {
            nombre: u.nombre,
            apellido: u.apellido,
            correo: u.correo,
            telefono: u.telefono,
            idFacultad: u.idFacultad,
            idCarrera: u.idCarrera,
            ci: u.ci,
            codigo: u.codigo,
            activo: u.activo,
            materiaIds: u.docenteMaterias.map((dm) => dm.materia.id),
        },
    };
}
