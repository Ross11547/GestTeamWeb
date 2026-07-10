import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { login } from "../../../dominio/usuario/validacionUsuario.js";
import { dominioInstitucional, validarCorreoInstitucional } from "../../../dominio/usuario/helpersUsuario.js";

const isBcryptHash = (value) => typeof value === "string" && value.startsWith("$2");

export async function loginCasoUso(payload) {
    const body = login.parse(payload);

    const domain = dominioInstitucional();
    if (!validarCorreoInstitucional(body.correo)) {
        const e = new Error(`El correo debe ser institucional (@${domain})`);
        e.status = 400;
        throw e;
    }

    const user = await prisma.usuario.findUnique({
        where: { correo: String(body.correo).trim().toLowerCase() },
        include: {
            rol: { select: { id: true, nombre: true } },
            githubAuth: { select: { accessToken: true } },
            facultad: { select: { id: true, nombre: true, theme: true } },
            carrera: { select: { id: true, nombre: true, sigla: true } },
            semestre: { select: { id: true, numero: true, etiqueta: true } },
        },
    });

    if (!user) {
        const e = new Error("Usuario o contraseña incorrectos");
        e.status = 401;
        throw e;
    }

    const incoming = String(body.password);
    const stored = String(user.password || "");

    let ok = false;

    if (isBcryptHash(stored)) {
        ok = await bcrypt.compare(incoming, stored);
    } else {
        ok = incoming === stored;
        if (ok) {
            const newHash = await bcrypt.hash(incoming, 10);
            await prisma.usuario.updateMany({
                where: { id: user.id, password: stored },
                data: { password: newHash },
            });
        }
    }

    if (!ok) {
        const e = new Error("Usuario o contraseña incorrectos");
        e.status = 401;
        throw e;
    }

    const token = jwt.sign(
        { uid: user.id, rol: user.rol?.nombre },
        process.env.SESSION_SECRET || "dev_secret",
        { expiresIn: "1d" }
    );

    const { password, ...userSinPassword } = user;

    return {
        mensaje: "Inicio de sesión correcto",
        data: { ...userSinPassword, rol: user.rol?.nombre },
        token,
    };
}
