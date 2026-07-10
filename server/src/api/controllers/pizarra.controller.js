import { listarPizarrasCasoUso } from "../../application/casosUso/pizarra/listarPizarras.js";
import { obtenerPizarraCasoUso } from "../../application/casosUso/pizarra/obtenerPizarra.js";
import { crearPizarraCasoUso } from "../../application/casosUso/pizarra/crearPizarra.js";
import { actualizarPizarraCasoUso } from "../../application/casosUso/pizarra/actualizarPizarra.js";
import { guardarContenidoPizarraCasoUso } from "../../application/casosUso/pizarra/guardarContenidoPizarra.js";
import { reemplazarColaboradoresCasoUso } from "../../application/casosUso/pizarra/gestionarColaboradores.js";
import { eliminarPizarraCasoUso } from "../../application/casosUso/pizarra/eliminarPizarra.js";

export async function listarPizarra(req, res, next) {
    try {
        const data = await listarPizarrasCasoUso(req.query);
        return res.json({ data, message: "pizarras obtenidas correctamente" });
    } catch (e) { return next(e); }
}

export async function obtenerPizarra(req, res, next) {
    try {
        const data = await obtenerPizarraCasoUso(req.params.id);
        return res.json({ data, message: "pizarra obtenida correctamente" });
    } catch (e) { return next(e); }
}

export async function crearPizarra(req, res, next) {
    try {
        const data = await crearPizarraCasoUso(req.body);
        return res.json({ data, message: "pizarra creada correctamente" });
    } catch (e) { return next(e); }
}

export async function actualizarPizarra(req, res, next) {
    try {
        const data = await actualizarPizarraCasoUso(req.params.id, req.body);
        return res.json({ data, message: "pizarra actualizada correctamente" });
    } catch (e) { return next(e); }
}

export async function guardarContenidoPizarra(req, res, next) {
    try {
        const data = await guardarContenidoPizarraCasoUso(req.params.id, req.body);
        return res.json({ data, message: "contenido guardado correctamente" });
    } catch (e) { return next(e); }
}

export async function reemplazarColaboradores(req, res, next) {
    try {
        const data = await reemplazarColaboradoresCasoUso(req.params.id, req.body);
        return res.json({ data, message: "colaboradores actualizados correctamente" });
    } catch (e) { return next(e); }
}

export async function eliminarPizarra(req, res, next) {
    try {
        const data = await eliminarPizarraCasoUso(req.params.id);
        return res.json({ data, message: "pizarra eliminada correctamente" });
    } catch (e) { return next(e); }
}
