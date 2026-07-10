import { prisma } from "../../../infrastructure/db/prisma.client.js";
import { getRoleIdsDashboard } from "./rolesDashboard.js";

export async function crecimientoEstudiantesCasoUso({ from, to }) {
  const f = Number(from);
  const t = Number(to);

  if (!Number.isInteger(f) || !Number.isInteger(t) || f > t) {
    const err = new Error("Rango inválido: from/to");
    err.status = 400;
    throw err;
  }

  const ids = await getRoleIdsDashboard();
  const range = Array.from({ length: t - f + 1 }, (_, i) => f + i);

  if (!ids.ESTUDIANTE) {
    return range.map((y) => ({ name: String(y), estudiantes: 0 }));
  }

  const out = [];
  for (const y of range) {
    const start = new Date(Date.UTC(y, 0, 1, 0, 0, 0));
    const end = new Date(Date.UTC(y + 1, 0, 1, 0, 0, 0));

    const count = await prisma.usuario.count({
      where: {
        idRol: ids.ESTUDIANTE,
        createdAt: { gte: start, lt: end },
      },
    });

    out.push({ name: String(y), estudiantes: count });
  }

  return out;
}
