import { crearHorario } from "../../../dominio/horario/validacionHorario.js";
import { toHoraDate } from "../../../dominio/horario/helpersHorario.js";
import { horarioRepositorio } from "../../../infrastructure/repositories/repositorioHorario.js";

export async function crearHorarioCasoUso(payload) {
    const body = crearHorario.parse(payload);

    const mat = await horarioRepositorio.existeMateria(body.materiaId);
    if (!mat) throw new Error("La materia indicada no existe");

    const ini = toHoraDate(body.horaInicio);
    const fin = toHoraDate(body.horaFin);

    if (!ini || !fin) throw new Error("Formato de hora inválido (use HH:MM)");
    if (fin <= ini) throw new Error("horaFin debe ser mayor que horaInicio");

    const solapa = await horarioRepositorio.haySolapamiento({
        materiaId: body.materiaId,
        dia: body.dia,
        ini,
        fin,
    });
    if (solapa) throw new Error("El horario se solapa con otro existente para esa materia y día");

    return horarioRepositorio.crear({
        materiaId: body.materiaId,
        dia: body.dia,
        horaInicio: ini,
        horaFin: fin,
        aula: body.aula,
    });
}
