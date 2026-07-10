import { actualizarPeriodoAcademico } from "../../../dominio/periodoAcademico/vlidacionPeriodoAcademico.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { periodoAcademicoRepositorio } from "../../../infrastructure/repositories/repositorioPeriodoAcademico.js";

export async function actualizarPeriodoAcademicoCasoUso(id, payload) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");
    const data = actualizarPeriodoAcademico.parse(payload);

    const actual = await prisma.periodoAcademico.findUnique({
        where: { id },
        select: { id: true, institucionId: true, fechaIni: true, fechaFin: true, nombre: true },
    });
    if (!actual) throw new Error("Periodo académico no encontrado");

    const ini = data.fechaIni ? new Date(data.fechaIni) : actual.fechaIni;
    const fin = data.fechaFin ? new Date(data.fechaFin) : actual.fechaFin;
    if (!(fin > ini)) throw new Error("fechaFin debe ser mayor que fechaIni");

    if (data.nombre && data.nombre !== actual.nombre) {
        const existe = await periodoAcademicoRepositorio.existeNombreEnInstitucion(
            actual.institucionId,
            data.nombre,
            id
        );
        if (existe) throw new Error("Ya existe un periodo con ese nombre en la institución");
    }

    return prisma.$transaction(async (tx) => {
        if (data.activo === true) {
            await tx.periodoAcademico.updateMany({
                where: { institucionId: actual.institucionId, activo: true, NOT: { id } },
                data: { activo: false },
            });
        }

        return tx.periodoAcademico.update({
            where: { id },
            data: {
                ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
                ...(data.fechaIni !== undefined ? { fechaIni: ini } : {}),
                ...(data.fechaFin !== undefined ? { fechaFin: fin } : {}),
                ...(data.activo !== undefined ? { activo: data.activo } : {}),
            },
            include: { institucion: { select: { id: true, nombre: true, slug: true } } },
        });
    });
}
