import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { buildEmail, siglaCarreraOrFallback, buildCodigo } from "./codigoEstudiante.js";

export async function crearEstudianteCasoUso({ rolId, body }) {
    const {
        nombre,
        apellido = "",
        telefono = "",
        ci,
        idFacultad = null,
        idCarrera = null,
        semestreId = null,
        password = "123456",
        activo = true,
    } = body || {};

    if (!nombre || !ci) {
        const err = new Error("nombre y ci son requeridos");
        err.status = 400;
        throw err;
    }

    if (!Number.isInteger(Number(ci)) || Number(ci) <= 0) {
        const err = new Error("ci debe ser un número válido y positivo");
        err.status = 400;
        throw err;
    }

    if (idFacultad !== null) {
        const fac = await prisma.facultad.findUnique({ where: { id: Number(idFacultad) } });
        if (!fac) {
            const err = new Error("La facultad indicada no existe");
            err.status = 400;
            throw err;
        }
    }

    if (idCarrera !== null) {
        const car = await prisma.carrera.findUnique({ where: { id: Number(idCarrera) } });
        if (!car) {
            const err = new Error("La carrera indicada no existe");
            err.status = 400;
            throw err;
        }
    }

    if (semestreId !== null) {
        const sem = await prisma.semestre.findUnique({ where: { id: Number(semestreId) } });
        if (!sem) {
            const err = new Error("El semestre indicado no existe");
            err.status = 400;
            throw err;
        }
        if (idCarrera && sem.carreraId !== Number(idCarrera)) {
            const err = new Error("El semestre no pertenece a la carrera seleccionada");
            err.status = 400;
            throw err;
        }
    }

    const correo = buildEmail({ nombres: nombre, apellidos: apellido });
    const sigla = await siglaCarreraOrFallback(idCarrera, idFacultad);
    const codigo = buildCodigo(sigla, ci);

    try {
        return await prisma.usuario.create({
            data: {
                nombre,
                apellido,
                telefono,
                ci: Number(ci),
                correo,
                password, // TODO: hash
                idRol: rolId,
                activo: Boolean(activo),
                idFacultad: idFacultad ? Number(idFacultad) : null,
                idCarrera: idCarrera ? Number(idCarrera) : null,
                semestreId: semestreId ? Number(semestreId) : null,
                codigo,
            },
        });
    } catch (error) {
        if (error?.code === "P2002") {
            const err = new Error("Correo o código ya existen");
            err.status = 409;
            throw err;
        }
        throw error;
    }
}
