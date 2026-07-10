import { listarUsuariosCasoUso } from "../../application/casosUso/usuarios/listarUsuarios.js";
import { obtenerUsuarioPorIdCasoUso } from "../../application/casosUso/usuarios/obtenerUsuarioID.js";
import { crearUsuarioCasoUso } from "../../application/casosUso/usuarios/crearUsuario.js";
import { actualizarUsuarioCasoUso } from "../../application/casosUso/usuarios/actualizarUsuario.js";
import { eliminarUsuarioCasoUso } from "../../application/casosUso/usuarios/eliminarUsuario.js";
import { loginCasoUso } from "../../application/casosUso/usuarios/login.js";
import { ensureIdPositivo } from "../../dominio/usuario/helpersUsuario.js";

export async function listarUsuarios(req, res, next) {
    try {
        const data = await listarUsuariosCasoUso();
        res.json({ data, mensaje: "usuarios obtenidos correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerUsuarioId(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "id inválido" });

        const data = await obtenerUsuarioPorIdCasoUso({ id });
        res.json({ data, mensaje: "usuario obtenido correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearUsuario(req, res, next) {
    try {
        const data = await crearUsuarioCasoUso(req.body);
        res.status(201).json({ mensaje: "Usuario agregado correctamente.", data });
    } catch (e) {
        next(e);
    }
}

export async function actualizarUsuario(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "id inválido" });

        const data = await actualizarUsuarioCasoUso({ id, data: req.body });
        res.json({ data, mensaje: "usuario actualizado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarUsuario(req, res, next) {
    try {
        const id = ensureIdPositivo(req.params.id);
        if (!id) return res.status(400).json({ mensaje: "id inválido" });

        const data = await eliminarUsuarioCasoUso({ id });
        res.json({ data, mensaje: "usuario eliminado correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function login(req, res, next) {
    try {
        const resultado = await loginCasoUso(req.body);
        res.status(200).json(resultado);
    } catch (e) {
        next(e);
    }
}
