import { listarInstitucion } from "../../../dominio/institucion/validacionInstitucion.js";
import { institucionRepositorio } from "../../../infrastructure/repositories/repositorioInstitucion.js";

export async function listarInstitucionCasoUso(query) {
    const filtros = listarInstitucion.parse(query);
    return institucionRepositorio.listar(filtros);
}

