import { materiaRepositorio } from "../../../infrastructure/repositories/repositorioMateria.js";

export async function generarCodigoUnicoCasoUso(base) {
    const seed = String(base || "MAT").toUpperCase();
    let code = seed;
    let i = 1;

    while (true) {
        const exists = await materiaRepositorio.existePorCodigo(code);
        if (!exists) return code;
        i += 1;
        code = `${seed}${i}`;
    }
}
