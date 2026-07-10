// src/utils/githubApp.js
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { Octokit } from '@octokit/rest';

const {
  GITHUB_APP_ID,
  GITHUB_APP_PRIVATE_KEY_PATH,
  GITHUB_APP_PRIVATE_KEY
} = process.env;

function getPrivateKey() {
  if (GITHUB_APP_PRIVATE_KEY) return GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
  if (!GITHUB_APP_PRIVATE_KEY_PATH) throw new Error('Configura GITHUB_APP_PRIVATE_KEY_PATH o GITHUB_APP_PRIVATE_KEY');
  return fs.readFileSync(path.resolve(GITHUB_APP_PRIVATE_KEY_PATH), 'utf8');
}

export function createAppJwt() {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { iat: now - 60, exp: now + 9 * 60, iss: GITHUB_APP_ID },
    getPrivateKey(),
    { algorithm: 'RS256' }
  );
}

export async function getInstallationOctokit(installationId) {
  const appOctokit = new Octokit({ auth: createAppJwt() });
  const { data } = await appOctokit.request(
    'POST /app/installations/{installation_id}/access_tokens',
    { installation_id: installationId }
  );
  return new Octokit({ auth: data.token });
}

export async function getInstallationInfo(installationId) {
  const appOctokit = new Octokit({ auth: createAppJwt() });
  const { data } = await appOctokit.request(
    'GET /app/installations/{installation_id}',
    { installation_id: installationId }
  );
  return data; // .account.login, .account.type ('User'|'Organization')
}
