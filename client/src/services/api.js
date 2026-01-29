export const API_BASE = 'http://localhost:3000';

async function request(path, { method = 'GET', body, headers } = {}) {
    const token = localStorage.getItem('gt_token');

    let res;
    try {
        res = await fetch(`${API_BASE}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(headers || {}),
            },
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch (e) {
        throw new Error('No se pudo conectar con el servidor');
    }

    if (!res.ok) {
        // 👇 NUEVO: leer texto crudo y loguear todo
        const text = await res.text();
        console.error('API ERROR ->', path, res.status, text);

        let data = {};
        try {
            data = JSON.parse(text);
        } catch (e) {
        }

        throw new Error(
            data.error ||
            data.mensaje ||
            text ||
            `Error ${res.status}`
        );
    }

    let data = {};
    try {
        data = await res.json();
    } catch {
        data = {};
    }

    if (data?.token) localStorage.setItem('gt_token', data.token);
    return data;
}

export const api = {
    login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
    logout: () => { localStorage.removeItem('gt_token'); return request('/auth/logout', { method: 'POST' }); },

    myProjects: () => request('/projects/my'),
    addMember: (projectId, data) => request(`/projects/${projectId}/members`, { method: 'POST', body: data }),

    overview: () => request('/github/me/overview'),
    repos: () => request('/github/me/repos'),
    myMaterias: () => request('/materias/mias'),
    createRepo: (projectId) => request(`/github/project/${projectId}/repo`, { method: 'POST' }),
    importRepos: () => request('/github/import/repos', { method: 'POST' }),
    invitePersonalOnAll: () => request('/github/me/invite-personal-on-all', { method: 'POST' }),
    createProject: (payload) => request('/projects', { method: 'POST', body: payload }),

    linkGithub: (type) => {
        const t = localStorage.getItem('gt_token') || '';
        window.location.href = `${API_BASE}/github/oauth/start?type=${type}&t=${encodeURIComponent(t)}`;
    },
    installApp: () => {
        const t = localStorage.getItem('gt_token') || '';
        window.location.href = `${API_BASE}/github/app/install?t=${encodeURIComponent(t)}`;
    },

    retryInvites: () => request('/github/me/retry-invites', { method: 'POST' }),
};
