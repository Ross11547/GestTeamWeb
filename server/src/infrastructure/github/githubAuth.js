// githubAuth.js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import jwt from "jsonwebtoken";
import {
  upsertGithubLinkPair,
  invitePersonalToProjectRepos,
} from "./githubLink.js";
import { Octokit } from "@octokit/rest";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  OAUTH_CALLBACK_URL,
  ALLOWED_INSTITUTION_DOMAIN,
  SESSION_SECRET,
} = process.env;

const JWT_SECRET = SESSION_SECRET || "dev_secret";

function normalizarTipoCuenta(type) {
  const value = String(type || "")
    .trim()
    .toUpperCase();

  // Compatibilidad por si algún frontend viejo manda INSTITUTIONAL
  if (value === "INSTITUTIONAL") return "INSTITUCIONAL";
  if (value === "INSTITUCIONAL") return "INSTITUCIONAL";
  if (value === "PERSONAL") return "PERSONAL";

  return null;
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(
  "github-link",
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: OAUTH_CALLBACK_URL,
      scope: ["read:user", "user:email", "repo"],
      passReqToCallback: true,
    },

    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // =========================================================
        // 1. Resolver tipo de cuenta y usuario autenticado
        // =========================================================
        let linkType = req.session?.githubLinkType || null;

        if (!linkType || !req.user) {
          const stateRaw = req.query?.state;

          if (stateRaw) {
            try {
              const decoded = JSON.parse(
                Buffer.from(String(stateRaw), "base64").toString("utf8"),
              );

              if (!linkType && decoded?.type) {
                linkType = decoded.type;
              }

              if (!req.user && decoded?.t) {
                const payload = jwt.verify(decoded.t, JWT_SECRET);

                const user = await prisma.usuario.findUnique({
                  where: { id: Number(payload.uid) },
                });

                if (user) {
                  req.user = user;
                }
              }
            } catch (e) {
              console.warn(
                "[GitHub OAuth] No se pudo leer state:",
                e?.message || e,
              );
            }
          }
        }

        linkType = normalizarTipoCuenta(linkType);

        if (!req.user) {
          return done(null, false, {
            message: "No hay usuario autenticado",
          });
        }

        if (!linkType) {
          return done(null, false, {
            message: "Tipo de enlace inválido",
          });
        }

        // =========================================================
        // 2. Obtener correos desde GitHub
        // =========================================================
        const domain = String(ALLOWED_INSTITUTION_DOMAIN || "unifranz.edu.bo")
          .trim()
          .toLowerCase();

        const requireVerified =
          String(process.env.REQUIRE_VERIFIED_INSTITUTIONAL || "1") === "1";

        let emails = [];

        try {
          const octo = new Octokit({ auth: accessToken });

          const { data } = await octo.request("GET /user/emails");

          emails = (data || []).map((e) => ({
            email: String(e?.email || "").trim(),
            primary: Boolean(e?.primary),
            verified: Boolean(e?.verified),
          }));
        } catch (e) {
          console.warn(
            "[GitHub OAuth] No se pudo leer /user/emails, usando profile.emails:",
            e?.message || e,
          );

          emails = (profile.emails || []).map((e) => ({
            email: String(e?.value || "").trim(),
            primary: Boolean(e?.primary),
            verified: Boolean(e?.verified),
          }));
        }

        emails = emails.filter((e) => e.email);

        console.log("[OAuth] emails:", emails, {
          domain,
          requireVerified,
          linkType,
          usuarioId: req.user.id,
        });

        const endsWithDomain = (email) =>
          String(email || "")
            .toLowerCase()
            .endsWith(`@${domain}`);

        const institutionalAny = emails.find((e) => endsWithDomain(e.email));

        const institutionalVerified = emails.find(
          (e) => e.verified && endsWithDomain(e.email),
        );

        const primaryFromList = emails.find((e) => e.primary)?.email || null;
        const firstEmail = emails[0]?.email || null;

        const correoParaGuardar =
          institutionalVerified?.email ||
          institutionalAny?.email ||
          primaryFromList ||
          firstEmail ||
          null;

        // =========================================================
        // 3. Validar cuenta institucional
        // =========================================================
        if (linkType === "INSTITUCIONAL") {
          const ok = requireVerified
            ? Boolean(institutionalVerified)
            : Boolean(institutionalAny);

          if (!ok) {
            const msg = requireVerified
              ? `Tu cuenta de GitHub debe tener un email @${domain} verificado. Agrégalo y verifícalo en GitHub Settings → Emails.`
              : `Tu cuenta de GitHub debe tener un email @${domain}. Agrégalo en GitHub Settings → Emails.`;

            return done(null, false, { message: msg });
          }
        }

        // =========================================================
        // 4. Preparar datos para Prisma
        // =========================================================
        const githubId = String(profile.id || profile._json?.id || "");

        if (!githubId) {
          return done(null, false, {
            message: "GitHub no devolvió un ID válido",
          });
        }

        const usuarioId = Number(req.user.id);

        const login = String(
          profile.username || profile._json?.login || profile.displayName || "",
        );

        if (!login) {
          return done(null, false, {
            message: "GitHub no devolvió un login válido",
          });
        }

        const data = {
          usuarioId,
          tipoCuenta: linkType,
          githubId: String(githubId), // IMPORTANTE: Prisma espera String
          login,
          avatarUrl:
            profile.photos?.[0]?.value || profile._json?.avatar_url || null,
          correo: correoParaGuardar,
          accessToken,
          tokenType: "bearer",
          scopes: "",
        };

        // =========================================================
        // 5. Guardar o actualizar GithubAuth
        // =========================================================
        await prisma.githubAuth.upsert({
          where: {
            usuarioId_tipoCuenta: {
              usuarioId,
              tipoCuenta: linkType,
            },
          },
          update: {
            githubId: data.githubId,
            login: data.login,
            avatarUrl: data.avatarUrl,
            correo: data.correo,
            accessToken: data.accessToken,
            tokenType: data.tokenType,
            scopes: data.scopes,
          },
          create: data,
        });

        // =========================================================
        // 6. Actualizar par INSTITUCIONAL / PERSONAL
        // =========================================================
        try {
          await upsertGithubLinkPair(usuarioId);
        } catch (e) {
          console.warn("[GitHub OAuth] upsertGithubLinkPair:", e?.message || e);
        }

        // =========================================================
        // 7. Invitar cuenta personal a repositorios si corresponde
        // =========================================================
        try {
          await invitePersonalToProjectRepos(usuarioId);
        } catch (e) {
          console.warn(
            "[GitHub OAuth] invitePersonalToProjectRepos:",
            e?.message || e,
          );
        }

        return done(null, req.user);
      } catch (e) {
        console.error("[GitHub OAuth ERROR]", {
          message: e?.message,
          code: e?.code,
          meta: e?.meta,
          stack: e?.stack,
        });

        return done(e);
      }
    },
  ),
);

export default passport;
