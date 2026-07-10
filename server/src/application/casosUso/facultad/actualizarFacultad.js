import { Prisma } from "@prisma/client";
import { actualizarFacultad, parseTheme } from "../../../dominio/facultad/validacionFacultad.js";
import { facultadRepositorio } from "../../../infrastructure/repositories/repositorioFacultad.js";
import { prisma } from "../../../infrastructure/db/prisma.client.js";

export async function actualizarFacultadCasoUso(id, payload) {
    if (!Number.isInteger(id) || id <= 0) throw new Error("id inválido");
    const data = actualizarFacultad.parse(payload);

    const actual = await prisma.facultad.findUnique({
        where: { id },
        select: { id: true, institucionId: true, nombre: true },
    });
    if (!actual) throw new Error("Facultad no encontrada");

    const institucionIdFinal =
        data.institucionId !== undefined ? (data.institucionId ?? null) : actual.institucionId;

    if (data.institucionId) {
        const inst = await prisma.institucion.findUnique({
            where: { id: data.institucionId },
            select: { id: true },
        });
        if (!inst) throw new Error("La institución no existe");
    }

    const nombreFinal = data.nombre !== undefined ? data.nombre : actual.nombre;

    // validar duplicado por institución
    if (data.nombre !== undefined || data.institucionId !== undefined) {
        const yaExiste = await facultadRepositorio.existePorNombreEnInstitucion(
            institucionIdFinal,
            nombreFinal,
            id
        );
        if (yaExiste) throw new Error("Ya existe una facultad con ese nombre en la institución");
    }

    try {
        return await facultadRepositorio.actualizar(id, {
            ...(data.institucionId !== undefined ? { institucionId: institucionIdFinal } : {}),
            ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
            ...(data.theme !== undefined ? { theme: parseTheme(data.theme) } : {}),
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
            throw new Error("Ya existe una facultad con ese nombre en la institución");
        }
        throw e;
    }
}
