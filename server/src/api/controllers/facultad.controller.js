import { listarFacultadCasoUso } from "../../application/casosUso/facultad/listarFacultades.js";
import { obtenerFacultadCasoUso } from "../../application/casosUso/facultad/obtenerFacultadID.js";
import { crearFacultadCasoUso } from "../../application/casosUso/facultad/crearFacultad.js";
import { actualizarFacultadCasoUso } from "../../application/casosUso/facultad/actualizarFacultad.js";
import { eliminarFacultadCasoUso } from "../../application/casosUso/facultad/eliminarFacultad.js";

export async function listarFacultad(req, res, next) {
    try {
        const data = await listarFacultadCasoUso(req.query);
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

export async function obtenerFacultad(req, res, next) {
    try {
        const data = await obtenerFacultadCasoUso(Number(req.params.id));
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

export async function crearFacultad(req, res, next) {
    try {
        const data = await crearFacultadCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Facultad creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarFacultad(req, res, next) {
    try {
        const data = await actualizarFacultadCasoUso(Number(req.params.id), req.body);
        res.json({ data, mensaje: "Facultad actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarFacultad(req, res, next) {
    try {
        const data = await eliminarFacultadCasoUso(Number(req.params.id));
        res.json({ data, mensaje: "Facultad eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
