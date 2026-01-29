// src/routes/github.js
import express from 'express';
import passport from '../auth.js';
import { Octokit } from '@octokit/rest';
import jwt from 'jsonwebtoken';

import { prisma } from '../db/client.js';
import { createAppJwt, getInstallationOctokit, getInstallationInfo } from '../utils/githubApp.js';
import { invitePersonalToProjectRepos } from '../utils/githubLink.js';

const router = express.Router();

const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';

// ============================
// Helpers
// ============================
async function ensureAuth(req, res, next) {
  try {
    const secret = process.env.SESSION_SECRET || 'dev_secret';
    const auth = req.headers.authorization || '';
    if (auth.startsWith('Bearer ')) {
      const payload = jwt.verify(auth.slice(7), secret);
      const user = await prisma.usuario.findUnique({ where: { id: Number(payload.uid) } });
      if (user) { req.user = user; return next(); }
    }
    const t = req.query.t;
    if (t) {
      const payload = jwt.verify(String(t), secret);
      const user = await prisma.usuario.findUnique({ where: { id: Number(payload.uid) } });
      if (user) { req.user = user; return next(); }
    }
    return res.status(401).json({ error: 'No autenticado' });
  } catch {
    return res.status(401).json({ error: 'No autenticado' });
  }
}

function slugifyRepoName(s = '') {
  return String(s)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 90);
}

// ============================
// OAuth GitHub (link cuentas)
// ============================

// Iniciar OAuth (INSTITUTIONAL | PERSONAL)
router.get('/oauth/start', ensureAuth, (req, res, next) => {
  const { type, t } = req.query;
  if (!['INSTITUTIONAL', 'PERSONAL'].includes(String(type))) {
    return res.status(400).json({ error: 'type inválido' });
  }
  const state = Buffer.from(JSON.stringify({ t: String(t || ''), type: String(type) }), 'utf8')
    .toString('base64');
  passport.authenticate('github-link', { state })(req, res, next);
});

// Callback de OAuth
router.get('/oauth/callback', (req, res, next) => {
  passport.authenticate('github-link', (err, user, info) => {
    if (err) {
      return res.redirect(`${FRONTEND}/?linked_error=${encodeURIComponent('Error en GitHub OAuth')}`);
    }
    if (!user) {
      const msg = info?.message || 'No se pudo enlazar';
      return res.redirect(`${FRONTEND}/?linked_error=${encodeURIComponent(msg)}`);
    }
    return res.redirect(`${FRONTEND}/?linked=ok`);
  })(req, res, next);
});

// ============================
// GitHub App (instalación)
// ============================

// Redirigir a instalación de la App (incluye state=t y guarda fallback en sesión)
router.get('/app/install', (req, res) => {
  const base = process.env.GITHUB_APP_INSTALL_REDIRECT; // ej: https://github.com/apps/<slug>/installations/new
  if (!base) return res.status(500).send('Falta GITHUB_APP_INSTALL_REDIRECT');

  const t = String(req.query.t || '');
  if (req.session) req.session.install_t = t;

  const url = base.includes('?')
    ? `${base}&state=${encodeURIComponent(t)}`
    : `${base}?state=${encodeURIComponent(t)}`;

  return res.redirect(url);
});

