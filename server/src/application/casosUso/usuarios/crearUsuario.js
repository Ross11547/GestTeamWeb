import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { usuarioRepositorio } from "../../../infrastructure/repositories/repositorioUsuario.js";
import { crearUsuario } from "../../../dominio/usuario/validacionUsuario.js";
import { limpiarTexto, toUsuarioDTO } from "../../../dominio/usuario/helpersUsuario.js";

export async function crearUsuarioCasoUso(payload) {
    const body = crearUsuario.parse(payload);

    const rol = await usuarioRepositorio.existeRol(Number(body.idRol));
    if (!rol) {
        const e = new Error("El rol indicado no existe");
        e.status = 400;
        throw e;
    }

    let carrera = null;
    if (body.idFacultad != null) {
        const fac = await usuarioRepositorio.existeFacultad(Number(body.idFacultad));
        if (!fac) {
            const e = new Error("La facultad indicada no existe");
            e.status = 400;
            throw e;
        }
    }

    if (body.idCarrera != null) {
        carrera = await usuarioRepositorio.existeCarrera(Number(body.idCarrera));
        if (!carrera) {
            const e = new Error("La carrera indicada no existe");
            e.status = 400;
            throw e;
        }
        if (body.idFacultad != null && carrera.idFacultad !== Number(body.idFacultad)) {
            const e = new Error("La carrera no pertenece a la facultad seleccionada");
            e.status = 400;
            throw e;
        }
    }

    if (body.semestreId != null) {
        const sem = await usuarioRepositorio.existeSemestre(Number(body.semestreId));
        if (!sem) {
            const e = new Error("El semestre indicado no existe");
            e.status = 400;
            throw e;
        }
        if (body.idCarrera != null && sem.carreraId !== Number(body.idCarrera)) {
            const e = new Error("El semestre no pertenece a la carrera seleccionada");
            e.status = 400;
            throw e;
        }
    }

    const dupeCorreo = await usuarioRepositorio.existeCorreo(body.correo);
    if (dupeCorreo) {
        const e = new Error("El correo ingresado ya está registrado");
        e.status = 409;
        throw e;
    }

    if (body.codigo) {
        const dupCodigo = await usuarioRepositorio.existeCodigo(body.codigo);
        if (dupCodigo) {
            const e = new Error("El código ya está en uso");
            e.status = 409;
            throw e;
        }
    }

    const passwordHash = await bcrypt.hash(String(body.password), 10);

    try {
        const creado = await usuarioRepositorio.crear({
            nombre: limpiarTexto(body.nombre),
            apellido: limpiarTexto(body.apellido),
            telefono: limpiarTexto(body.telefono),
            ci: Number(body.ci),
            correo: String(body.correo).trim().toLowerCase(),
            password: passwordHash,
            idRol: Number(body.idRol),
            activo: Boolean(body.activo),

            codigo: body.codigo ? String(body.codigo).trim() : null,
            idFacultad: body.idFacultad != null ? Number(body.idFacultad) : null,
            idCarrera: body.idCarrera != null ? Number(body.idCarrera) : null,
            semestreId: body.semestreId != null ? Number(body.semestreId) : null,
            esDirector: body.esDirector === true,
        });

        return toUsuarioDTO(creado);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            const e = new Error("Correo o código en uso");
            e.status = 409;
            throw e;
        }
        throw err;
    }
}
