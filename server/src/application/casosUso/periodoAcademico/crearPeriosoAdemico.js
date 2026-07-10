import { crearPeriodoAcademico } from "../../../dominio/periodoAcademico/vlidacionPeriodoAcademico.js";
import { periodoAcademicoRepositorio } from "../../../infrastructure/repositories/repositorioPeriodoAcademico.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function crearPeriodoAcademicoCasoUso(payload) {
    const data = crearPeriodoAcademico.parse(payload);

    const ini = new Date(data.fechaIni);
    const fin = new Date(data.fechaFin);
    if (!(fin > ini)) {
        throw new Error("fechaFin debe ser mayor que fechaIni");
    }

    const inst = await prisma.institucion.findUnique({
        where: { id: data.institucionId },
        select: { id: true },
    });
    if (!inst) throw new Error("La institución no existe");

    const existeNombre = await periodoAcademicoRepositorio.existeNombreEnInstitucion(
        data.institucionId,
        data.nombre
    );
    if (existeNombre) throw new Error("Ya existe un periodo con ese nombre en la institución");

    return prisma.$transaction(async (tx) => {
        if (data.activo === true) {
            await tx.periodoAcademico.updateMany({
                where: { institucionId: data.institucionId, activo: true },
                data: { activo: false },
            });
        }

        return tx.periodoAcademico.create({
            data: {
                institucionId: data.institucionId,
                nombre: data.nombre,
                fechaIni: ini,
                fechaFin: fin,
                activo: data.activo ?? false,
            },
            include: { institucion: { select: { id: true, nombre: true, slug: true } } },
        });
    });
}