// Callback post-instalación (guarda installation_id)
// Soporta fallback si GitHub NO devuelve state (toma de req.session.install_t)
router.get('/app/installed', async (req, res) => {
  try {
    let { installation_id, state } = req.query;

    if (!installation_id) {
      return res.redirect(`${FRONTEND}/?app_install_error=${encodeURIComponent('Falta installation_id')}`);
    }

    if (!state && req.session?.install_t) {
      state = req.session.install_t;
    }
    if (!state) {
      return res.redirect(`${FRONTEND}/?app_install_error=${encodeURIComponent('No autenticado')}`);
    }

    let payload;
    try {
      payload = jwt.verify(String(state), process.env.SESSION_SECRET || 'dev_secret');
    } catch {
      return res.redirect(`${FRONTEND}/?app_install_error=${encodeURIComponent('Token inválido/expirado')}`);
    }

    const user = await prisma.usuario.findUnique({ where: { id: Number(payload.uid) } });
    if (!user) return res.redirect(`${FRONTEND}/?app_install_error=${encodeURIComponent('Usuario inválido')}`);

    try {
      const info = await getInstallationInfo(Number(installation_id));
      const ownerLogin = info?.account?.login || null;
      const ownerId = info?.account?.id || null;

      await prisma.instGithubApp.upsert({
        where: { installationId: Number(installation_id) },
        update: { usuarioId: user.id, accountLogin: ownerLogin, accountId: ownerId },
        create: { usuarioId: user.id, installationId: Number(installation_id), accountLogin: ownerLogin, accountId: ownerId }
      });
    } catch {
      const msg = 'GitHub App 401: revisa GITHUB_APP_ID, clave privada y que instalaste la App correcta';
      return res.redirect(`${FRONTEND}/?app_install_error=${encodeURIComponent(msg)}`);
    }

    if (req.session) req.session.install_t = null;
    return res.redirect(`${FRONTEND}/?app_install=ok`);
  } catch {
    return res.redirect(`${FRONTEND}/?app_install_error=${encodeURIComponent('Error inesperado')}`);
  }
});

// Completar datos de instalaciones (si faltan accountLogin/accountId)
router.post('/app/backfill', ensureAuth, async (req, res) => {
  const installs = await prisma.instGithubApp.findMany({ where: { usuarioId: req.user.id } });
  const updated = [];
  for (const i of installs) {
    try {
      const info = await getInstallationInfo(i.installationId);
      const ownerLogin = info?.account?.login || null;
      const ownerId = info?.account?.id || null;
      await prisma.instGithubApp.update({
        where: { id: i.id },
        data: { accountLogin: ownerLogin, accountId: ownerId }
      });
      updated.push(i.installationId);
    } catch { /* ignore */ }
  }
  res.json({ ok: true, updated });
});

// ============================
// Datos / Listados
// ============================

// Overview (usuario, enlaces, instalaciones, proyectos con repoUrl)
router.get('/me/overview', ensureAuth, async (req, res) => {
  const [cuentas, installs, membresias] = await Promise.all([
    prisma.githubAuth.findMany({ where: { usuarioId: req.user.id } }),
    prisma.instGithubApp.findMany({ where: { usuarioId: req.user.id } }),
    prisma.miembroProyecto.findMany({ where: { usuarioId: req.user.id }, include: { proyecto: true } })
  ]);

  res.json({
    user: { id: req.user.id, email: req.user.correo, name: `${req.user.nombre} ${req.user.apellido}`.trim() },
    linkedGithub: cuentas.map(a => ({ tipoCuenta: a.tipoCuenta, login: a.login, correo: a.correo })),
    appInstallations: installs.map(i => ({ installationId: i.installationId, accountLogin: i.accountLogin })),
    projects: membresias.map(m => ({
      proyectoId: m.proyectoId,
      titulo: m.proyecto.titulo,
      codigoMateria: m.proyecto.codigoMateria,
      tipoGrupo: m.proyecto.tipoGrupo,
      rol: m.rol,
      repoUrl: m.proyecto.repoUrl
    }))
  });
});

// Listar repos (OAuth de la cuenta INSTITUTIONAL)
router.get('/me/repos', ensureAuth, async (req, res) => {
  const inst = await prisma.githubAuth.findUnique({
    where: { usuarioId_tipoCuenta: { usuarioId: req.user.id, tipoCuenta: 'INSTITUTIONAL' } }
  });
  if (!inst) return res.status(400).json({ error: 'Enlaza primero la cuenta INSTITUTIONAL' });

  const octokit = new Octokit({ auth: inst.accessToken });
  const repos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, { per_page: 100 });
  res.json({
    repos: repos.map(r => ({ full_name: r.full_name, private: r.private, url: r.html_url }))
  });
});

