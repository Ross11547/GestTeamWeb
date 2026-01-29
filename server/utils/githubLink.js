// src/utils/githubLink.js
import { prisma } from '../db/client.js';
import { Octokit } from '@octokit/rest';
import { getInstallationOctokit } from './githubApp.js';

// Helper: owner/repo desde una URL de GitHub
function parseRepo(url = '') {
    const m = String(url).match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git|\/)?$/i);
    return m ? { owner: m[1], repo: m[2] } : null;
}

// Opcional: devolver el par de cuentas enlazadas (para UI/overview)
export async function upsertGithubLinkPair(usuarioId) {
    const links = await prisma.githubAuth.findMany({
        where: { usuarioId },
        select: { tipoCuenta: true, login: true, correo: true }
    });
    const inst = links.find(l => l.tipoCuenta === 'INSTITUTIONAL') || null;
    const per = links.find(l => l.tipoCuenta === 'PERSONAL') || null;
    return { institutional: inst, personal: per };
}

/**
 * Invita la cuenta PERSONAL como colaboradora (permission: push)
 * a TODOS los repos de los proyectos donde participa el usuario.
 * - Si el repo es del owner donde está instalada la App → usa el token de instalación
 * - Si no, cae a OAuth de la cuenta INSTITUTIONAL (plan B)
 * - Requiere que Proyecto.repoUrl exista (crea el repo antes).
 */
export async function invitePersonalToProjectRepos(usuarioId) {
    // 1) Cuentas del usuario + instalación de la App + sus proyectos
    const [user, instLink, perLink, install] = await Promise.all([
        prisma.usuario.findUnique({ where: { id: usuarioId } }),
        prisma.githubAuth.findUnique({ where: { usuarioId_tipoCuenta: { usuarioId, tipoCuenta: 'INSTITUTIONAL' } } }),
        prisma.githubAuth.findUnique({ where: { usuarioId_tipoCuenta: { usuarioId, tipoCuenta: 'PERSONAL' } } }),
        prisma.instGithubApp.findFirst({ where: { usuarioId } }),
    ]);

    if (!user) return { invited: [], failed: [], reason: 'Usuario no existe' };
    if (!perLink?.login) return { invited: [], failed: [], reason: 'Falta enlazar cuenta PERSONAL' };

    const miembros = await prisma.miembroProyecto.findMany({
        where: { usuarioId },
        include: { proyecto: true }
    });

    const repos = miembros
        .map(m => m.proyecto?.repoUrl)
        .filter(Boolean)
        .map(parseRepo)
        .filter(Boolean);

    if (!repos.length) {
        return { invited: [], failed: [], reason: 'No hay repos (repoUrl vacío). Crea el repo primero.' };
    }

    // 2) Clientes Octokit
    let appOcto = null;
    let appOwnerLogin = null;
    if (install?.installationId) {
        try {
            appOcto = await getInstallationOctokit(install.installationId);
            appOwnerLogin = install.accountLogin || null; // guardado en tu callback de instalación
        } catch {
            // sin token de App (no instalada o error)
        }
    }
    const instOAuth = instLink?.accessToken ? new Octokit({ auth: instLink.accessToken }) : null;

    // 3) Invitar
    const invited = [];
    const failed = [];

    for (const { owner, repo } of repos) {
        let ok = false, via = null, msg = null;

        // a) App (si el owner del repo coincide con el owner de la instalación)
        if (appOcto && appOwnerLogin && appOwnerLogin.toLowerCase() === owner.toLowerCase()) {
            try {
                const r = await appOcto.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
                    owner, repo, username: perLink.login, permission: 'push'
                });
                ok = [201, 202, 204].includes(r.status);  // 202 = pendiente (org requiere aprobación)
                via = 'app';
                msg = `status=${r.status}`;
            } catch (e) {
                msg = `app error: ${e.status || ''} ${e.message || e}`;
            }
        }

        // b) OAuth institucional (plan B)
        if (!ok && instOAuth) {
            try {
                const r = await instOAuth.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
                    owner, repo, username: perLink.login, permission: 'push'
                });
                ok = [201, 202, 204].includes(r.status);
                via = 'oauth';
                msg = `status=${r.status}`;
            } catch (e) {
                msg = (msg ? msg + ' | ' : '') + `oauth error: ${e.status || ''} ${e.message || e}`;
            }
        }

        if (ok) invited.push({ owner, repo, username: perLink.login, via, msg });
        else failed.push({ owner, repo, username: perLink.login, msg });
    }

    return { invited, failed };
}
