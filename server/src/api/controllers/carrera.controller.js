import { listarCarreraCasoUso } from "../../application/casosUso/carrera/listarCarrera.js";
import { obtenerCarreraCasoUso } from "../../application/casosUso/carrera/obtenerCarreraID.js";
import { crearCarreraCasoUso } from "../../application/casosUso/carrera/crearCarrera.js";
import { actualizarCarreraCasoUso } from "../../application/casosUso/carrera/actualizarCarrera.js";
import { eliminarCarreraCasoUso } from "../../application/casosUso/carrera/eliminarCarrera.js";

export async function listarCarrera(req, res, next) {
    try {
        const data = await listarCarreraCasoUso(req.query);
        res.json({ data, mensaje: "Carreras listadas correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function obtenerCarrera(req, res, next) {
    try {
        const data = await obtenerCarreraCasoUso(Number(req.params.id));
        res.json({ data, mensaje: "Carrera obtenida correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function crearCarrera(req, res, next) {
    try {
        const data = await crearCarreraCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Carrera creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function actualizarCarrera(req, res, next) {
    try {
        const data = await actualizarCarreraCasoUso(Number(req.params.id), req.body);
        res.json({ data, mensaje: "Carrera actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarCarrera(req, res, next) {
    try {
        const data = await eliminarCarreraCasoUso(Number(req.params.id));
        res.json({ data, mensaje: "Carrera eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
