import { crearInstitucionCasoUso} from "../../application/casosUso/institucion/crearInstitución.js";
import { listarInstitucionCasoUso} from "../../application/casosUso/institucion/listarInstitucion.js";
import { obtenerInstitucionCasoUso} from "../../application/casosUso/institucion/obtenerInstitucion.js";
import { actualizarInstitucionCasoUso} from "../../application/casosUso/institucion/actualizarInstitucion.js";
import { eliminarInstitucionCasoUso} from "../../application/casosUso/institucion/eliminarInstitucion.js";

export async function crearInstitucion(req, res, next) {
    try {
        const data = await crearInstitucionCasoUso(req.body);
        res.status(201).json({ data, mensaje: "Institución creada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function listarInstitucion(req, res, next) {
    try {
        const data = await listarInstitucionCasoUso(req.query);
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

export async function obtenerInstitucion(req, res, next) {
    try {
        const data = await obtenerInstitucionCasoUso(Number(req.params.id));
        res.json({ data });
    } catch (e) {
        next(e);
    }
}

export async function actualizarInstitucion(req, res, next) {
    try {
        const data = await actualizarInstitucionCasoUso(
            Number(req.params.id),
            req.body
        );
        res.json({ data, mensaje: "Institución actualizada correctamente" });
    } catch (e) {
        next(e);
    }
}

export async function eliminarInstitucion(req, res, next) {
    try {
        await eliminarInstitucionCasoUso(Number(req.params.id));
        res.json({ mensaje: "Institución eliminada correctamente" });
    } catch (e) {
        next(e);
    }
}