// POST /github/import/repos
// Trae repos de la cuenta INSTITUTIONAL (propios) y los crea en tu BD como Proyectos
router.post('/import/repos', ensureAuth, async (req, res) => {
  try {
    const inst = await prisma.githubAuth.findUnique({
      where: { usuarioId_tipoCuenta: { usuarioId: req.user.id, tipoCuenta: 'INSTITUTIONAL' } }
    });
    if (!inst) return res.status(400).json({ error: 'Enlaza primero la cuenta INSTITUTIONAL' });

    const octokit = new Octokit({ auth: inst.accessToken });

    // Repos donde eres owner (hasta 100; si tienes más, se pagina)
    const { data } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
      affiliation: 'owner'
    });

    const created = [];
    const skipped = [];

    for (const r of data) {
      // sólo repos propiedad de tu cuenta institucional (no colaborador)
      if ((r.owner?.login || '').toLowerCase() !== (inst.login || '').toLowerCase()) {
        skipped.push({ full_name: r.full_name, reason: 'no-owner' });
        continue;
      }

      const repoUrl = r.html_url;
      const exist = await prisma.proyecto.findFirst({ where: { repoUrl } });
      if (exist) { skipped.push({ full_name: r.full_name, reason: 'exists' }); continue; }

      const p = await prisma.proyecto.create({
        data: {
          titulo: r.name,
          codigoMateria: null,
          // Heurística simple: trata todo como GROUP (puedes ajustar luego)
          tipoGrupo: 'GROUP',
          repoUrl
        }
      });

      // te agregamos como OWNER en el proyecto
      await prisma.miembroProyecto.create({
        data: { proyectoId: p.id, usuarioId: req.user.id, rol: 'OWNER' }
      });

      created.push({ id: p.id, full_name: r.full_name, private: r.private, url: repoUrl });
    }

    return res.json({ ok: true, created, skipped });
  } catch (e) {
    console.error('import/repos error:', e);
    return res.status(500).json({ error: 'No se pudo importar', detail: e?.message });
  }
});

