// src/auth.js
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import jwt from 'jsonwebtoken';
import { prisma } from './db/client.js';
import { upsertGithubLinkPair, invitePersonalToProjectRepos } from './utils/githubLink.js';
import { Octokit } from '@octokit/rest';

const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    OAUTH_CALLBACK_URL,
    ALLOWED_INSTITUTION_DOMAIN,
    SESSION_SECRET
} = process.env;

const JWT_SECRET = SESSION_SECRET || 'dev_secret';

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try { done(null, await prisma.usuario.findUnique({ where: { id } })); }
    catch (e) { done(e); }
});

passport.use('github-link', new GitHubStrategy(
    {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: OAUTH_CALLBACK_URL,
        scope: ['read:user', 'user:email', 'repo'],
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            // 1) Resolver usuario y tipo de enlace (INSTITUTIONAL | PERSONAL)
            let linkType = req.session?.githubLinkType || null;

            // Si no tenemos linkType o req.user por cookie, lo reconstruimos desde "state"
            if (!linkType || !req.user) {
                const stateRaw = req.query?.state;
                if (stateRaw) {
                    try {
                        const decoded = JSON.parse(Buffer.from(String(stateRaw), 'base64').toString('utf8'));
                        if (!linkType && decoded?.type) linkType = decoded.type;

                        if (!req.user && decoded?.t) {
                            const payload = jwt.verify(decoded.t, JWT_SECRET);
                            const user = await prisma.usuario.findUnique({ where: { id: Number(payload.uid) } });
                            if (user) req.user = user;
                        }
                    } catch { /* ignorar */ }
                }
            }

            if (!req.user) return done(null, false, { message: 'No hay usuario autenticado' });
            if (!['INSTITUTIONAL', 'PERSONAL'].includes(String(linkType))) {
                return done(null, false, { message: 'Tipo de enlace inválido' });
            }

            // ===== Emails robusto: API primero, luego profile; valida institucional =====
            const domain = String((ALLOWED_INSTITUTION_DOMAIN || 'unifranz.edu.bo')).trim().toLowerCase();
            const requireVerified = (process.env.REQUIRE_VERIFIED_INSTITUTIONAL || '1') === '1'; // 1 = exigir verificado

            let emails = [];
            try {
                // 1) SIEMPRE pedimos a la API (más confiable)
                const octo = new Octokit({ auth: accessToken });
                const { data } = await octo.request('GET /user/emails'); // [{email, primary, verified, visibility}, ...]
                emails = (data || []).map(e => ({
                    email: (e?.email || '').trim(),
                    primary: !!e?.primary,
                    verified: !!e?.verified,
                }));
            } catch {
                // 2) Fallback: lo que venga en el profile
                emails = (profile.emails || []).map(e => ({
                    email: (e?.value || '').trim(),
                    primary: !!e?.primary,
                    verified: !!e?.verified,
                }));
            }

            // Limpieza
            emails = emails.filter(e => e.email);

            // Debug (temporal): mira qué devuelve GitHub realmente
            console.log('[OAuth] emails:', emails, 'domain:', domain, 'requireVerified:', requireVerified);

            const endsWithDomain = (s) => s.toLowerCase().endsWith(`@${domain}`);
            const institutionalAny = emails.find(e => endsWithDomain(e.email));
            const institutionalVerified = emails.find(e => e.verified && endsWithDomain(e.email));

            const primaryFromList = emails.find(e => e.primary)?.email;
            const firstEmail = emails[0]?.email || null;

            // Prioriza institucional verificado, luego institucional cualquiera, después primary, luego el primero
            const correoParaGuardar =
                institutionalVerified?.email ||
                institutionalAny?.email ||
                primaryFromList ||
                firstEmail ||
                null;

            if (linkType === 'INSTITUTIONAL') {
                const ok = requireVerified ? Boolean(institutionalVerified) : Boolean(institutionalAny);
                if (!ok) {
                    const msg = requireVerified
                        ? `Tu cuenta de GitHub debe tener un email @${domain} VERIFICADO. Agrégalo y verifícalo en Settings → Emails.`
                        : `Tu cuenta de GitHub debe tener un email @${domain}. Agrégalo en Settings → Emails.`;
                    return done(null, false, { message: msg });
                }
            }
            // ===== FIN bloque emails =====

            // 4) Guardar/actualizar el vínculo OAuth en tu tabla GithubAuth
            const data = {
                usuarioId: req.user.id,
                tipoCuenta: linkType,                 // enum TipoCuentaGithub
                githubId: Number(profile.id),
                login: profile.username,
                avatarUrl: profile.photos?.[0]?.value || null,
                correo: correoParaGuardar,            // <- usar el calculado arriba
                accessToken,
                tokenType: 'bearer',
                scopes: ''
            };

            const key = { usuarioId_tipoCuenta: { usuarioId: req.user.id, tipoCuenta: linkType } };
            const exists = await prisma.githubAuth.findUnique({ where: key });
            if (exists) {
                await prisma.githubAuth.update({ where: key, data });
            } else {
                await prisma.githubAuth.create({ data });
            }

            // Mantener una sola fila con INSTITUTIONAL y PERSONAL para el usuario
            await upsertGithubLinkPair(req.user.id);

            // Si ya están ambas cuentas, invitar la PERSONAL como colaboradora en repos de proyectos
            try {
                await invitePersonalToProjectRepos(req.user.id);
            } catch (e) {
                console.warn('invitePersonalToProjectRepos:', e?.message || e);
            }

            return done(null, req.user);
        } catch (e) {
            return done(e);
        }
    }
));

export default passport;
