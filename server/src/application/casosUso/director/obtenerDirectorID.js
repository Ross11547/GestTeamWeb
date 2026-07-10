import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { toDirectorDTO } from "./codigoDirector.js";

export async function obtenerDirectorCasoUso({ id, rolId }) {
    const u = await prisma.usuario.findUnique({
        where: { id },
        include: {
            facultad: { select: { id: true, nombre: true } },
            carrera: { select: { id: true, nombre: true, sigla: true } },
            rol: { select: { id: true, nombre: true } },
            docenteMaterias: { include: { materia: { select: { id: true, nombre: true } } } },
        },
    });

    if (!u || u.idRol !== rolId || !u.esDirector) return null;

    return {
        ...toDirectorDTO(u),
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
