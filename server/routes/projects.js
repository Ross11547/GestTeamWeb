// server/routes/projects.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/client.js';

const router = express.Router();
const JWT_SECRET = process.env.SESSION_SECRET || 'dev_secret';

// ---- helpers auth -----------------------------------------------------------
function getUid(req) {
    const h = req.headers.authorization || '';
    const m = h.match(/^Bearer\s+(.+)$/i);
    if (!m) return null;
    try {
        const p = jwt.verify(m[1], JWT_SECRET);
        return Number(p.uid);
    } catch {
        return null;
    }
}

async function ensureAuth(req, res, next) {
    try {
        const auth = req.headers.authorization || '';
        if (auth.startsWith('Bearer ')) {
            const payload = jwt.verify(auth.slice(7), JWT_SECRET);
            const user = await prisma.usuario.findUnique({ where: { id: Number(payload.uid) } });
            if (user) { req.user = user; return next(); }
        }
        return res.status(401).json({ error: 'No autenticado' });
    } catch {
        return res.status(401).json({ error: 'No autenticado' });
    }
}

// ---- POST /projects  => { titulo, tipoGrupo: 'GROUP'|'INDIVIDUAL', materiaId } ----
router.post('/', ensureAuth, async (req, res) => {
    try {
        const uid = req.user.id;
        const { titulo, tipoGrupo = 'GROUP', materiaId } = req.body || {};

        if (!titulo || !titulo.trim()) {
            return res.status(400).json({ error: 'titulo es requerido' });
        }
        if (!['GROUP', 'INDIVIDUAL'].includes(String(tipoGrupo))) {
            return res.status(400).json({ error: 'tipoGrupo inválido' });
        }
        const mid = Number(materiaId);
        if (!mid) {
            return res.status(400).json({ error: 'materiaId es requerido' });
        }

        // Materia + validación por facultad (opcional)
        const materia = await prisma.materia.findUnique({
            where: { id: mid },
            select: {
                codigo: true,
                carrera: { select: { idFacultad: true } },
            },
        });
        if (!materia) return res.status(400).json({ error: 'La materia no existe' });

        const user = await prisma.usuario.findUnique({
            where: { id: uid },
            select: { idFacultad: true },
        });
        if (user?.idFacultad && materia.carrera?.idFacultad && user.idFacultad !== materia.carrera.idFacultad) {
            return res.status(403).json({ error: 'La materia no pertenece a tu facultad' });
        }

        // Crear proyecto
        const proyecto = await prisma.proyecto.create({
            data: {
                titulo: titulo.trim(),
                tipoGrupo,
                codigoMateria: materia.codigo || null, // solo guardas el código en tu modelo actual
            },
        });

        // Agregar creador como OWNER (si existiese por algún motivo, no duplicar)
        await prisma.miembroProyecto.upsert({
            where: { proyectoId_usuarioId: { proyectoId: proyecto.id, usuarioId: uid } },
            update: { rol: 'OWNER' },
            create: { proyectoId: proyecto.id, usuarioId: uid, rol: 'OWNER' },
        });

        return res.json({ ok: true, project: proyecto });
    } catch (e) {
        console.error('POST /projects error:', e);
        return res.status(500).json({ error: 'No se pudo crear el proyecto' });
    }
});

// ---- POST /projects/:id/members  => agrega miembro (solo OWNER) ---------------
router.post('/:id/members', ensureAuth, async (req, res) => {
    try {
        const proyectoId = Number(req.params.id);
        const { usuarioId, correo, rol = 'MEMBER' } = req.body || {};

        const proyecto = await prisma.proyecto.findUnique({ where: { id: proyectoId } });
        if (!proyecto) return res.status(404).json({ error: 'Proyecto no existe' });

        // Solo OWNER puede agregar
        const mp = await prisma.miembroProyecto.findUnique({
            where: { proyectoId_usuarioId: { proyectoId, usuarioId: req.user.id } },
        });
        if (!mp || String(mp.rol).toUpperCase() !== 'OWNER') {
            return res.status(403).json({ error: 'Solo OWNER puede agregar miembros' });
        }

        // Resolver usuario a agregar
        let userToAdd = null;
        if (usuarioId) userToAdd = await prisma.usuario.findUnique({ where: { id: Number(usuarioId) } });
        if (!userToAdd && correo) userToAdd = await prisma.usuario.findUnique({ where: { correo: String(correo) } });
        if (!userToAdd) return res.status(404).json({ error: 'Usuario a agregar no existe' });

        // Evitar duplicado
        const yaEsMiembro = await prisma.miembroProyecto.findUnique({
            where: { proyectoId_usuarioId: { proyectoId, usuarioId: userToAdd.id } },
        });
        if (yaEsMiembro) return res.status(409).json({ error: 'El usuario ya es miembro del proyecto' });

        const miembro = await prisma.miembroProyecto.create({
            data: { proyectoId, usuarioId: userToAdd.id, rol: String(rol || 'MEMBER').toUpperCase() },
        });

        return res.json({ ok: true, miembro });
    } catch (e) {
        console.error('POST /projects/:id/members error:', e);
        return res.status(500).json({ error: 'No se pudo agregar el miembro' });
    }
});

// ---- GET /projects/my  => proyectos donde participo ---------------------------
router.get('/my', ensureAuth, async (req, res) => {
    try {
        const uid = req.user.id;

        const rows = await prisma.miembroProyecto.findMany({
            where: { usuarioId: uid },
            include: { proyecto: true },
            orderBy: { joinedAt: 'desc' },
        });

        return res.json({
            projects: rows.map(r => ({
                id: r.proyecto.id,
                titulo: r.proyecto.titulo,
                codigoMateria: r.proyecto.codigoMateria,
                tipoGrupo: r.proyecto.tipoGrupo,
                repoUrl: r.proyecto.repoUrl,
                rol: r.rol,
            })),
        });
    } catch (e) {
        console.error('GET /projects/my error:', e);
        return res.status(500).json({ error: 'No se pudo obtener proyectos' });
    }
});

export default router;