// ============================
// Crear repo + invitar (proyectos)
// ============================
// ============================
// Crear repo + invitar (proyectos)
// ============================
router.post('/project/:id/repo', ensureAuth, async (req, res) => {
  try {
    const proyectoId = Number(req.params.id);

    const proyecto = await prisma.proyecto.findUnique({
      where: { id: proyectoId },
      include: { miembros: { include: { usuario: { include: { githubAuth: true } } } } }
    });
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no existe' });

    const esOwner = proyecto.miembros.some(
      (m) => m.usuarioId === req.user.id && m.rol === 'OWNER'
    );
    if (!esOwner) return res.status(403).json({ error: 'Solo OWNER puede crear el repo' });

    // 1) Instalación de la GitHub App (para invitar colaboradores, etc.)
    const install = await prisma.instGithubApp.findFirst({
      where: { usuarioId: req.user.id },
    });
    if (!install)
      return res.status(400).json({ error: 'Instala la GitHub App primero' });

    const octo = await getInstallationOctokit(install.installationId);
    const info = await getInstallationInfo(install.installationId);
    const ownerLogin = info.account.login;
    const ownerType = info.account.type; // 'User' | 'Organization'

    const base =
      (proyecto.codigoMateria ? `${proyecto.codigoMateria}-` : '') +
      proyecto.titulo;
    const repoName = slugifyRepoName(base || `proyecto-${proyecto.id}`);

    let created;

    if (ownerType === 'Organization') {
      // ORG -> la App puede crear repos con el installation token
      const { data } = await octo.request('POST /orgs/{org}/repos', {
        org: ownerLogin,
        name: repoName,
        private: true,
        auto_init: true,
        has_issues: true,
        has_projects: true,
        has_wiki: false,
      });
      created = data;
    } else {
      // USER -> usar token OAuth de la cuenta INSTITUTIONAL (no el de la App)
      const instOauth = await prisma.githubAuth.findUnique({
        where: {
          usuarioId_tipoCuenta: {
            usuarioId: req.user.id,
            tipoCuenta: 'INSTITUTIONAL',
          },
        },
      });

      if (!instOauth || !instOauth.accessToken) {
        return res.status(400).json({
          error:
            'Enlaza primero tu cuenta INSTITUTIONAL de GitHub para poder crear repositorios.',
        });
      }

      const userOcto = new Octokit({ auth: instOauth.accessToken });

      const { data } = await userOcto.request('POST /user/repos', {
        name: repoName,
        private: true,
        auto_init: true,
      });

      created = data;
    }

    // Guardar URL del repo en el proyecto
    await prisma.proyecto.update({
      where: { id: proyectoId },
      data: { repoUrl: created.html_url },
    });

    // Logins de cuentas PERSONALES para invitar como colaboradores
    const personalLogins = proyecto.miembros
      .map((m) =>
        m.usuario.githubAuth.find((a) => a.tipoCuenta === 'PERSONAL')?.login
      )
      .filter(Boolean);

    const invited = [];
    const failed = [];

    for (const username of personalLogins) {
      try {
        const r = await octo.request(
          'PUT /repos/{owner}/{repo}/collaborators/{username}',
          {
            owner: ownerLogin,
            repo: repoName,
            username,
            permission: 'push',
          }
        );
        if ([201, 202, 204].includes(r.status))
          invited.push({ username, status: r.status });
        else failed.push({ username, status: r.status });
      } catch (e) {
        failed.push({
          username,
          error: e?.status || '',
          msg: e?.message || String(e),
        });
      }
    }

    return res.json({
      ok: true,
      repo: {
        owner: ownerLogin,
        name: repoName,
        url: created.html_url,
        full_name: `${ownerLogin}/${repoName}`,
      },
      invited,
      failed,
    });
  } catch (e) {
    console.error('create repo error:', e);
    return res.status(500).json({ error: 'No se pudo crear el repo' });
  }
});


// ============================
// Sincronizar repos existentes del owner institucional a BD
// ============================
router.post('/me/sync-repos', ensureAuth, async (req, res) => {
  try {
    // OAuth institucional
    const inst = await prisma.githubAuth.findUnique({
      where: { usuarioId_tipoCuenta: { usuarioId: req.user.id, tipoCuenta: 'INSTITUTIONAL' } }
    });
    if (!inst) return res.status(400).json({ error: 'Falta enlazar cuenta INSTITUTIONAL' });

    const octo = new Octokit({ auth: inst.accessToken });
    const instLogin = inst.login;

    // Repos donde eres OWNER
    const repos = await octo.paginate(octo.repos.listForAuthenticatedUser, {
      per_page: 100, affiliation: 'owner', sort: 'updated'
    });

    const saved = [];
    for (const r of repos) {
      if (r.owner?.login?.toLowerCase() !== instLogin.toLowerCase()) continue;

      const repoUrl = r.html_url;
      const titulo  = r.name;

      // upsert proyecto por repoUrl
      let proyecto = await prisma.proyecto.findFirst({ where: { repoUrl } });
      if (!proyecto) {
        proyecto = await prisma.proyecto.create({
          data: {
            titulo,
            codigoMateria: null,
            tipoGrupo: 'GROUP',
            repoUrl
          }
        });
      } else if (proyecto.titulo !== titulo) {
        proyecto = await prisma.proyecto.update({ where: { id: proyecto.id }, data: { titulo } });
      }

      // upsert membresía OWNER
      try {
        await prisma.miembroProyecto.upsert({
          where: { proyectoId_usuarioId: { proyectoId: proyecto.id, usuarioId: req.user.id } },
          update: { rol: 'OWNER' },
          create: { proyectoId: proyecto.id, usuarioId: req.user.id, rol: 'OWNER' },
        });
      } catch {}

      saved.push({ proyectoId: proyecto.id, repoUrl, private: r.private, full_name: r.full_name });
    }

    return res.json({ ok: true, count: saved.length, items: saved });
  } catch (e) {
    console.error('sync-repos error:', e);
    return res.status(500).json({ error: e?.message || 'No se pudo sincronizar' });
  }
});

// ============================
// Invitar PERSONAL a todos los repos del owner institucional
// ============================
router.post('/me/invite-personal-on-all', ensureAuth, async (req, res) => {
  try {
    // Reusa tu función que invita usando App token / OAuth en base a proyectos de BD
    const r = await invitePersonalToProjectRepos(req.user.id);
    return res.json({ ok: true, ...r });
  } catch (e) {
    console.error('invite-personal-on-all:', e);
    return res.status(200).json({ ok: false, invited: [], failed: [], error: e?.message });
  }
});

// ============================
// Listado enriquecido directo desde GitHub (para UI)
// ============================
router.get('/me/repos/full', ensureAuth, async (req, res) => {
  try {
    const inst = await prisma.githubAuth.findUnique({
      where: { usuarioId_tipoCuenta: { usuarioId: req.user.id, tipoCuenta: 'INSTITUTIONAL' } }
    });
    if (!inst) return res.status(400).json({ error: 'Falta enlazar cuenta INSTITUTIONAL' });

    const octo = new Octokit({ auth: inst.accessToken });
    const instLogin = inst.login;

    const repos = await octo.paginate(octo.repos.listForAuthenticatedUser, {
      per_page: 100, affiliation: 'owner'
    });

    const out = [];
    for (const r of repos) {
      if (r.owner?.login?.toLowerCase() !== instLogin.toLowerCase()) continue;

      let collaborators = [];
      try {
        const { data: cols } = await octo.repos.listCollaborators({
          owner: r.owner.login, repo: r.name, per_page: 100
        });
        collaborators = cols.map(c => ({ login: c.login, site_admin: c.site_admin }));
      } catch { /* sin permisos admin, ignorar */ }

      out.push({
        full_name: r.full_name,
        name: r.name,
        owner: r.owner.login,
        private: r.private,
        url: r.html_url,
        is_org: r.owner.type === 'Organization',
        collaborators,
        tipoGrupo: (r.owner.type === 'Organization' || collaborators.length > 1) ? 'GROUP' : 'INDIVIDUAL'
      });
    }

    res.json({ repos: out });
  } catch (e) {
    console.error('repos/full error:', e);
    res.status(500).json({ error: e?.message || 'No se pudo listar repos' });
  }
});

// ============================
// Reintentar invitaciones (para proyectos con repoUrl)
// ============================
router.post('/me/retry-invites', ensureAuth, async (req, res) => {
  try {
    const result = await invitePersonalToProjectRepos(req.user.id);
    return res.json({ ok: true, ...result });
  } catch (e) {
    console.error('[retry-invites] error:', e);
    return res.status(200).json({ ok: false, invited: [], failed: [], error: 'No se pudo reintentar', detail: e?.message });
  }
});

// ============================
// Debug / Health
// ============================
router.get('/healthz', (_req, res) => res.json({ ok: true }));

router.get('/debug/app', async (req, res) => {
  try {
    const appOcto = new Octokit({ auth: createAppJwt() });
    const { data } = await appOcto.request('GET /app');
    res.json({ ok: true, id: data.id, slug: data.slug, name: data.name });
  } catch (e) {
    res.status(500).json({ ok: false, where: 'GET /app', message: e.message });
  }
});

router.get('/debug/install/:id', async (req, res) => {
  try {
    const appOcto = new Octokit({ auth: createAppJwt() });
    const { data } = await appOcto.request(
      'GET /app/installations/{installation_id}',
      { installation_id: Number(req.params.id) }
    );
    res.json({ ok: true, account: data.account?.login, appId: data.app_id });
  } catch (e) {
    res.status(500).json({ ok: false, where: 'GET /app/installations', message: e.message });
  }
});

export default router;
